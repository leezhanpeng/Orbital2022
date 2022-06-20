using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;
using Photon.Realtime;
using TMPro;

public class CreateRoom : MonoBehaviourPunCallbacks
{
    [SerializeField]
    private Text _roomName;
    private Text RoomName
    {
        get { return _roomName; }
    }

    [SerializeField] GameObject btn;
    [SerializeField] GameObject loaderCircle;
    [SerializeField] GameObject loaderProgress;
    [SerializeField] GameObject emptyRoomNamePopup;
    [SerializeField] TextMeshProUGUI emptyRoomNamePopupText;

    private List<RoomInfo> allRooms = new List<RoomInfo>();


    public override void OnRoomListUpdate(List<RoomInfo> roomList)
    {
        allRooms = roomList;
    }

    public void OnClick_CreateRoom()
    {
        if (RoomName.text == "")
        {
            emptyRoomNamePopup.SetActive(true);
            MainCanvasManager.Instance.RoomNameEmptyPopup.transform.SetAsLastSibling();
            emptyRoomNamePopupText.text = "Please create room with a room name.";
            return;
        }

        else
        {   
            foreach (RoomInfo room in allRooms)
            {
                if (room.Name == RoomName.text)
                {
                    emptyRoomNamePopup.SetActive(true);
                    MainCanvasManager.Instance.RoomNameEmptyPopup.transform.SetAsLastSibling();
                    emptyRoomNamePopupText.text = "Room name already exist. Please create room with another room name.";
                    return;
                }
            }
            RoomOptions roomOptions = new RoomOptions() { IsVisible = true, IsOpen = true, MaxPlayers = 20 };

            if (PhotonNetwork.CreateRoom(RoomName.text, roomOptions, TypedLobby.Default))
            {
                print("Create room successfully sent.");
            }
            else
            {
                print("Create room failed to send.");
            }
            btn.SetActive(false);
            loaderCircle.SetActive(true);
            loaderProgress.SetActive(true);
        }
    }

    public override void OnCreatedRoom()
    {
        print("Room created successfully.");
    }

}
