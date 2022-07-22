mergeInto(LibraryManager.library, {
  SendWPM: function(WPM, wordsTyped, pos)
  {
    window.dispatchReactUnityEvent(
      "SendWPM",
      WPM,
      wordsTyped,
      pos
    );
  },
});