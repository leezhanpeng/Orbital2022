using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using Photon.Pun;
using Photon.Realtime;
using TMPro;

public class Snake : MonoBehaviourPunCallbacks
{
    [SerializeField] TextMeshProUGUI jewelCountText;
    [SerializeField] GameObject finishScene;

    [SerializeField] GameObject snakeGame;
    [SerializeField] Text successOrFailText;
    [SerializeField] Text successOrFailDesc;
    [SerializeField] GameObject game;
    [SerializeField] GameObject initialTimer;
    [SerializeField] Text endSnakeTime;
    [SerializeField] TextMeshProUGUI snakeTime;

    [SerializeField] TextMeshProUGUI oppSaboed;
    [SerializeField] TextMeshProUGUI powerUps;
    [SerializeField] TextMeshProUGUI length;
    [SerializeField] TextMeshProUGUI saboActive;
    [SerializeField] GameObject saboText;
    [SerializeField] TextMeshProUGUI buffActive;
    [SerializeField] GameObject buffText;

    public int jewelCount = 0;
    public int oppSaboedCount = 0;
    public int powerUpsCount = 0;
    public int currentLength = 4;

    public int initialSize = 4;

    private Vector2 _direction = Vector2.right;
    private List<Transform> _segments = new List<Transform>();
    public Transform segmentPrefab;

    public GameObject SlowFloat;
    public GameObject SpeedFloat;
    public GameObject ExtendFloat;
    public GameObject DeductJewelFloat;
    public GameObject OkSpeedFloat;
    public BoxCollider2D boundary;

    private void Start()
    {
        _segments.Add(this.transform);
        for (int i = 1; i < this.initialSize; i++)
        {
            _segments.Add(Instantiate(this.segmentPrefab));
        }
        Timer.instance.BeginTimer();
    }

