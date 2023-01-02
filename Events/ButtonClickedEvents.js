function playButtonClicked()
{
  createNewGame();
  hidePlayScreenButtons();
}

function helpButtonClicked()
{
  hidePlayScreenButtons();
  helpScreenActivated = true;
  closeHelpMenuButton.style("display", "block");
}

function closeHelpMenuButtonClicked()
{
  helpScreenActivated = false;
  closeHelpMenuButton.style("display", "none");
  displayPlayScreenButtons();
}