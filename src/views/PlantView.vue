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

    <AutoForm :m="dataModel" :e="formErrors" f="name">
        <template v-slot:field>
          <input
            v-model="data.name"
            type="text"
            :placeholder="$t('common.fill')"
            class="form-control form-control-sm"
            :class="{'is-invalid': formErrors['name'] != ''}"/>
        </template>
    </AutoForm>

    <AutoForm :m="dataModel" :e="formErrors" f="gridT">
        <template v-slot:field>
          <select
            v-model="data.gridT"
            class="form-control form-control-sm">
            <AutoOptions :m="dataModel" f="gridT"></AutoOptions>
          </select>
        </template>
    </AutoForm>

    <AutoForm :m="dataModel" :e="formErrors" f="address">
        <template v-slot:field>
          <input
            v-model="data.address"
            type="text"
            class="form-control form-control-sm"
          />
        </template>
    </AutoForm>

    <AutoForm :m="dataModel" :e="formErrors" f="tz">
        <template v-slot:field>
          <select
            v-model="data.tz"
            class="form-control form-control-sm">
            <AutoOptions :m="dataModel" f="tz"></AutoOptions>
          </select>
        </template>
    </AutoForm>

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

          <AutoForm :m="dataModel.attributes.inverters" :e="formErrors.inverters[index]" f="name">
              <template v-slot:field>
                <input
                  v-model="item.name"
                  type="text"
                  :placeholder="$t('common.fill')"
                  class="form-control form-control-sm"
                  :class="{'is-invalid': formErrors.inverters[index]['name'] != ''}"/>
              </template>
          </AutoForm>

          <AutoForm :m="dataModel.attributes.inverters" :e="formErrors.inverters[index]" f="shadow">
              <template v-slot:field>
                <input
                  v-model="item.shadow"
                  type="text"
                  placeholder="UUID"
                  class="form-control form-control-sm"
                />
              </template>
          </AutoForm>

          <AutoForm :m="dataModel.attributes.inverters" :e="formErrors.inverters[index]" f="Pout">
              <template v-slot:field>
                <input
                  v-model="item.Pout"
                  type="number"
                  min="0"
                  :placeholder="$t('common.fill')"
                  class="form-control form-control-sm"
                  :class="{'is-invalid': formErrors.inverters[index]['Pout'] != ''}"
                />
              </template>
          </AutoForm>

          <AutoForm :m="dataModel.attributes.inverters" :e="formErrors.inverters[index]" f="Udc0">
              <template v-slot:field>
                <input
                  v-model="item.Udc0"
                  type="number"
                  min="0"
                  :placeholder="$t('common.fill')"
                  class="form-control form-control-sm"
                  :class="{'is-invalid': formErrors.inverters[index]['Udc0'] != ''}"
                />
              </template>
          </AutoForm>

          <AutoForm :m="dataModel.attributes.inverters" :e="formErrors.inverters[index]" f="Udc1">
              <template v-slot:field>
                <input
                  v-model="item.Udc1"
                  type="number"
                  min="0"
                  :placeholder="$t('common.fill')"
                  class="form-control form-control-sm"
                  :class="{'is-invalid': formErrors.inverters[index]['Udc1'] != ''}"
                />
              </template>
          </AutoForm>

          <AutoForm :m="dataModel.attributes.inverters" :e="formErrors.inverters[index]" f="Umppt0">
              <template v-slot:field>
                <input
                  v-model="item.Umppt0"
                  type="number"
                  min="0"
                  :placeholder="$t('common.fill')"
                  class="form-control form-control-sm"
                  :class="{'is-invalid': formErrors.inverters[index]['Umppt0'] != ''}"
                />
              </template>
          </AutoForm>

          <AutoForm :m="dataModel.attributes.inverters" :e="formErrors.inverters[index]" f="Umppt1">
              <template v-slot:field>
                <input
                  v-model="item.Umppt1"
                  type="number"
                  min="0"
                  :placeholder="$t('common.fill')"
                  class="form-control form-control-sm"
                  :class="{'is-invalid': formErrors.inverters[index]['Umppt1'] != ''}"
                />
              </template>
          </AutoForm>

          <AutoForm :m="dataModel.attributes.inverters" :e="formErrors.inverters[index]" f="Uac">
              <template v-slot:field>
                <select
                  v-model="item.Uac"
                  class="form-control form-control-sm">
                  <AutoOptions :m="dataModel.attributes.inverters" f="Uac"></AutoOptions>
                </select>
              </template>
          </AutoForm>

          <FormRowFull>
            <template v-slot:field>
              <div class="sol-grouptitle">
                {{$t('BESS.title')}}
              </div>
            </template>
          </FormRowFull>

          <AutoForm :m="dataModel.attributes.inverters.attributes.BESS" 
            :e="formErrors.inverters[index].BESS" f="U">
              <template v-slot:field>
                <input
                  v-model="item.BESS.U"
                  type="number"
                  min="0"
                  :placeholder="$t('common.fill')"
                  class="form-control form-control-sm"
                  :class="{'is-invalid': formErrors.inverters[index].BESS['U'] != ''}"
                />
              </template>
          </AutoForm>

          <AutoForm :m="dataModel.attributes.inverters.attributes.BESS" 
            :e="formErrors.inverters[index].BESS" f="A">
              <template v-slot:field>
                <input
                  v-model="item.BESS.A"
                  type="number"
                  min="0"
                  :placeholder="$t('common.fill')"
                  class="form-control form-control-sm"
                  :class="{'is-invalid': formErrors.inverters[index].BESS['A'] != ''}"
                />
              </template>
          </AutoForm>

          <AutoForm :m="dataModel.attributes.inverters.attributes.BESS" 
            :e="formErrors.inverters[index].BESS" f="Pnom">
              <template v-slot:field>
                <input
                  v-model="item.BESS.Pnom"
                  type="number"
                  min="0"
                  :placeholder="$t('common.fill')"
                  class="form-control form-control-sm"
                  :class="{'is-invalid': formErrors.inverters[index].BESS['Pnom'] != ''}"
                />
              </template>
          </AutoForm>

          <AutoForm :m="dataModel.attributes.inverters.attributes.BESS" 
            :e="formErrors.inverters[index].BESS" f="Uw0">
              <template v-slot:field>
                <input
                  v-model="item.BESS.Uw0"
                  type="number"
                  min="0"
                  :placeholder="$t('common.fill')"
                  class="form-control form-control-sm"
                  :class="{'is-invalid': formErrors.inverters[index].BESS['Uw0'] != ''}"
                />
              </template>
          </AutoForm>

          <AutoForm :m="dataModel.attributes.inverters.attributes.BESS" 
            :e="formErrors.inverters[index].BESS" f="Uw1">
              <template v-slot:field>
                <input
                  v-model="item.BESS.Uw1"
                  type="number"
                  min="0"
                  :placeholder="$t('common.fill')"
                  class="form-control form-control-sm"
                  :class="{'is-invalid': formErrors.inverters[index].BESS['Uw1'] != ''}"
                />
              </template>
          </AutoForm>

          <AutoForm :m="dataModel.attributes.inverters.attributes.BESS" 
            :e="formErrors.inverters[index].BESS" f="Uc">
              <template v-slot:field>
                <input
                  v-model="item.BESS.Uc"
                  type="number"
                  min="0"
                  :placeholder="$t('common.fill')"
                  class="form-control form-control-sm"
                  :class="{'is-invalid': formErrors.inverters[index].BESS['Uc'] != ''}"
                />
              </template>
          </AutoForm>

          <FormRowFull>
            <template v-slot:field>
              <button class="btn btn-danger btn-sm" :title="$t('common.del')" 
                @click="deleteFormSubItem(data.inverters, formErrors.inverters, index)">
                {{$t('common.del')}}
              </button>
            </template>
          </FormRowFull>

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
import AutoForm from '../components/AutoForm.vue'
import AutoOptions from '../components/AutoOptions.vue'
import FormRow from '../components/FormRow.vue'
import FormRowFull from '../components/FormRowFull.vue'
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
          i18n: "plants.",
          attributes: {
            i: {},
            name: {notEmpty: 1, labelI: "common.name"},
            gridT: {default: "N", opts: ["N","L","M","H"], optsI: "~"},
            address: {},
            tz: {default: "Europe/Tallinn", opts: ["Europe/Tallinn"]},
            inverters: {
              dataModelType: "array",
              i18n: "inverters.",
              attributes: {
                name: {notEmpty: 1, labelI: "common.name"},
                shadow: {},
                Pout: {notEmpty: 1, unit: "kW"},
                Udc0: {notEmpty: 1, unit: "V"},
                Udc1: {notEmpty: 1, unit: "V"},
                Umppt0: {notEmpty: 1, unit: "V"},
                Umppt1: {notEmpty: 1, unit: "V"},
                Uac: {default: 230, opts: [230,400], unit: "V"},
                BESS: {
                  dataModelType: "map",
                  i18n: "BESS.",
                  attributes: {
                    U: {notEmpty: 1, unit: "V"},
                    A: {notEmpty: 1, unit: "Ah"},
                    Pnom: {notEmpty: 1, unit: "kW"},
                    Uw0: {notEmpty: 1, unit: "V"},
                    Uw1: {notEmpty: 1, unit: "V"},
                    Uc: {notEmpty: 1, unit: "V"}
                  }
                }
              }
            }

          }
        }
    };
  },

  created() {

    // TODO: catch exceptions when there is no browser support
    this.dataModel.attributes.tz.opts = Intl.supportedValuesOf('timeZone')
    this.dataModel.attributes.tz.default = Intl.DateTimeFormat().resolvedOptions().timeZone

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
            let subData = this.generateDefaultData(model.attributes[modelAttr])
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
                data[modelAttr][item]
              )
            }
          } else {
            errorCount += this.validateFields(
              formErrors[modelAttr], 
              model.attributes[modelAttr],
              data[modelAttr])
          }
        } else {
          formErrors[modelAttr] = ''
          if('notEmpty' in model.attributes[modelAttr] && !(''+data[modelAttr]).match(/\S/)) {
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

      //console.log('DATA' + JSON.stringify(this.data))
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
