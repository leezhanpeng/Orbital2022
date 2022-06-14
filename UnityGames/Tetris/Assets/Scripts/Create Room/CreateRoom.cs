using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CreateRoom : MonoBehaviour
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

    public void OnClick_CreateRoom()
    {
        if (RoomName.text == "")
        {
            emptyRoomNamePopup.SetActive(true);
            MainCanvasManager.Instance.RoomNameEmptyPopup.transform.SetAsLastSibling();
        }

        else
        {
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

    private void OnPhotonCreateRoomFailed(object[] codeAndMessage)
    {
        print("Create room failed: " + codeAndMessage[1]);
    }

    private void OnCreatedRoom()
    {
        print("Room created successfully.");
    }

}
