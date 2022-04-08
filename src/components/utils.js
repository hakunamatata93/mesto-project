export const startLoading= (btn) => {
  btn.textContent = btn.textContent + '...';
}
export const stopLoading = (btn) => {
  btn.textContent = btn.textContent.replace('...', '');
}
