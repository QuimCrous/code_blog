<template>
<div>
    <span v-for="op in post.ops" :key="op.insert">
        <span class="line-break-span" v-if="op.attributes && op.attributes.header">{{ op.insert }}</span>
        <span class="line-break-span" v-else>
            <span class="line-break-span" v-if="op.attributes && op.attributes.bold" style="font-weight: bold;">{{ op.insert }}</span><span class="line-break-span" v-else-if="op.attributes && op.attributes.italic" style="font-style: italic;">{{ op.insert }}</span>
            <span class="line-break-span" v-else-if="op.attributes && op.attributes.link"><a :href="op.attributes.link">{{ op.insert }}</a></span>
            <span class="line-break-span" v-else>{{ op.insert }}</span>
        </span>
    </span>
</div>
</template>

<script setup>
const props = defineProps({
    post: Object
})
</script>

<style>
.line-break-span {
  white-space: pre-line;
}
</style>