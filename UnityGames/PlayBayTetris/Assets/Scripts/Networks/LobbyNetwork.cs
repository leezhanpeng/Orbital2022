using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;

public class LobbyNetwork : MonoBehaviourPunCallbacks
{
    [SerializeField] GameObject homepage;
    [SerializeField] private GameObject hostLeavePopup;
    [SerializeField] private GameObject hostLeavePopupBtn;
    [SerializeField] GameObject btn1;
    [SerializeField] GameObject loaderCircle1;
    [SerializeField] GameObject loaderProgress1;
    [SerializeField] GameObject btn2;
    [SerializeField] GameObject loaderCircle2;
    [SerializeField] GameObject loaderProgress2;

    private void Start()
    {
        if (!PhotonNetwork.IsConnected)
        {
        print("Connecting to server...");
        PhotonNetwork.ConnectUsingSettings();
        }
    }

    public override void OnConnectedToMaster()
    {
        if (homepage.activeSelf)
        {
            homepage.SetActive(false);
        }
        print("Connected to master.");
        PhotonNetwork.NickName = PlayerNetwork.Instance.PlayerName;
        PhotonNetwork.JoinLobby(TypedLobby.Default);
    }

    public override void OnJoinedLobby()
    {
        print("Joined lobby.");

        if (!PhotonNetwork.InRoom)
        {
            if (!hostLeavePopupBtn.activeSelf)
            {
                loaderCircle1.SetActive(false);
                loaderProgress1.SetActive(false);
                MainCanvasManager.Instance.LobbyCanvas.transform.SetAsLastSibling();
            }
        }
        if (!btn2.activeSelf)
        {
        btn2.SetActive(true);
        loaderCircle2.SetActive(false);
        loaderProgress2.SetActive(false);
        }
    }
}
