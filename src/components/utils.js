export const startLoading= (btn) => {
  btn.value = btn.value + '...';
}
export const stopLoading = (btn) => {
  btn.value = btn.value.replace('...', '');
}
