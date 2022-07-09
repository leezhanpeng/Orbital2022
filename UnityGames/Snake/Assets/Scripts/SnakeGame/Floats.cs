using UnityEngine;

public class Floats : MonoBehaviour
{

    private void Start()
    {
        this.transform.position = new Vector3(-50, 0, 0.0f);
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.tag == "Player")
        {
            this.transform.position = new Vector3(-50, 0, 0.0f);
        }
    }
}
