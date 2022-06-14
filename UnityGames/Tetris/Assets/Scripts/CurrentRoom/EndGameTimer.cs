using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class EndGameTimer : MonoBehaviour
{
    float currentTime;
    public float startingTime = 6f;

    [SerializeField] TextMeshProUGUI countdownText;

    void Start()
    {
        currentTime = startingTime;
    }

    void Update()
    {
        currentTime -= 1 * Time.deltaTime;
        countdownText.text = currentTime.ToString("0");
        if (countdownText.text == "0")
        {
            countdownText.text = "0";
        } else if (countdownText.text == "6")
        {
            countdownText.text = "5";
        }

        if (currentTime <= 0)
        {
            currentTime = 0;
  
        }
    }
}
