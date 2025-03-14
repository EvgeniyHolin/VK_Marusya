<script lang="ts" setup>
  import { useFormDataStorage } from '@/stores/FormData';

  const props = defineProps({
    placeholder: {
      type: String
    },
    typeVal: {
      type: String
    },
    filedName: {
      type: String
    },
    inputClass: {
      type: String
    },
    iconClass: {
      type: String
    }
  });

  const formData = useFormDataStorage();
  const emit = defineEmits(['getValue', 'hiddenList']);

  const setValue = (fieldName: string | undefined, value: string): void => {
    emit('getValue', fieldName, value)
  }

  const clearSearchField = () => {
    formData[ props.filedName ] = "";
    emit('hiddenList');
  };
</script>

<template>
  <div class="custom-input">
    <input class="custom-input__input"
      :class="inputClass"
      :type="props.typeVal"
      :placeholder="`${props.placeholder}`"
      :name="`${props.filedName}`"
      v-model="formData[ props.filedName ]"
      @change="setValue(filedName, formData[ props.filedName ])"
      @input="setValue(props.filedName, formData[ props.filedName ])"
    >
    <div class="custom-input__icon" :class="iconClass">
      <slot name="icon"></slot>
    </div>
    <button class="custom-input__clear" v-if="formData.search !== ''" @click="clearSearchField"></button>
  </div>
</template>
