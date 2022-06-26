using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Photon.Realtime;
using UnityEngine.UI;


public class ResultItem : MonoBehaviour
{
    public Text playerResult;

    public void SetPlayerResult(string name, string time)
    {
        playerResult.text = name + ":         " + time;

    }
}
