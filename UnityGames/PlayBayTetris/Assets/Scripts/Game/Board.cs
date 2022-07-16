using UnityEngine;
using UnityEngine.Tilemaps;
using UnityEngine.UI;
using System.Collections.Generic;
using System.Runtime.InteropServices;

public class Board : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void GameEnd(string timeFinished, int ClearedLines, int ClearedGame, int fourLinesCleared);

    public Tilemap tilemap { get; private set; }
    public TetrominoData[] tetrominoes;
    public Piece activePiece { get; private set; }
    public Vector3Int spawnPosition = new Vector3Int(-1, 7, 0);
    public Vector2Int boardSize = new Vector2Int(10, 22);
    public int linesCleared;
    public int tetrisesCleared = 0;
    public int tspinsDone;
    
    public bool finishedGame = false;
    private bool gameRunning = false;
    [SerializeField] Text linesClearedText;

    [SerializeField] GameObject endingScene;

    [SerializeField] GameObject tetrisGame;

    [SerializeField] GameObject game;

    [SerializeField] Text endTetrisTime;
    [SerializeField] Text tetrisTime;

    [SerializeField] Text successOrFailText;
    [SerializeField] Text successOrFailDesc;

    public GameObject tetrominoAnim;
    public GameObject ghostAnim;
    public GameObject gridAnim;
    public GameObject borderAnim;
    public GameObject lineclearAnim;
    public GameObject timerAnim;

    [SerializeField] GameObject initialTimer;


    public RectInt Bounds
    {
        get
        {
            Vector2Int position = new Vector2Int(-this.boardSize.x / 2, -this.boardSize.y / 2);
            return new RectInt(position, this.boardSize);
        }
    }

    private void Awake()
    {
        this.gameRunning = true;
        this.tilemap = GetComponentInChildren<Tilemap>();
        this.activePiece = GetComponentInChildren<Piece>();

        this.linesCleared = 0;

        for (int i = 0; i < this.tetrominoes.Length; i++) {
            this.tetrominoes[i].Initialise();
        }
    }

    private void Start()
    {
        SpawnPiece();
        Timer.instance.BeginTimer();
    }

    public void SpawnPiece()
    {
        if (gameRunning)
        {
            int random = Random.Range(0, this.tetrominoes.Length);
            TetrominoData data = this.tetrominoes[random];

            this.activePiece.Initialise(this, this.spawnPosition, data);

            if (IsValidPosition(this.activePiece, this.spawnPosition)) {
                Set(this.activePiece);      
            }
            else
            {
                if (!finishedGame)
                {
                GameOver();
                }
            }
        }
    }

    private void GameOver()
    {
        finishedGame = true;
        gameRunning = false;
        Timer.instance.EndTimer();
        if (linesCleared < 40)
        {
            GameEnd("FAILED", linesCleared, 0, tetrisesCleared);
        }
        else
        {
            GameEnd(tetrisTime.text, linesCleared, 1, tetrisesCleared);
        }


        var tAnim = tetrominoAnim.GetComponent<Animator>();
        var ghAnim = ghostAnim.GetComponent<Animator>();
        var grAnim = gridAnim.GetComponent<Animator>();
        var bAnim = borderAnim.GetComponent<Animator>();
        var lcAnim = lineclearAnim.GetComponent<Animator>();
        var tiAnim = timerAnim.GetComponent<Animator>();
        
        tAnim.SetTrigger("TAnim");
        ghAnim.SetTrigger("GhAnim");
        grAnim.SetTrigger("GrAnim");
        bAnim.SetTrigger("BAnim");
        lcAnim.SetTrigger("LCAnim");
        tiAnim.SetTrigger("TiAnim");

        endingScene.SetActive(true);
        Invoke("BackToMenu", 6f);
    }

    private void BackToMenu()
    {
        initialTimer.SetActive(true);
        tetrisGame.SetActive(false);
        endingScene.SetActive(false);
        if (linesCleared >= 40)
        {
            successOrFailText.text = "SUCCESS";
            successOrFailDesc.text = "You have cleared 40 lines!";
        }
        else
        {
            successOrFailText.text = "FAILED";
            successOrFailDesc.text = "You did not clear 40 lines!";
        }

        endTetrisTime.text = tetrisTime.text;
        game.SetActive(false);
        TetrisCanvasManager.Instance.EndScreen.transform.SetAsLastSibling();
    }
    
    public void Set(Piece piece)
    {
        for (int i = 0; i < piece.cells.Length; i++)
        {
            Vector3Int tilePosition = piece.cells[i] + piece.position;
            this.tilemap.SetTile(tilePosition, piece.data.tile);
        }
    }

    public void Clear(Piece piece)
    {
        for (int i = 0; i < piece.cells.Length; i++)
        {
            Vector3Int tilePosition = piece.cells[i] + piece.position;
            this.tilemap.SetTile(tilePosition, null);
        }
    }


    public bool IsValidPosition(Piece piece, Vector3Int position)
    {
        RectInt bounds = this.Bounds;

        for (int i = 0; i < piece.cells.Length; i++) {
            Vector3Int tilePosition = piece.cells[i] + position;

            if (!bounds.Contains((Vector2Int)tilePosition)) {
                return false;
            }

            if (this.tilemap.HasTile(tilePosition)) {
                return false;
            }
        }

        return true;
    }

    public void ClearLines()
    {
        RectInt bounds = this.Bounds;
        int row = bounds.yMin;
        int clearedAmt = 0;
        while (row < bounds.yMax)
        {
            if (IsLineFull(row)) {
                LineClear(row);
                linesCleared++;
                clearedAmt++;
                LinesClearedChange();
            } else {
                row++;
            }
        }
        if (clearedAmt == 4)
        {
            tetrisesCleared++;
        }
    }

    public void LinesClearedChange()
    {
        linesClearedText.text = "Lines Cleared: " + linesCleared.ToString() + "/40";

        if (linesCleared >= 40 && !finishedGame)
        {
            GameOver();
        }
    }

    private bool IsLineFull(int row)
    {
        RectInt bounds = this.Bounds;
        for (int col = bounds.xMin; col < bounds.xMax; col++)
        {
            Vector3Int position = new Vector3Int(col, row, 0);

            if (!this.tilemap.HasTile(position)) {
                return false;
            }         
        }

        return true;
    }

    private void LineClear(int row)
    {
        RectInt bounds = this.Bounds;

        for (int col = bounds.xMin; col < bounds.xMax; col++)
        {
            Vector3Int position = new Vector3Int(col, row, 0);
            this.tilemap.SetTile(position, null);
        }

        while (row < bounds.yMax)
        {
            for (int col = bounds.xMin; col < bounds.xMax; col++)
            {
                Vector3Int position = new Vector3Int(col, row + 1, 0);
                TileBase above = this.tilemap.GetTile(position);

                position = new Vector3Int(col, row, 0);
                this.tilemap.SetTile(position, above);
            }

            row++;
        }
    }
}
