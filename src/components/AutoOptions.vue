<template>
    <option v-for="item in $props.m.attr[f].opts" :key="item" :value="item">
        {{
            'optsI' in $props.m.attr[f]
            ? $t($props.m.i18n + f + 'Options.' + item)
            : item
        }}
    </option>
</template>

<script setup>

const props = defineProps({
  m: Object,
  f: String
})

</script>

<script>

export default {
  name: 'autooptions'
}

</script>

