using UnityEngine;
using UnityEngine.UI;
using Photon.Pun;
using Photon.Realtime;

public class PlayerListing : MonoBehaviour
{
    public Player PhotonPlayer { get; private set; }

    [SerializeField] private Text _playerName;
    private Text PlayerName
    {
        get { return _playerName; }
    }

    public void ApplyPhotonPlayer(Player photonPlayer)
    {
        PhotonPlayer = photonPlayer;
        PlayerName.text = photonPlayer.NickName;
    }
}
