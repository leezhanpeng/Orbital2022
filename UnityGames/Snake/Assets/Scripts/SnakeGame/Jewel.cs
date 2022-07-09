using UnityEngine;

public class Jewel : MonoBehaviour
{
    public BoxCollider2D boundary;

    private void Start()
    {
        Invoke("RandomizePosition", 0.01f);
    }

    private void RandomizePosition()
    {
        Bounds bounds = this.boundary.bounds;

        float x = Random.Range(bounds.min.x, bounds.max.x);
        float y = Random.Range(bounds.min.y, bounds.max.y);

        this.transform.position = new Vector3(Mathf.Round(x), Mathf.Round(y), 0.0f);
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.tag == "Player")
        {
            RandomizePosition();
        }
    }
}
