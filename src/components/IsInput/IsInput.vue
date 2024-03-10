<script setup lang="ts">
interface Props {
  modelValue?: string;
}
const props = defineProps<Props>();
const emits = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <div :class="$style.formControl">
    <button :class="$style.formControl__button">
      <svg
        width="16px"
        height="16px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <label :class="$style.formControl__label">
      <input
        :id="$style.formControl__input"
        :class="$style.formControl__input"
        type="text"
        placeholder="Введите текст"
        :value="props.modelValue"
        @input="
          emits('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
    </label>
  </div>
</template>
<style module src="./IsInput.scss"></style>
