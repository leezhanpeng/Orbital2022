using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TetrisCanvasManager : MonoBehaviour
{
    public static TetrisCanvasManager Instance;
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
