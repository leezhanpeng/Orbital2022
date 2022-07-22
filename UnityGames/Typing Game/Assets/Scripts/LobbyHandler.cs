using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using UnityEngine.UI;
using UnityEngine.SceneManagement;


public class LobbyHandler : MonoBehaviourPunCallbacks
{
    public InputField roomNameInput;
    public GameObject inLobby;
    public GameObject inRoom;
    public Text roomName;
    public RoomItem roomItem;
    public Dictionary<string,RoomInfo> roomItemList = new Dictionary<string,RoomInfo>();
    public Transform content;
    public List<PlayerItem> playerItemList = new List<PlayerItem>();
    public PlayerItem playerItem;
    public Transform playerListContent;
    public GameObject playButton;
    public GameObject scoreSetter;


    private void Start()
    {
        PhotonNetwork.JoinLobby();
        inRoom.SetActive(false);

    }

    public void Update()
    {
        playButton.SetActive(PhotonNetwork.IsMasterClient);
        //scoreSetter.SetActive(PhotonNetwork.IsMasterClient);
    }

    public void OnClickCreate()
    {
        if (roomNameInput.text.Length >= 1)
        {
            PhotonNetwork.CreateRoom(roomNameInput.text, new RoomOptions() { MaxPlayers = 8 });
        }
    }
    public override void OnJoinedRoom()
    {
        inLobby.SetActive(false);
        inRoom.SetActive(true);
        roomName.text = PhotonNetwork.CurrentRoom.Name;
        UpdatePlayerList();
        base.OnJoinedRoom();
    }

    public override void OnRoomListUpdate(List<RoomInfo> roomList)
    {
        UpdateRoomList(roomList);
        base.OnRoomListUpdate(roomList);
    }

    void UpdateRoomList(List<RoomInfo> list)
    {
        // ver1 : buggy mess
        //if (list.Count == 0)
        //{
        //    return;
        //}
        //else if (list.Count == 1 && list[0].MaxPlayers > 0) //if a new room is created
        //{
        //    Debug.Log(list[0].Name);
        //    RoomItem newRoom = Instantiate(roomItem, content);
        //    newRoom.SetRoomName(list[0].Name);
        //    roomItemList.Add(newRoom);
        //}
        //else
        //{
        //    foreach (RoomItem item in roomItemList)
        //    {
        //        Destroy(item.gameObject);
        //    }
        //    roomItemList.Clear();

        //    foreach (RoomInfo room in list)
        //    {
        //        if (room.MaxPlayers <= 0)
        //        {
        //            Debug.Log(room.Name);
        //            continue;
        //        }
        //        Debug.Log(room.Name);
        //        RoomItem newRoom = Instantiate(roomItem, content);
        //        newRoom.SetRoomName(room.Name);
        //        roomItemList.Add(newRoom);
        //    }
        //}

        //ver2: buggy when leave
        //foreach(RoomInfo info in list)
        //{
        //    if (info.RemovedFromList)
        //    {
        //        int index = roomItemList.FindIndex(x => x.roomName.text == info.Name);
        //        if (index != -1)
        //        {
        //            Destroy(roomItemList[index].gameObject);
        //            roomItemList.Remove(info.Name);
        //        }
        //    }
        //    else
        //    {
        //        RoomItem newRoomItem = Instantiate(roomItem, content);
        //        newRoomItem.SetRoomName(info.Name);
        //        roomItemList.Add(newRoomItem);
        //    }
        //}

        //ver3
        foreach (Transform room in content)
        {
            Destroy(room.gameObject);
        }    
        foreach(RoomInfo info in list)
        {
            
            if(info.RemovedFromList || !info.IsVisible || !info.IsOpen)
            {
                roomItemList.Remove(info.Name);
            }
            else
            {
                roomItemList[info.Name] = info;
            }
        }
        foreach(KeyValuePair<string,RoomInfo> item in roomItemList)
        {
            RoomItem newRoomItem = Instantiate(roomItem, content);
            newRoomItem.SetRoomName(item.Key);

        }
    }
    // when first join : all rooms
    // when leave room : all rooms + last room is maxplayer <= 0
    // when new room created, just one room



    public void JoinRoom(string roomName)
    {
        PhotonNetwork.JoinRoom(roomName);
    }


    //CloseConnection buggy...
    public void OnClickLeaveRoom()
    {
        /*if (PhotonNetwork.IsMasterClient)
        {
            PhotonNetwork.CurrentRoom.IsVisible = false;
            PhotonNetwork.CurrentRoom.IsOpen = false;
            Player[] otherPlayers = PhotonNetwork.PlayerListOthers;
            foreach (Player player in otherPlayers)
            {
                PhotonNetwork.CloseConnection(player);
            }
        }*/
        PhotonNetwork.LeaveRoom();
        roomItemList.Clear();
    } 
    

    public override void OnLeftRoom()
    {
        inRoom.SetActive(false);
        inLobby.SetActive(true);
        base.OnLeftRoom();
    }

    public override void OnConnectedToMaster()
    {
        PhotonNetwork.JoinLobby();
        base.OnConnectedToMaster();
    }

    void UpdatePlayerList()
    {
        foreach(PlayerItem item in playerItemList)
        {
            Destroy(item.gameObject);
        }
        playerItemList.Clear();
        if (PhotonNetwork.CurrentRoom == null)
        {
            return;
        }
        foreach (KeyValuePair<int, Player> player in PhotonNetwork.CurrentRoom.Players)
        {
            PlayerItem newPlayerItem = Instantiate(playerItem, playerListContent);
            newPlayerItem.SetPlayerInfo(player.Value);
            playerItemList.Add(newPlayerItem);
        }    
    }

    public override void OnPlayerEnteredRoom(Player newPlayer)
    {
        UpdatePlayerList();
        base.OnPlayerEnteredRoom(newPlayer);
    }

    public override void OnPlayerLeftRoom(Player otherPlayer)
    {
        UpdatePlayerList();
        base.OnPlayerLeftRoom(otherPlayer);
    }

    /*public override void OnMasterClientSwitched(Player newMasterClient)
    {
        
        base.OnMasterClientSwitched(newMasterClient);
    }*/
    public void OnClickStart()
    {
        photonView.RPC("LoadGame", RpcTarget.All);
        PhotonNetwork.CurrentRoom.IsVisible = false;
        PhotonNetwork.CurrentRoom.IsOpen = false;
    }


    [PunRPC]
    public void LoadGame()
    {
        //PhotonNetwork.LoadLevel("GameScene");
        SceneManager.LoadScene("GameScene", LoadSceneMode.Additive);
    }
    //DDOL
    
}
