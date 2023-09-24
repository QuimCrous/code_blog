<template>
    <div class="line-break-container" v-html="renderizarTexto" />
  </template>
  
  <script setup>
  import { ref } from 'vue';

  const props = defineProps({
    post: Object
})
  
  const renderizarTexto = ref('');
  
  const { ops } = props.post;
  
  for (const op of ops) {
    if (op.attributes && op.attributes.header) {
      renderizarTexto.value += `<p>${op.insert}</p>`;
    } else {
      if (op.attributes && op.attributes.bold) {
        renderizarTexto.value += `<span style="font-weight: bold;">${op.insert}</span>`;
      } else if (op.attributes && op.attributes.italic) {
        renderizarTexto.value += `<span style="font-style: italic;">${op.insert}</span>`;
      } else if (op.attributes && op.attributes.link) {
        renderizarTexto.value += `<a href="${op.attributes.link}">${op.insert}</a>`;
      } else {
        renderizarTexto.value += `${op.insert}`;
      }
    }
  }
  </script>
  
  <style>
  .line-break-container {
    white-space: pre-line;
  }
  </style>