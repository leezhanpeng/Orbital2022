using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class EndScreenLayoutGroup : MonoBehaviour
{

    [SerializeField] private GameObject timeCanvas;
    [SerializeField] Text tetrisTime;
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


    private PhotonView PhotonView;

    public void EndStats()
    {
        timeCanvas.SetActive(false);
        PhotonView = GetComponent<PhotonView>();
        PlayerEndGame(PhotonNetwork.player.NickName, tetrisTime.text, successOrNot.text);
        PhotonView.RPC("PlayerEndGame", PhotonTargets.Others, PhotonNetwork.player.NickName, tetrisTime.text, successOrNot.text);
    }

    [PunRPC]
    public void PlayerEndGame(string name, string time, string success)
    {
        completedPlayers++;
        GameObject endGameListingObj = Instantiate(EndGameListingPrefab);
        endGameListingObj.transform.SetParent(transform, false);

        EndGameListing endGameListing = endGameListingObj.GetComponent<EndGameListing>();
        endGameListing.ApplyEndGameStats(name, time, success);

        EndGameListings.Add(endGameListing);
        numberOfPlayersLeft.text = "Number of players remaining: " + (PhotonNetwork.playerList.Length - completedPlayers).ToString();
        if (numberOfPlayersLeft.text == "Number of players remaining: 0")
        {
            loadingCircle.SetActive(false);
            progressCircle.SetActive(false);
            waitText.text = "Returning to lobby in:";
            endTimer.SetActive(true);
            Invoke("BackToRoom", 6f);
        }
    }

    private void BackToRoom()
    {
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
