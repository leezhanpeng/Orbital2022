using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;
using UnityEngine.SceneManagement;

public class PlayMenuScene : MonoBehaviourPunCallbacks
{
    public Text buttonText;
    public Text nameText;


    private void Start()
    {
        int rnd = Random.Range(1000, 9999);
        nameText.text = rnd.ToString();
    }
    public void ClickPlayGame()
    {
        PhotonNetwork.NickName = nameText.text;
        buttonText.text = "Connecting...";
        PhotonNetwork.AutomaticallySyncScene = true;
        PhotonNetwork.ConnectUsingSettings();
    }

    public override void OnConnectedToMaster()
    {
        SceneManager.LoadScene("LobbyScene");
        
        base.OnConnectedToMaster();
    }
}
