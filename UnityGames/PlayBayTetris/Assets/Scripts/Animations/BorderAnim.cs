using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BorderAnim : MonoBehaviour
{

    public static Animator borderAnim;
    
    public void Start()
    {
        borderAnim = GetComponent<Animator>();
    }

}
