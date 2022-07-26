using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using Photon.Pun;
using Photon.Realtime;
using System.Runtime.InteropServices;
using System;
using System.Linq;

public class EndScreenLayoutGroup : MonoBehaviourPunCallbacks
{
    [DllImport("__Internal")]
    private static extern void WinStats(int winning);
    private List<int> timeFinishedList = new List<int>();

    [SerializeField] private GameObject timeCanvas;
    [SerializeField] Text snakeTime;
    [SerializeField] Text successOrNot;
    [SerializeField] private GameObject _endGameListingPrefab;
    private GameObject EndGameListingPrefab
    {
        get { return _endGameListingPrefab; }
    }

    private List<EndGameListing> _endGameListings = new List<EndGameListing>();
    private List<EndGameListing> EndGameListings
    {
        get { return _endGameListings; }
    }

    [SerializeField] Text waitText;
    [SerializeField] GameObject loadingCircle;
    [SerializeField] GameObject progressCircle;
    [SerializeField] Text numberOfPlayersLeft;
    [SerializeField] GameObject endTimer;
    [SerializeField] GameObject endScreen;

    private int completedPlayers = 0;



    public void EndStats()
    {
        timeCanvas.SetActive(false);
        PlayerEndGame(PhotonNetwork.LocalPlayer.NickName, snakeTime.text, successOrNot.text);
        base.photonView.RPC("PlayerEndGame", RpcTarget.Others, PhotonNetwork.LocalPlayer.NickName, snakeTime.text, successOrNot.text);
    }

    [PunRPC]
    public void PlayerEndGame(string name, string time, string success)
    {
        if (success == "SUCCESS")
        {
            timeFinishedList.Add(convertToMS(time));
        }
        completedPlayers++;
        GameObject endGameListingObj = Instantiate(EndGameListingPrefab);
        endGameListingObj.transform.SetParent(transform, false);

        EndGameListing endGameListing = endGameListingObj.GetComponent<EndGameListing>();
        endGameListing.ApplyEndGameStats(name, time, success);

        EndGameListings.Add(endGameListing);
        numberOfPlayersLeft.text = "Number of players remaining: " + (PhotonNetwork.CurrentRoom.PlayerCount - completedPlayers).ToString();
        if (numberOfPlayersLeft.text == "Number of players remaining: 0")
        {
            loadingCircle.SetActive(false);
            progressCircle.SetActive(false);
            waitText.text = "Returning to lobby in:";
            endTimer.SetActive(true);
            if (timeFinishedList.Count != 0 && timeFinishedList.Min() == convertToMS(snakeTime.text) && completedPlayers > 1 && success == "SUCCESS")
            {
                WinStats(1);
            }
            else
            {
                WinStats(0);
            }
            Invoke("BackToRoom", 6f);
        }
    }

    public int convertToMS(string time)
    {
        string[] times = time.Split("Time: ");
        string displayTime = times[1];
        string[] splitted = displayTime.Split(":");
        string minute = splitted[0];
        string[] seconds = splitted[1].Split(".");
        return (int.Parse(minute)*60*100 + int.Parse(seconds[0])*100 + int.Parse(seconds[1]));
    }

    private void BackToRoom()
    {
        if (PhotonNetwork.IsMasterClient)
        {
            PhotonNetwork.CurrentRoom.IsOpen = !PhotonNetwork.CurrentRoom.IsOpen;
            PhotonNetwork.CurrentRoom.IsVisible = PhotonNetwork.CurrentRoom.IsOpen;
        }
        SceneManager.UnloadScene(1);
    }

    private void Done()
    {
        endScreen.SetActive(false);
        loadingCircle.SetActive(true);
        progressCircle.SetActive(true);
        endTimer.SetActive(false);
    }
}
