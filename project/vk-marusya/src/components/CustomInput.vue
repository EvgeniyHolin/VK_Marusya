<script lang="ts" setup>
  import { useFormDataStorage } from '@/stores/FormData';

  const formData = useFormDataStorage();

  const props = defineProps({
    placeholder: {
      type: String
    },
    typeVal: String,
    filedName: String
  });

  const emit = defineEmits(['getValue']);

  const setValue = (fieldName: string | undefined, value: string): void => {
    emit('getValue', fieldName, value)
  }
</script>

<template>
  <div class="custom-input">
    <div class="custom-input__icon">
      <slot name="icon"></slot>
    </div>
    <input class="custom-input__input"
      :type="props.typeVal"
      :placeholder="`${props.placeholder}`"
      :name="`${props.filedName}`"
      v-model="formData[ props.filedName ]"
      @change="setValue(filedName, formData[ props.filedName ])"
    >
  </div>
</template>
