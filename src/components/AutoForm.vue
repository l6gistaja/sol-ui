<template>
    <FormRow>
        <template v-slot:label>
            {{$t('labelI' in $props.m.attributes[f] ? $props.m.attributes[f].labelI : $props.m.i18n + f)}}
        </template>
        <template v-slot:field>
            <div class="input-group sol-autorow-val">
                <slot name="field"></slot>
                <div v-if="'unit' in m.attributes[f]" class="input-group-append">
                    <span class="input-group-text">{{m.attributes[f].unit}}</span>
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
  f: String
})
</script>

<script>

export default {
  name: 'autoform'
}

</script>

