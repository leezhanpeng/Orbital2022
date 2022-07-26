using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using Photon.Pun;
using Photon.Realtime;

public class CurrentRoomCanvas : MonoBehaviourPunCallbacks
{
    //[SerializeField] Text readiness;

    public void OnClickStart()
    {
        // PlayerReady.OnClick_Ready(readiness.text);
        // if (readiness.text == "READY")
        // {
        //     readiness.text = "UNREADY";
        // }
        // else
        // {
        //     readiness.text = "READY";
        // }
        if (PhotonNetwork.IsMasterClient)
        {
            PhotonNetwork.CurrentRoom.IsOpen = !PhotonNetwork.CurrentRoom.IsOpen;
            PhotonNetwork.CurrentRoom.IsVisible = PhotonNetwork.CurrentRoom.IsOpen;

            // MainCanvasManager.Instance.GameCanvas.transform.SetAsLastSibling();
            // game.SetActive(true);
            // endGameCanvas.SetActive(true);
            if (PhotonNetwork.CurrentRoom.PlayerCount != 1)
            {
                base.photonView.RPC("RPC_LoadGameOthers", RpcTarget.Others);
            }
            Scene scene = SceneManager.GetSceneByBuildIndex(1);
            if (!(scene.name == "Snake" && scene.isLoaded))
            {
                SceneManager.LoadScene(1, LoadSceneMode.Additive);
            }
        }
        // }
        // else
        // {
        //     print(PhotonNetwork.countOfPlayers);
        // }
    }

    [PunRPC]
    private void RPC_LoadGameOthers()
    {   
        // game.SetActive(true);
        // MainCanvasManager.Instance.GameCanvas.transform.SetAsLastSibling();
        // endGameCanvas.SetActive(true);
        Scene scene = SceneManager.GetSceneByBuildIndex(1);
        if (!(scene.name == "Snake" && scene.isLoaded))
        {
            SceneManager.LoadScene(1, LoadSceneMode.Additive);
        }
    }
}
