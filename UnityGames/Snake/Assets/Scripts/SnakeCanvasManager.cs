using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SnakeCanvasManager : MonoBehaviour
{
    public static SnakeCanvasManager Instance;
    [SerializeField] private GameCanvas _gameCanvas;
    public GameCanvas GameCanvas
    {
        get { return _gameCanvas; }
    }

    [SerializeField] private EndScreen _endScreen;
    public EndScreen EndScreen
    {
        get { return _endScreen; }
    }

    private void Awake()
    {
        Instance = this;
    }
}
