<template>
  <div>
    <p
      class="line-break-container text-justify mx-5"
      v-html="renderizarTexto"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  post: Object,
});

const renderizarTexto = ref("");

const { ops } = props.post;

for (const op of ops) {
  if (
    op.attributes &&
    op.attributes.bold &&
    op.attributes.italic &&
    op.attributes.underline
  ) {
    renderizarTexto.value += `<span class="font-bold italic underline">${op.insert}</span>`;
  } else if (op.attributes && op.attributes.italic && op.attributes.bold) {
    renderizarTexto.value += `<span class="italic font-bold">${op.insert}</span>`;
  } else if (op.attributes && op.attributes.italic && op.attributes.underline) {
    renderizarTexto.value += `<span class="italic underline">${op.insert}</span>`;
  } else if (op.attributes && op.attributes.underline && op.attributes.bold) {
    renderizarTexto.value += `<span class="underline font-bold">${op.insert}</span>`;
  } else if (op.attributes && op.attributes.bold) {
    renderizarTexto.value += `<span class="font-bold">${op.insert}</span>`;
  } else if (op.attributes && op.attributes.italic) {
    renderizarTexto.value += `<span class="italic">${op.insert}</span>`;
  } else if (op.attributes && op.attributes.link) {
    renderizarTexto.value += `<a href="${op.attributes.link}" class="underline">${op.insert}</a>`;
  } else if (op.attributes && op.attributes.underline) {
    renderizarTexto.value += `<span class="underline">${op.insert}</span>`;
  } else {
    renderizarTexto.value += `${op.insert}`;
  }
}
</script>

<style>
.line-break-container {
  white-space: pre-line;
}
</style>
