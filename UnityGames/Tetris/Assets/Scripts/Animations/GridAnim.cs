using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GridAnim : MonoBehaviour
{

    public static Animator gridAnim;
    
    public void Start()
    {
        gridAnim = GetComponent<Animator>();
    }

}
