using UnityEngine;
using UnityEngine.UI;
using TMPro;
public class PlayerNetwork : MonoBehaviour
{
    [SerializeField] TextMeshProUGUI introText;

    public static PlayerNetwork Instance;
    public string PlayerName { get; private set; }

    private void Awake()
    {

        string username = introText.text.Split(" ")[1];
        Instance = this;

        PlayerName = Random.Range(1000,9999).ToString();
    }

}
