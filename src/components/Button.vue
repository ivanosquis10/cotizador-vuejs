<script setup>
const props = defineProps({
  operador: String,
})
</script>

<template>
  <button
    type="button"
    class="text-white bg-green-600 border-2 border-lime-500 hover:bg-green-700 hover:outline-none font-bold rounded-lg px-4 py-2 text-center inline-flex items-center mr-2"
    @click="$emit('fn')"
  >
    {{ operador }}
  </button>
</template>
