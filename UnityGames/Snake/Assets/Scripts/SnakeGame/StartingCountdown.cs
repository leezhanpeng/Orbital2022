using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class StartingCountdown : MonoBehaviour
{
    float currentTime;
    public float startingTime = 6f;

    [SerializeField] TextMeshProUGUI countdownText;
    [SerializeField] GameObject snakeGame;

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
            countdownText.text = "GO";
        } else if (countdownText.text == "6")
        {
            countdownText.text = "READY";
        }

        if (currentTime <= 0)
        {
            currentTime = 0;
            countdownText.enabled = false;
            snakeGame.SetActive(true);
        }
    }
}