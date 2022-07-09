using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using Photon.Pun;
using Photon.Realtime;

public class EndScreenLayoutGroup : MonoBehaviourPunCallbacks
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



    public void EndStats()
    {
        timeCanvas.SetActive(false);
        PlayerEndGame(PhotonNetwork.LocalPlayer.NickName, tetrisTime.text, successOrNot.text);
        base.photonView.RPC("PlayerEndGame", RpcTarget.Others, PhotonNetwork.LocalPlayer.NickName, tetrisTime.text, successOrNot.text);
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
        numberOfPlayersLeft.text = "Number of players remaining: " + (PhotonNetwork.PlayerList.Length - completedPlayers).ToString();
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
