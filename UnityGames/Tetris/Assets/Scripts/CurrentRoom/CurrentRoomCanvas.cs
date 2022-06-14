using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class CurrentRoomCanvas : MonoBehaviour
{
    [SerializeField] GameObject game;
    [SerializeField] GameObject endGameCanvas;
    //[SerializeField] Text readiness;

    private PhotonView PhotonView;

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
        if (PhotonNetwork.isMasterClient)
        {
            PhotonNetwork.room.IsOpen = !PhotonNetwork.room.IsOpen;
            PhotonNetwork.room.IsVisible = PhotonNetwork.room.IsOpen;
            PhotonView = GetComponent<PhotonView>();
            // MainCanvasManager.Instance.GameCanvas.transform.SetAsLastSibling();
            // game.SetActive(true);
            // endGameCanvas.SetActive(true);
            PhotonView.RPC("RPC_LoadGameOthers", PhotonTargets.Others);
            SceneManager.LoadScene(1, LoadSceneMode.Additive);

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
        SceneManager.LoadScene(1, LoadSceneMode.Additive);
    }
}
