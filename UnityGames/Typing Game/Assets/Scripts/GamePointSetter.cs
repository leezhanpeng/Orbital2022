using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;
using Photon.Realtime;

public class GamePointSetter : MonoBehaviourPunCallbacks
{
    public GameObject increaseButton;
    public GameObject decreaseButton;
    public GameObject buttons;
    public Text gamePoint;
    public static short point = 5;



    private void Start()
    {
        gamePoint.text = "Score Required: " + point.ToString();
    }

    public void Update()
    {
        buttons.SetActive(PhotonNetwork.IsMasterClient);
        gamePoint.text = "Score Required: " + point.ToString();
    }

    public void OnClickDecrease()
    {
        photonView.RPC("RPC_OnClickDecrease", RpcTarget.All);
        //gamePoint.text = "Score Required: " + point.ToString();
    }

    public void OnClickIncrease()
    {
        photonView.RPC("RPC_OnClickIncrease", RpcTarget.All);
        //gamePoint.text = "Score Required: " + point.ToString();
    }

    public override void OnPlayerEnteredRoom(Player newPlayer)
    {
        if(!PhotonNetwork.IsMasterClient)
        {
            return;
        }
        photonView.RPC("RPC_UpdatePointForNewPlayer", newPlayer, point);
        base.OnPlayerEnteredRoom(newPlayer);
    }

    [PunRPC]
    public void RPC_OnClickIncrease()
    {
        if (point < 100)
        {
            point += 5;
        }
        //gamePoint.text = "Score Required: " + point.ToString();
    }

    [PunRPC]
    public void RPC_OnClickDecrease()
    {
        if (point > 5)
        {
            point -= 5;
        }
        //gamePoint.text = "Score Required: " + point.ToString();
    }

    [PunRPC]
    public void RPC_UpdatePointForNewPlayer(short currentPoint)
    {
        point = currentPoint;
    }
}
