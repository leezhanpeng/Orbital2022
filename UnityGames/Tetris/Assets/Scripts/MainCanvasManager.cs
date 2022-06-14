using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MainCanvasManager : MonoBehaviour
{
    public static MainCanvasManager Instance;

    [SerializeField] private HomepageCanvas _homepageCanvas;
    public HomepageCanvas HomepageCanvas
    {
        get { return _homepageCanvas; }
    }

    [SerializeField] private LobbyCanvas _lobbyCanvas;
    public LobbyCanvas LobbyCanvas
    {
        get { return _lobbyCanvas; }
    }

    [SerializeField] private CurrentRoomCanvas _currentRoomCanvas;
    public CurrentRoomCanvas CurrentRoomCanvas
    {
        get { return _currentRoomCanvas; }
    }

    [SerializeField] private HostLeavePopup _hostLeavePopup;
    public HostLeavePopup HostLeavePopup
    {
        get { return _hostLeavePopup; }
    }

    [SerializeField] private RoomNameEmptyPopup _roomNameEmptyPopup;
    public RoomNameEmptyPopup RoomNameEmptyPopup
    {
        get { return _roomNameEmptyPopup; }
    }

    private void Awake()
    {
        Instance = this;
    }
}
