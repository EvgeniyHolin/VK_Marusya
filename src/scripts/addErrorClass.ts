const addErrorClass = (field: Element | null): void => {
  if (field) {
    const userInput = field.closest('.user-form__input')
    if (userInput) {
      userInput.classList.add('error')
    }
  }
};

export default addErrorClass;
