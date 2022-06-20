using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;
using Photon.Realtime;

public class PlayerLayoutGroup : MonoBehaviourPunCallbacks
{
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

    public override void OnMasterClientSwitched(Player newMasterClient)
    {
        PhotonNetwork.LeaveRoom();
        hostLeavePopupBtn.SetActive(true);
        hostLeavePopup.SetActive(true);
        MainCanvasManager.Instance.HostLeavePopup.transform.SetAsLastSibling();
    }

    public override void OnJoinedRoom()
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
        if (PhotonNetwork.IsMasterClient)
        {
            hostCover.SetActive(false);
        }

        Player[] photonPlayers = PhotonNetwork.PlayerList;
        for (int i = 0; i < photonPlayers.Length; i++)
        {
            PlayerJoinedRoom(photonPlayers[i]);
        }
    }

    public override void OnPlayerEnteredRoom(Player photonPlayer)
    {
        PlayerJoinedRoom(photonPlayer);
    }

    public override void OnPlayerLeftRoom(Player photonPlayer)
    {
        PlayerLeftRoom(photonPlayer);
    }

    private void PlayerJoinedRoom(Player photonPlayer)
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

    private void PlayerLeftRoom(Player photonPlayer)
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

        if (PhotonNetwork.IsMasterClient)
        {
            PhotonNetwork.CurrentRoom.IsOpen = !PhotonNetwork.CurrentRoom.IsOpen;
            PhotonNetwork.CurrentRoom.IsVisible = PhotonNetwork.CurrentRoom.IsOpen;
            if (PhotonNetwork.CurrentRoom.IsOpen)
            {
                visibilityTxt.text = "Open";
            }
            else
            {
                visibilityTxt.text = "Closed";
            }
            base.photonView.RPC("SendVisibility", RpcTarget.Others);
        }
    }

    [PunRPC]
    public void SendVisibility()
    {
        if (PhotonNetwork.CurrentRoom.IsOpen)
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
        if (PhotonNetwork.InRoom)
        {
            PhotonNetwork.LeaveRoom();
            btn2.SetActive(false);
            loaderCircle2.SetActive(true);
            loaderProgress2.SetActive(true);
        }
    }

}
