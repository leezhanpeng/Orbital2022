using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GhostAnim : MonoBehaviour
{

    public static Animator ghostAnim;
    
    public void Start()
    {
        ghostAnim = GetComponent<Animator>();
    }

}
