using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;
using Photon.Realtime;
using UnityEngine.SceneManagement;


public class Typer : MonoBehaviourPunCallbacks
{
    public WordBank wordBank = null;
    public Text wordOutput = null;
    public Text Points;
    private string remainingWord = string.Empty;
    private string currentWord = string.Empty;
    private int pointCount = 0;
    private float gameTime = 0f;
    private bool inEndScreen = false;
    public GameObject finishText;
    public Text finishTime;
    public GameObject gameText;
    public GameObject continueButton;
    public GameObject resultsScreen;
    public Transform resultsList;
    public List<ResultItem> resultsItemList = new List<ResultItem>();
    public ResultItem resultItem;
    private string userNick = PhotonNetwork.NickName;
    public short playersFinished = 0;
    public float backToRoomTimer = 5f;
    public GameObject endGameCountDown;
    public Text endGameCountDownText;
    

    void Start()
    {
        SetCurrentWord();
        finishText.SetActive(false);
        resultsScreen.SetActive(false);
        endGameCountDown.SetActive(false);
    }
    
    private void SetCurrentWord()
    {
        currentWord = wordBank.GetWord();
        SetRemainingWord(currentWord);
    }

    private void SetRemainingWord(string newString)
    {
        remainingWord = newString;
        wordOutput.text = remainingWord;
    }

    void Update()
    {
        CheckInput(); // Can put function in FixedUpdate instead so that logic is not bound by frame timings
        Points.text = pointCount.ToString();
        if (!inEndScreen)
        { 
            ShowEndScreen();
        }
        else
        {
            BackToRoom();
        }
    }

    private void CheckInput()
    {
        if(Input.anyKeyDown)
        {
            string keysPressed = Input.inputString;
            if (keysPressed.Length == 1)
            {
                EnterLetter(keysPressed);
            }
        }
    }

    private void EnterLetter(string typedLetter)
    {
        if(IsCorrectLetter(typedLetter))
        {
            RemoveLetter();
            if (IsWordComplete())
            {
                SetCurrentWord();
                pointCount++;
            }
        }
    }

    private bool IsCorrectLetter(string letter)
    {
        return remainingWord.IndexOf(letter)==0;
    }

    private void RemoveLetter()
    {
        string newString = remainingWord.Remove(0, 1);
        SetRemainingWord(newString);
    }

    private bool IsWordComplete()
    {
        return remainingWord.Length == 0;
    }

    private bool IsPlayerFinished()
    {
        return (pointCount >= 1);
    }


    private void ShowEndScreen()
    {
        if (IsPlayerFinished())
        {
            gameText.SetActive(false);
            finishText.SetActive(true);
            finishTime.text = "You finished in: " + gameTime.ToString("F2") + "s";
            inEndScreen = true;
            
        }
        else
        {
            gameTime += Time.deltaTime;
        }
    }
    
    public void OnClickContinue()
    {
        finishText.SetActive(false);
        resultsScreen.SetActive(true);
        //photonView.RPC("DisplayResults", RpcTarget.All, userNick, gameTime.ToString("F2") + "s");
        photonView.RPC("DisplayResults", RpcTarget.All, userNick, gameTime.ToString("F2") + "s");
    }

    [PunRPC]
    public void DisplayResults(string name, string timing)
    {
        ResultItem newResultItem = Instantiate(resultItem, resultsList);
        //newResultItem.SetPlayerResult(PhotonNetwork.NickName,":        " + gameTime.ToString("F2") + "s");
        newResultItem.SetPlayerResult(name,timing);
        //resultsItemList.Add(newResultItem);
        playersFinished++;
    }

    public void BackToRoom()
    {
        if (playersFinished != PhotonNetwork.CurrentRoom.PlayerCount)
        {
            return;
        }
        //photonView.RPC("BackToRoomCountDown", RpcTarget.All, backToRoomTimer);
        BackToRoomCountDown();
    }


    //[PunRPC]
    public void BackToRoomCountDown()
    {
        if (backToRoomTimer <= 0)
        {
            SceneManager.UnloadSceneAsync("GameScene");
            return;
        }
        endGameCountDown.SetActive(true);
        backToRoomTimer -= Time.deltaTime;
        endGameCountDownText.text = "Returning to Lobby in: "+ backToRoomTimer.ToString("F1") + "s";
    }
}
