using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class EndGameListing : MonoBehaviour
{
    [SerializeField] private Text _playerName;
    private Text PlayerName
    {
        get { return _playerName; }
    }

    [SerializeField] private Text _tetrisTime;
    private Text TetrisTime
    {
        get { return _tetrisTime; }
    }

    [SerializeField] private Text _success;
    private Text Success
    {
        get { return _success; }
    }

    public void ApplyEndGameStats(string nickname, string time, string success)
    {
        string[] times = time.Split("Time: ");
        string displayTime = times[1];
        PlayerName.text = nickname;
        TetrisTime.text = displayTime;
        Success.text = success;
    }
}
