<template>
  <main>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb sol-breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink :to="{ name: 'plants'}" >{{ $t("plants.title") }}</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ $t("common." + ($route.params.id == 'add' ? 'add' : 'edit')) }}
        </li>
      </ol>
    </nav>

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

      <div class="sol-grouptitle">
        <button class="btn btn-sm btn-success" :title="$t('common.add')" @click="addInverter">+</button>&nbsp;
        <strong>{{$t('inverters.title')}}</strong>
      </div>
      <div v-if="'invertersErr' in formErrors" class="inverter-err">{{formErrors.invertersErr}}</div>

      <div class="card inverter-card" v-for="(item, index) in data.inverter" :key="index">
        <div class="card-body">

          <FormRow>
            <template v-slot:label>{{$t('common.name')}}</template>
            <template v-slot:field>
              <input
                v-model="item.name"
                type="text"
                :placeholder="$t('common.fill')"
                class="form-control form-control-sm"
                :class="{'is-invalid': 'name' in formErrors.inverter[index]}"
              />
              <div v-if="'name' in formErrors.inverter[index]" class="invalid-feedback">{{formErrors.inverter[index].name}}</div>
            </template>
          </FormRow>

          <FormRow>
            <template v-slot:label>{{$t('inverters.serial')}}</template>
            <template v-slot:field>
              <input
                v-model="item.serial"
                type="text"
                class="form-control form-control-sm"
              />
            </template>
          </FormRow>

          <FormRow>
            <template v-slot:label>{{$t('inverters.shadow')}}</template>
            <template v-slot:field>
              <input
                v-model="item.shadow"
                type="text"
                class="form-control form-control-sm"
              />
            </template>
          </FormRow>

          <button class="btn btn-danger btn-sm" :title="$t('common.del')" @click="deleteFormSubItem('inverter', index)">
            {{$t('common.del')}}
          </button>
        </div>
      </div>
      
      <div class="sol-form-footer">
        <Wuilert :msg="wuilertMsg" />
        <button class="btn btn-primary" @click="savePlant">{{$t('common.save')}}</button>&nbsp; 
        <button class="btn btn-warning" @click="$router.push({name: 'plants'})">{{$t('common.cancel')}}</button>
      </div>
      
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
        subModels: {
          inverter: {
            name: {notEmpty: 1},
            serial: {},
            shadow: {}
          }
        },
        data: null,
        formErrors: {},
        errorCount: 0,
        wuilertMsg: '{"msg":""}'
    };
  },

  created() {
    this.data = this.generateDefaultData(this.model)
    for(let i in this.subModels) {
      this.data[i] = []
      this.formErrors[i] = {}
    }
  },
  
  methods: {

    addFormSubItem(subModel) {
      this.data[subModel].unshift(this.generateDefaultData(this.subModels[subModel]))
      this.formErrors[subModel].unshift({})
    },

    deleteFormSubItem(subModel,index) {
      this.data[subModel].splice(index, 1)
      this.formErrors[subModel].splice(index, 1)
    },

    generateDefaultData(template) {
      let data = {}
      for(let i in template) {
        data[i] = 'default' in template[i] ? ''+template[i].default : ''
      }
      return data
    },

    validateFields(errors, model, data) {
      //console.log(Math.random()+'//'+JSON.stringify(data)+'//'+JSON.stringify(model))
      for(let i in model) {
        if('notEmpty' in model[i] && !data[i].match(/\S/)) {
          errors[i] = this.$t('common.fill') 
          this.errorCount++;
        }
      }
    },

    //////////////// Non-generic stuff

    addInverter() {
      delete this.formErrors.invertersErr
      this.addFormSubItem('inverter')
    },

    savePlant() {

      this.formErrors = {}
      this.errorCount = 0;
      this.validateFields(this.formErrors, this.model, this.data)

      this.formErrors.inverter = []
      if(this.data.inverter.length == 0) {
        this.formErrors.invertersErr = this.$t('inverters.noInverters')
      } else {
        for(let i in this.data.inverter) {
          this.formErrors.inverter[i] = {}
          this.validateFields(this.formErrors.inverter[i], this.subModels.inverter, this.data.inverter[i])
        }
      }

      //console.log(JSON.stringify(this.formErrors))

      if(this.errorCount) {
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

.inverter-err {
  color: red;
  margin-top: 5px;
}

.inverter-card {
  background-color: #a1ffd0;
  margin-top: 8px;
}

</style>
