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
            :class="{'is-invalid': formErrors['name'] != ''}"
          />
          <div v-if="formErrors['name'] != ''" class="invalid-feedback">{{formErrors.name}}</div>
        </template>
      </FormRow>
<!--
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
-->
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
<!--
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
-->
      <div class="sol-grouptitle">
        <button class="btn btn-sm btn-success" :title="$t('common.add')" 
          @click="addInverter">
            +
        </button>&nbsp;
        <strong>{{$t('inverters.title')}}</strong>
      </div>

      <div v-if="'invertersErr' in formErrors" class="inverter-err">{{formErrors.invertersErr}}</div>

      <div class="card inverter-card" v-for="(item, index) in data.inverters" :key="index">
        <div class="card-body">

          <FormRow>
            <template v-slot:label>{{$t('common.name')}}</template>
            <template v-slot:field>
              <input
                v-model="item.name"
                type="text"
                :placeholder="$t('common.fill')"
                class="form-control form-control-sm"
                :class="{'is-invalid': formErrors.inverters[index]['name'] != ''}" 
                />
                <div v-if="formErrors.inverters[index]['name'] != ''" class="invalid-feedback">{{formErrors.inverters[index]['name']}}</div>
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

          <button class="btn btn-danger btn-sm" :title="$t('common.del')" 
            @click="deleteFormSubItem(data.inverters, formErrors.inverters, index)">
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
        data: {},
        formErrors: {},
        errorCount: 0,
        wuilertMsg: '{"msg":""}',

        dataModel: {
          dataModelType: "map",
          attributes: {
            name: {notEmpty: 1},
            type: {default: "S", options: ["S","P","C"], i18n: "~"},
            grid: {default: "N", options: ["N","L","M","H"], i18n: "~"},
            address: {},
            //Intl.DateTimeFormat().resolvedOptions().timeZone
            tz: {default: "Europe/Tallinn", options: ["Europe/Tallinn"]},
            inverters: {
              dataModelType: 'array',
              attributes: {
                name: {notEmpty: 1},
                serial: {},
                shadow: {}
              }
            }

          }
        }
    };
  },

  created() {
    let gData = this.generateDefaultData(this.dataModel)
    this.data = gData.data
    this.formErrors = gData.errors
  },
  
  methods: {

    //////////////// Generic functions

    generateDefaultData(model) {
      let dData = {data: {}, errors: {}}
      for(let modelAttr in model.attributes) {
        if('dataModelType' in model.attributes[modelAttr]) {
          if(dData.data[modelAttr] = model.attributes[modelAttr].dataModelType == 'array' ) {
            dData.data[modelAttr] = []
            dData.errors[modelAttr] = []
          } else {
            let subData = generateDefaultData(model.attributes[modelAttr])
            dData.data[modelAttr] = subData.data
            dData.errors[modelAttr] = subData.errors
          }
        } else {
          dData.data[modelAttr] = 'default' in model.attributes[modelAttr] 
            ? model.attributes[modelAttr].default : ''
          dData.errors[modelAttr] = ''
        }
      }
      return dData;
    },

    addFormSubItem(subData, subErrors, subModel) {
      let gData = this.generateDefaultData(subModel)
      subData.unshift(gData.data)
      subErrors.unshift(gData.errors)
    },

    deleteFormSubItem(subData, subErrors, index) {
      subData.splice(index, 1)
      subErrors.splice(index, 1)
    },

    validateFields(formErrors, model, data) {
      let errorCount = 0
      let modelAttr = ''
      for(modelAttr in model.attributes) {
        if('dataModelType' in model.attributes[modelAttr]) {
          if(model.attributes[modelAttr].dataModelType == 'array' ) {
            for(let item in data[modelAttr]) {
              errorCount += this.validateFields(
                formErrors[modelAttr][item], 
                model.attributes[modelAttr], 
                data[modelAttr][item])
            }
          } else {
            errorCount += this.validateFields(formErrors[modelAttr], model[modelAttr], data[modelAttr])
          }
        } else {
          formErrors[modelAttr] = ''
          if('notEmpty' in model.attributes[modelAttr] && !data[modelAttr].match(/\S/)) {
            formErrors[modelAttr] = this.$t('common.fill')
            errorCount++;
          }
        }
      }
      return errorCount;
    },

    //////////////// Non-generic functions

    addInverter() {
      delete this.formErrors.invertersErr
      this.addFormSubItem(
        this.data.inverters,
        this.formErrors.inverters,
        this.dataModel.attributes.inverters
      )
    },
    
    savePlant() {

      this.errorCount = 0;
      this.errorCount += this.validateFields(this.formErrors, this.dataModel, this.data)

      if(this.data.inverters.length == 0) {
        this.formErrors.invertersErr = this.$t('inverters.noInverters')
        this.errorCount ++
      }

      //console.log('ERRORS' + JSON.stringify(this.formErrors) + ' ' + this.errorCount)
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
