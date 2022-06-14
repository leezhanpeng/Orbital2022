using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LobbyNetwork : MonoBehaviour
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
        if (!PhotonNetwork.connected)
        {
        print("Connecting to server...");
        PhotonNetwork.ConnectUsingSettings("0.0.0");
        }
    }

    private void OnConnectedToMaster()
    {
        if (homepage.activeSelf)
        {
            homepage.SetActive(false);
        }
        print("Connected to master.");
        PhotonNetwork.automaticallySyncScene = false;
        PhotonNetwork.playerName = PlayerNetwork.Instance.PlayerName;
        PhotonNetwork.JoinLobby(TypedLobby.Default);
    }

    private void OnJoinedLobby()
    {
        print("Joined lobby.");

        if (!PhotonNetwork.inRoom)
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
