using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;


public class GamePointSetter : MonoBehaviourPunCallbacks
{
    public GameObject increaseButton;
    public GameObject decreaseButton;
    public Text gamePoint;
    public static short point = 5;

    private void Start()
    {
        gamePoint.text = "Score Required: " + point.ToString();
    }

    public void OnClickDecrease()
    {
        photonView.RPC("RPC_OnClickDecrease", RpcTarget.All);
        gamePoint.text = "Score Required: " + point.ToString();
    }

    public void OnClickIncrease()
    {
        photonView.RPC("RPC_OnClickIncrease", RpcTarget.All);
        gamePoint.text = "Score Required: " + point.ToString();
    }

    [PunRPC]
    public void RPC_OnClickIncrease()
    {
        if (point < 100)
        {
            point += 5;
        }
    }

    [PunRPC]
    public void RPC_OnClickDecrease()
    {
        if (point > 5)
        {
            point -= 5;
        }
    }
}
