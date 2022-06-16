using UnityEngine;
public class PlayerNetwork : MonoBehaviour
{

    public static PlayerNetwork Instance;
    public string PlayerName { get; private set; }

    private void Awake()
    {
        Instance = this;

        PlayerName = "Hello#" + Random.Range(1000,9999);
    }

}
