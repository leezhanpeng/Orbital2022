using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RoomNameEmptyPopup : MonoBehaviour
{

    [SerializeField] GameObject popup;

    public void Inactive()
    {
        popup.SetActive(false);
    }
}
