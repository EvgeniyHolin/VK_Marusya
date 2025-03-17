const removeAllErrorClass = (): void => {
  const customInputs = document.querySelectorAll('.custom-input__input');
  customInputs.forEach(input => {
    input.classList.remove('error');
  });
};

export default removeAllErrorClass;
