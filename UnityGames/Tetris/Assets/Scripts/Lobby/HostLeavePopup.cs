using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HostLeavePopup : MonoBehaviour
{
    [SerializeField] GameObject hostLeavePopup;
    [SerializeField] GameObject btn;
    [SerializeField] GameObject loaderCircle;
    [SerializeField] GameObject loaderProgress;
    public void ReturnToLobby()
    {
        btn.SetActive(false);
        loaderCircle.SetActive(true);
        loaderProgress.SetActive(true);
        if (PhotonNetwork.insideLobby)
        {
            hostLeavePopup.SetActive(false);
            loaderCircle.SetActive(false);
            loaderProgress.SetActive(false);
            MainCanvasManager.Instance.LobbyCanvas.transform.SetAsLastSibling();
        }
    }
}
