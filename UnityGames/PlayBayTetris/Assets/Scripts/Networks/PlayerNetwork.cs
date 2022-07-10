using UnityEngine;
using UnityEngine.UI;
using TMPro;
public class PlayerNetwork : MonoBehaviour
{
    [SerializeField] TextMeshProUGUI introText;
    [SerializeField] Text lobbyUsername;

    public static PlayerNetwork Instance;
    public string PlayerName { get; private set; }

    private void Awake()
    {
        Instance = this;
        PlayerName = "Original";
        introText.text = "Hello " + PlayerName;
        lobbyUsername.text = PlayerName;
    }

    private void Name(string name)
    {
        string username = name;
        PlayerName = username;
        introText.text = "Hello " + PlayerName;
        lobbyUsername.text = PlayerName;
    }

}
