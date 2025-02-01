const addErrorClass = (field: Element | null): void => {
  if (field) {
    const wrapper = field.closest('.user-form__input')
    if (wrapper) {
      wrapper.classList.add('error')
    }
  }
};

export default addErrorClass;
