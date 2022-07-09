using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HomepageCanvas : MonoBehaviour
{
    [SerializeField] GameObject lobby;
    [SerializeField] GameObject btn;
    [SerializeField] GameObject loaderCircle;
    [SerializeField] GameObject loaderProgress;

    public void ToLobby()
    {
        lobby.SetActive(true);
        btn.SetActive(false);
        loaderCircle.SetActive(true);
        loaderProgress.SetActive(true);
    }
}
