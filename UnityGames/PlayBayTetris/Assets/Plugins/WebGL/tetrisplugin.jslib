mergeInto(LibraryManager.library, {
  GameEnd: function(timeFinished, ClearedLines, ClearedGame, fourLinesCleared)
  {
    window.dispatchReactUnityEvent(
      "GameEnd",
      Pointer_stringify(timeFinished),
      ClearedLines,
      ClearedGame,
      fourLinesCleared
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