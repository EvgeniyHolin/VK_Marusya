import useVuelidate from '@vuelidate/core';
import addErrorClass from '@/scripts/addErrorClass';
import type { Ref } from 'vue'


const validate = (data: Ref, rules: Object): boolean => {
  const v$ = useVuelidate(rules, { data });
  v$.value.$touch();

  if (v$.value.$invalid) {
    Object.values(v$.value.$errors).forEach(field => {
      const fieldElement = document.querySelector(`input[name="${field.$property}"]`);

      if (!field.$response) {
        addErrorClass(fieldElement);
      }
    })
    return false
  }

  return true
};

export default validate;
