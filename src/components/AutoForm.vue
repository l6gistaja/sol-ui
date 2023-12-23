<template>
    <FormRow>
        <template v-slot:label>
           <label :for="$props.id">{{$t('labelI' in $props.m.attr[f] ? $props.m.attr[f].labelI : $props.m.i18n + f)}}</label>
        </template>
        <template v-slot:field>
            <div class="input-group sol-autorow-val">
                <slot name="field"></slot>
                <div v-if="'unit' in m.attr[f]" class="input-group-append inputGroup-sizing-sm">
                    <span class="input-group-text">{{m.attr[f].unit}}</span>
                </div>
                <div v-if="$props.e[f] != ''" class="invalid-feedback">{{$props.e[f]}}</div>
            </div>
        </template>
    </FormRow>
</template>

<script setup>
import FormRow from './FormRow.vue'

const props = defineProps({
  m: Object,
  e: Object,
  f: String,
  id: String
})
</script>

<script>

export default {
  name: 'autoform'
}

</script>

