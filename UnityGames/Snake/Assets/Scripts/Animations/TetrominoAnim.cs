using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TetrominoAnim : MonoBehaviour
{

    public static Animator tetrominoAnim;
    
    public void Start()
    {
        print("hello");
        tetrominoAnim = GetComponent<Animator>();
    }

}
