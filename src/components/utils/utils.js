export const loading = (
  popupSelector,
  isLoading = false,
  text = "Сохранить",
  loadingText = "Сохранение..."
) => {
  const button = document.querySelector(`${popupSelector} .popup__submit`);

  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = text;
  }
};