    private void BackToMenu()
    {
        for (int i = 1; i < _segments.Count; i++)
        {
            Destroy(_segments[i].gameObject);
        }
        initialTimer.SetActive(true);
        snakeGame.SetActive(false);
        finishScene.SetActive(false);
        if (jewelCount == 20)
        {
            successOrFailText.text = "SUCCESS";
            successOrFailDesc.text = "YOU HAVE OBTAINED 20 JEWELS!";
        }
        else
        {
            successOrFailText.text = "FAILED";
            successOrFailDesc.text = "YOU DID NOT OBTAIN 20 JEWELS!";
        }

        endSnakeTime.text = snakeTime.text;
        game.SetActive(false);
        SnakeCanvasManager.Instance.EndScreen.transform.SetAsLastSibling();
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.UpArrow) || Input.GetKeyDown(KeyCode.W)) {
            if (_direction != Vector2.down)
            {
                _direction = Vector2.up;
            }
        } else if(Input.GetKeyDown(KeyCode.DownArrow) || Input.GetKeyDown(KeyCode.S)) {
            if (_direction != Vector2.up)
            {
                _direction = Vector2.down;
            }
        } else if(Input.GetKeyDown(KeyCode.LeftArrow) || Input.GetKeyDown(KeyCode.A)) {
            if (_direction != Vector2.right)
            {
                _direction = Vector2.left;
            }
        } else if(Input.GetKeyDown(KeyCode.RightArrow) || Input.GetKeyDown(KeyCode.D)) {
            if (_direction != Vector2.left)
            {
                _direction = Vector2.right;
            }
        }
    }

    private void FixedUpdate()
    {
        if (jewelCount < 20)
        {
            for (int i = _segments.Count - 1; i > 0; i--)
            {
                _segments[i].position = _segments[i - 1].position;
            }

            this.transform.position = new Vector3(
                this.transform.position.x + _direction.x,
                this.transform.position.y + _direction.y,
                0.0f
            );
        }
    }

    private void JewelText(int jewels)
    {
        if (jewels < 0)
        {
            jewelCount = 0;
        }
        jewelCountText.text = "Jewels: " + jewelCount + "/20";
    }

    private void Grow()
    {
        jewelCount += 1;
        JewelText(jewelCount);
        if (jewelCount == 20)
        {
            GameOver();
        }
        Transform segment1 = Instantiate(this.segmentPrefab);
        Transform segment2 = Instantiate(this.segmentPrefab);
        segment1.position = _segments[_segments.Count - 1].position;
        segment2.position = _segments[_segments.Count - 2].position;

        _segments.Add(segment1);
        _segments.Add(segment2);
    }

    public void Punish()
    {
        jewelCount -= 1;
        JewelText(jewelCount);
        int lengths = _segments.Count - 2;
        currentLength -= 2;
        length.text = "Length: " + currentLength;
        if (lengths < 4)
        {
            lengths = 4;
            currentLength = 4;
            length.text = "Length: " + currentLength;
        }
        for (int i = 1; i < _segments.Count; i++)
        {
            Destroy(_segments[i].gameObject);
        }
        _segments.Clear();
        _segments.Add(this.transform);
        for (int i = 1; i < lengths; i++)
        {
            _segments.Add(Instantiate(this.segmentPrefab));
        }

        this.transform.position = Vector3.zero;

    }

    private void RandomizePosition(GameObject floats)
    {
        Bounds bounds = this.boundary.bounds;

        float x = Random.Range(bounds.min.x, bounds.max.x);
        float y = Random.Range(bounds.min.y, bounds.max.y);

        floats.transform.position = new Vector3(Mathf.Round(x), Mathf.Round(y), 0.0f);
    }

    private void SpawnSlow()
    {
        RandomizePosition(SlowFloat);
    }

    private void SpawnSpeed()
    {
        RandomizePosition(SpeedFloat);
    }

    private void SpawnExtend()
    {
        RandomizePosition(ExtendFloat);
    }

    private void SpawnDeductJewel()
    {
        RandomizePosition(DeductJewelFloat);
    }

    private void SpawnOkspeed()
    {
        RandomizePosition(OkSpeedFloat);
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.tag == "Jewel")
        {
            Grow();
            currentLength += 2;
            length.text = "Length: " + currentLength;
            float spawnValue = Random.Range(0,20);
            if (spawnValue <= 2)
            {
                SpawnSlow();
            } else if (spawnValue <= 4)
            {
                if (Time.fixedDeltaTime != 0.03f)
                {
                    SpawnSpeed();
                }
            } else if (spawnValue <= 6)
            {
                SpawnExtend();
            } else if (spawnValue <= 8)
            {
                SpawnDeductJewel();
            } else if (spawnValue <= 10)
            {
                SpawnOkspeed();
            }

        }
        else if (other.tag == "Slow")
        {
            oppSaboedCount += 1;
            oppSaboed.text = "Sabotage Others Count: " + oppSaboedCount;
            base.photonView.RPC("Slow", RpcTarget.Others);
        }
        else if (other.tag == "Speed")
        {
            oppSaboedCount += 1;
            oppSaboed.text = "Sabotage Others Count: " + oppSaboedCount;
            base.photonView.RPC("Speed", RpcTarget.Others);
        }
        else if (other.tag == "Extend")
        {
            oppSaboedCount += 1;
            oppSaboed.text = "Sabotage Others Count: " + oppSaboedCount;
            base.photonView.RPC("Extend", RpcTarget.Others);
        }
        else if (other.tag == "DeductJewel")
        {
            oppSaboedCount += 1;
            oppSaboed.text = "Sabotage Others Count: " + oppSaboedCount;
            base.photonView.RPC("DeductJewel", RpcTarget.Others);
        }
        else if (other.tag == "Okspeed")
        {
            powerUpsCount += 1;
            powerUps.text = "Power Ups Received: " + powerUpsCount;
            Okspeed();
        }
        else if (other.tag == "Obstacle")
        {
            Punish();
        }

    }

    private void BackToGame()
    {
        Time.fixedDeltaTime = 0.08f;
    }

    [PunRPC]
    private void Slow()
    {
        saboText.SetActive(true);
        saboActive.text = "SLOWED DOWN!";
        Invoke("RemoveSaboWords", 15f);
        Time.fixedDeltaTime = 0.5f;
        Invoke("BackToGame", 15f);
    }

    [PunRPC]
    private void Extend()
    {
        saboText.SetActive(true);
        saboActive.text = "SNAKE EXTENDED!";
        Invoke("RemoveFloatWords", 15f);
        for (int i = 0; i < 10; i++)
        {
            Transform segment = Instantiate(this.segmentPrefab);
            segment.position = _segments[_segments.Count - (i + 1)].position;
            _segments.Add(segment);
        }
        currentLength += 10;
        length.text = "Length: " + currentLength;      
    }

    [PunRPC]
    private void Speed()
    {
        saboText.SetActive(true);
        saboActive.text = "SPED UP TOO FAST!";
        Invoke("RemoveFloatWords", 15f);
        Time.fixedDeltaTime = 0.02f;
        Invoke("BackToGame", 15f);
    }

    [PunRPC]
    private void DeductJewel()
    {
        saboText.SetActive(true);
        saboActive.text = "JEWELS DEDUCTED!";
        Invoke("RemoveFloatWords", 15f);
        jewelCount -= 5;
        JewelText(jewelCount);
    }

    [PunRPC]
    private void Okspeed()
    {
        buffText.SetActive(true);
        buffActive.text = "SPED UP FAST!";
        Invoke("RemoveFloatWords", 15f);
        Time.fixedDeltaTime = 0.05f;
        Invoke("BackToGame", 15f);
    }

    private void GameOver()
    {
        Invoke("BackToMenu", 6f);
        Timer.instance.EndTimer();
        finishScene.SetActive(true);
    }

    [PunRPC]
    private void RemoveFloatWords()
    {
        saboText.SetActive(false);
        buffText.SetActive(false);
    }
}
