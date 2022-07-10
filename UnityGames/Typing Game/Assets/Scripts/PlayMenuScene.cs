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


    private void Awake()
    {

        nameText.text = "Original";
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

    public void AddName(string name)
    {
        nameText.text = name;
    }
}
