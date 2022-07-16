mergeInto(LibraryManager.library, {
  GameEnd: function(timeFinished, RecordLength, JewelsCollected, SaboAmt, PowerUpGet)
  {
    window.dispatchReactUnityEvent(
      "GameEnd",
      Pointer_stringify(timeFinished),
      RecordLength,
      JewelsCollected,
      SaboAmt,
      PowerUpGet
    );
  },
  WinStats: function(winning)
  {
    window.dispatchReactUnityEvent(
      "WinStats",
      winning,
    );
  },
});