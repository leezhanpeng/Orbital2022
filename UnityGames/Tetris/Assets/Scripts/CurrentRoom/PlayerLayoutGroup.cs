using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PlayerLayoutGroup : MonoBehaviour
{
    private PhotonView PhotonView;
    [SerializeField] Text visibilityTxt;

    [SerializeField] private GameObject hostLeavePopup;
    [SerializeField] private GameObject hostLeavePopupBtn;
    [SerializeField] GameObject btn;
    [SerializeField] GameObject loaderCircle;
    [SerializeField] GameObject loaderProgress;
    [SerializeField] GameObject btn2;
    [SerializeField] GameObject loaderCircle2;
    [SerializeField] GameObject loaderProgress2;

    [SerializeField] GameObject hostCover;
    
    [SerializeField] private GameObject _playerListingPrefab;
    private GameObject PlayerListingPrefab
    {
        get { return _playerListingPrefab; }
    }

    private List<PlayerListing> _playerListings = new List<PlayerListing>();
    private List<PlayerListing> PlayerListings
    {
        get { return _playerListings; }
    }

    private void OnMasterClientSwitched(PhotonPlayer newMasterClient)
    {
        PhotonNetwork.LeaveRoom();
        hostLeavePopupBtn.SetActive(true);
        hostLeavePopup.SetActive(true);
        MainCanvasManager.Instance.HostLeavePopup.transform.SetAsLastSibling();
    }

    private void OnJoinedRoom()
    {
        btn.SetActive(true);
        loaderCircle.SetActive(false);
        loaderProgress.SetActive(false);
        foreach (Transform child in transform)
        {
            Destroy(child.gameObject);
        }

        MainCanvasManager.Instance.CurrentRoomCanvas.transform.SetAsLastSibling();
        hostCover.SetActive(true);
        if (PhotonNetwork.isMasterClient)
        {
            hostCover.SetActive(false);
        }

        PhotonPlayer[] photonPlayers = PhotonNetwork.playerList;
        for (int i = 0; i < photonPlayers.Length; i++)
        {
            PlayerJoinedRoom(photonPlayers[i]);
        }
    }

    private void OnPhotonPlayerConnected(PhotonPlayer photonPlayer)
    {
        PlayerJoinedRoom(photonPlayer);
    }

    private void OnPhotonPlayerDisconnected(PhotonPlayer photonPlayer)
    {
        PlayerLeftRoom(photonPlayer);
    }

    private void PlayerJoinedRoom(PhotonPlayer photonPlayer)
    {
        if (photonPlayer == null)
        {
            return;
        }

        PlayerLeftRoom(photonPlayer);

        GameObject playerListingObj = Instantiate(PlayerListingPrefab);
        playerListingObj.transform.SetParent(transform, false);

        PlayerListing playerListing = playerListingObj.GetComponent<PlayerListing>();
        playerListing.ApplyPhotonPlayer(photonPlayer);

        PlayerListings.Add(playerListing);

    }

    private void PlayerLeftRoom(PhotonPlayer photonPlayer)
    {
        int index = PlayerListings.FindIndex(x => x.PhotonPlayer == photonPlayer);
        if (index != -1)
        {
            Destroy(PlayerListings[index].gameObject);
            PlayerListings.RemoveAt(index);
        }
    }

    public void OnClickRoomState()
    {

        if (PhotonNetwork.isMasterClient)
        {
            PhotonView = GetComponent<PhotonView>();
            PhotonNetwork.room.IsOpen = !PhotonNetwork.room.IsOpen;
            PhotonNetwork.room.IsVisible = PhotonNetwork.room.IsOpen;
            if (PhotonNetwork.room.IsOpen)
            {
                visibilityTxt.text = "Open";
            }
            else
            {
                visibilityTxt.text = "Closed";
            }
            PhotonView.RPC("SendVisibility", PhotonTargets.Others);
        }
    }

    [PunRPC]
    public void SendVisibility()
    {
        if (PhotonNetwork.room.IsOpen)
            {
                visibilityTxt.text = "Open";
            }
            else
            {
                visibilityTxt.text = "Closed";
            }
    }

    public void OnClickLeaveRoom()
    {
        if (PhotonNetwork.inRoom)
        {
            PhotonNetwork.LeaveRoom();
            btn2.SetActive(false);
            loaderCircle2.SetActive(true);
            loaderProgress2.SetActive(true);
        }
    }

}
