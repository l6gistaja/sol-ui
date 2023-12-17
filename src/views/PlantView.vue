<template>
  <main>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink :to="{ name: 'plants'}" >{{ $t("plants.title") }}</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">
            {{ $t("common." + ($route.params.id == 'add' ? 'add' : 'edit')) }}
        </li>
      </ol>
    </nav>

    <form @submit.prevent="savePlant">

      <FormRow>
        <template v-slot:label>{{$t('common.name')}}</template>
        <template v-slot:field>
          <input
            v-model="data.name"
            type="text"
            :placeholder="$t('common.fill')"
            class="form-control form-control-sm"
            :class="{'is-invalid': 'name' in formErrors}"
          />
          <div v-if="'name' in formErrors" class="invalid-feedback">{{formErrors.name}}</div>
        </template>
      </FormRow>

      <FormRow>
        <template v-slot:label>{{$t('plants.type')}}</template>
        <template v-slot:field>
          <select
            v-model="data.type"
            class="form-control form-control-sm"
            >
            <option v-for="item in model.type.options" :key="'type_'+item" :value="item">
              {{$t('plants.typeOptions.' + item)}}
            </option>
          </select>
        </template>
      </FormRow>

      <FormRow>
        <template v-slot:label>{{$t('plants.grid')}}</template>
        <template v-slot:field>
          <select
            v-model="data.grid"
            class="form-control form-control-sm">
            <option v-for="item in model.grid.options" :key="'grid_'+item" :value="item">
              {{ $t('plants.gridOptions.' + item) }}
            </option>
          </select>
        </template>
      </FormRow>

      <FormRow>
        <template v-slot:label>{{$t('plants.address')}}</template>
        <template v-slot:field>
          <input
            v-model="data.address"
            type="text"
            class="form-control form-control-sm"
          />
        </template>
      </FormRow>

      <FormRow>
        <template v-slot:label>{{$t('plants.tz')}}</template>
        <template v-slot:field>
          <select
            v-model="data.tz"
            class="form-control form-control-sm">
            <option v-for="item in Intl.supportedValuesOf('timeZone')" :key="'tz_'+item" :value="item">
              {{item}}
            </option>
          </select>
        </template>
      </FormRow>
      
      <Wuilert :msg="wuilertMsg" />
      <button class="btn btn-success">{{$t('common.save')}}</button>&nbsp; 
      <button class="btn btn-warning" @click="$router.push({name: 'plants'})">{{$t('common.cancel')}}</button>
    </form>
  </main>
</template>

<script setup>

import { Amplify } from 'aws-amplify'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)
import { get, post } from 'aws-amplify/api'
import FormRow from '../components/FormRow.vue'
import Wuilert from '../components/Wuilert.vue'
</script>

<script>

export default {
  name: 'plant',
  
  data() {
    return {
        model: {
          name: {notEmpty: 1},
          type: {default: 'S', options: ['S','P','C']},
          grid: {default: 'N', options: ['N','L','M','H']},
          address: {},
          tz: {default: Intl.DateTimeFormat().resolvedOptions().timeZone}
        },
        data: null,
        formErrors: {},
        timezones: '',
        wuilertMsg: '{"msg":""}'
    };
  },

  created() {
    this.data = this.generateDefaultData(this.model)
  },
  
  methods: {

    generateDefaultData(template) {
      let data = {}
      for(let i in template) {
        data[i] = 'default' in template[i] ? ''+template[i].default : ''
      }
      return data
    },

    savePlant() {
      this.formErrors = {}
      let errorCount = 0;
      for(let i in this.model) {
        if('notEmpty' in this.model[i] && !this.data[i].match(/\S/)) {
          this.formErrors[i] = this.$t('common.fill') 
          errorCount++;
        }
      }
      if(errorCount) {
        this.wuilertMsg = JSON.stringify({
          text: this.$t('common.fixErrors'),
          t: Date.now(),
        });
      } else {
        this.$router.push({name: 'plants'})
      }
    }
  }
  
};
</script>

<style scoped>

</style>
