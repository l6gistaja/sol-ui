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
    
    <Spinner v-if="searching"></Spinner>

    <div v-if="!searching">

    <!-- ----------- MAIN SECTION ----------- -->

    <AutoForm v-for="(autoP, autoF) in getVisibleAutoFields(dataModel, '')" 
    :key="autoP.id"
    :m="dataModel" :e="formErrors" :f="autoF" :id="autoP.id">
        <template v-slot:field>

          <input
            v-if="autoP.textField"
            v-model="data[autoF]"
            :type="autoP.type"
            :placeholder="autoP.placeholder"
            :id="autoP.id"
            class="form-control form-control-sm"
            :class="{'is-invalid': formErrors[autoF] != ''}"/>
          
          <select
            v-if="autoP.type == 'select'"
            v-model="data[autoF]"
            :id="autoP.id"
            class="form-control form-control-sm"
            :class="{'is-invalid': formErrors[autoF] != ''}">
            <AutoOptions :m="dataModel" :f="autoF"></AutoOptions>
          </select>

        </template>
    </AutoForm>

    <div class="card sol-card-grid" v-if="data.gridT != 'N'">
      <div class="card-body">
        <div class="card-title sol-grouptitle">{{$t('grid.title')}}</div>
          <AutoForm v-for="(autoP, autoF) in getVisibleAutoFields(dataModel.attr.grid, 'grid_')" 
          :key="autoP.id"
          :m="dataModel.attr.grid" :e="formErrors.grid" :f="autoF" :id="autoP.id">
              <template v-slot:field>

                <input
                  v-if="autoP.textField"
                  v-model="data.grid[autoF]"
                  :type="autoP.type"
                  :placeholder="autoP.placeholder"
                  :id="autoP.id"
                  class="form-control form-control-sm"
                  :class="{'is-invalid': formErrors.grid[autoF] != ''}"/>

                <!--
                <select
                  v-if="autoP.type == 'select'"
                  v-model="data[autoF]"
                  :id="autoP.id"
                  class="form-control form-control-sm"
                  :class="{'is-invalid': formErrors.grid[autoF] != ''}">
                  <AutoOptions :m="dataModel.attr.grid" :f="autoF"></AutoOptions>
                </select>
                -->

              </template>
          </AutoForm>
      </div>
    </div>


    <!-- ----------- INVERTERS ----------- -->


    <div class="sol-grouptitle">
      <br/>
      <button class="btn btn-sm btn-success" :title="$t('common.add')" 
        @click="addInverter">
          +
      </button>&nbsp;
      <strong>{{$t('inverters.title')}}</strong>
    </div>

    <div v-if="'invertersErr' in formErrors" class="sol-inverter-err">{{formErrors.invertersErr}}</div>

    <div class="card sol-card-inverter" v-for="(item, index) in data.inverters" :key="index">

      <div class="card-body">

        <AutoForm v-for="(autoP, autoF) in getVisibleAutoFields(dataModel.attr.inverters, 'inverters_'+index+'_')" 
        :key="autoP.id"
        :m="dataModel.attr.inverters" :e="formErrors.inverters[index]" :f="autoF" :id="autoP.id">
            <template v-slot:field>

              <input
                v-if="autoP.textField"
                v-model="item[autoF]"
                :type="autoP.type"
                :placeholder="autoP.placeholder"
                :id="autoP.id"
                class="form-control form-control-sm"
                :class="{'is-invalid': formErrors.inverters[index][autoF] != ''}"/>
              
              <select
                v-if="autoP.type == 'select'"
                v-model="item[autoF]"
                :id="autoP.id"
                class="form-control form-control-sm"
                :class="{'is-invalid': formErrors.inverters[index][autoF] != ''}">
                <AutoOptions :m="dataModel.attr.inverters" :f="autoF"></AutoOptions>
              </select>

            </template>
        </AutoForm>

        <!-- ----------- BATTERIES ----------- -->

        <FormRowFull>
          <template v-slot:field>
            <br/>
            <div class="sol-grouptitle">{{$t('BESS.title')}}</div>
            <br/>
          </template>
        </FormRowFull>

        <AutoForm v-for="(autoP, autoF) in getVisibleAutoFields(dataModel.attr.inverters.attr.BESS, 'inverters_'+index+'_BESS_')" 
        :key="autoP.id"
        :m="dataModel.attr.inverters.attr.BESS" :e="formErrors.inverters[index].BESS" :f="autoF" :id="autoP.id">
            <template v-slot:field>

              
              <input
                v-if="autoP.textField"
                v-model="item.BESS[autoF]"
                :type="autoP.type"
                :placeholder="autoP.placeholder"
                :id="autoP.id"
                class="form-control form-control-sm"
                :class="{'is-invalid': formErrors.inverters[index].BESS[autoF] != ''}"/>
              
              <!--              
              <select
                v-if="autoP.type == 'select'"
                v-model="item.BESS[autoF]"
                :id="autoP.id"
                class="form-control form-control-sm"
                :class="{'is-invalid': formErrors.inverters[index].BESS[autoF] != ''}">
                <AutoOptions :m="dataModel.attr.inverters.attr.BESS" :f="autoF"></AutoOptions>
              </select>
              -->

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


    <!-- ----------- PRODUCERS ----------- -->


    <div class="sol-grouptitle">
      <br/>
      <button class="btn btn-sm btn-success" :title="$t('common.add')" 
        @click="addFormSubItem(data.producers,formErrors.producers,dataModel.attr.producers)">
          +
      </button>&nbsp;
      <strong>{{$t('producers.title')}}</strong>
    </div>

    <div class="card sol-card-producer" v-for="(item, index) in data.producers" :key="index">

      <div class="card-body">

        <AutoForm v-for="(autoP, autoF) in getVisibleAutoFields(dataModel.attr.producers, 'producers_'+index+'_')" 
        :key="autoP.id"
        :m="dataModel.attr.producers" :e="formErrors.producers[index]" :f="autoF" :id="autoP.id">
            <template v-slot:field>

              <input
                v-if="autoP.textField"
                v-model="item[autoF]"
                :type="autoP.type"
                :placeholder="autoP.placeholder"
                :id="autoP.id"
                class="form-control form-control-sm"
                :class="{'is-invalid': formErrors.producers[index][autoF] != ''}"/>
              
              <select
                v-if="autoP.type == 'select'"
                v-model="item[autoF]"
                :id="autoP.id"
                class="form-control form-control-sm"
                :class="{'is-invalid': formErrors.producers[index][autoF] != ''}">
                <AutoOptions :m="dataModel.attr.producers" :f="autoF"></AutoOptions>
              </select>

            </template>
        </AutoForm>

        <FormRowFull>
          <template v-slot:field>
            <button class="btn btn-danger btn-sm" :title="$t('common.del')" 
              @click="deleteFormSubItem(data.producers, formErrors.producers, index)">
              {{$t('common.del')}}
            </button>
          </template>
        </FormRowFull>

      </div>

    </div>

    <!-- ----------- CONSUMERS ----------- -->
     

    <div class="sol-grouptitle">
      <br/>
      <button class="btn btn-sm btn-success" :title="$t('common.add')" 
        @click="addFormSubItem(data.consumers,formErrors.consumers,dataModel.attr.consumers)">
          +
      </button>&nbsp;
      <strong>{{$t('consumers.title')}}</strong>
    </div>

    <div class="card sol-card-consumer" v-for="(item, index) in data.consumers" :key="index">

      <div class="card-body">

        <AutoForm v-for="(autoP, autoF) in getVisibleAutoFields(dataModel.attr.consumers, 'consumers_'+index+'_')" 
        :key="autoP.id"
        :m="dataModel.attr.producers" :e="formErrors.consumers[index]" :f="autoF" :id="autoP.id">
            <template v-slot:field>

              <input
                v-if="autoP.textField"
                v-model="item[autoF]"
                :type="autoP.type"
                :placeholder="autoP.placeholder"
                :id="autoP.id"
                class="form-control form-control-sm"
                :class="{'is-invalid': formErrors.consumers[index][autoF] != ''}"/>
              
              <select
                v-if="autoP.type == 'select'"
                v-model="item[autoF]"
                :id="autoP.id"
                class="form-control form-control-sm"
                :class="{'is-invalid': formErrors.consumers[index][autoF] != ''}">
                <AutoOptions :m="dataModel.attr.consumers" :f="autoF"></AutoOptions>
              </select>

            </template>
        </AutoForm>

        <FormRowFull>
          <template v-slot:field>
            <button class="btn btn-danger btn-sm" :title="$t('common.del')" 
              @click="deleteFormSubItem(data.consumers, formErrors.consumers, index)">
              {{$t('common.del')}}
            </button>
          </template>
        </FormRowFull>

      </div>

    </div>

    <!-- SHADOW -->
    <!-- TODO: i18n & better handling for different inventer types -->
    
    <div v-if="shadow.visible == 'error'" class="sol-inverter-err">
      <br/>
      Can't load live data. Is invereter's shadow value correct?
    </div>

    <div v-if="shadow.visible == 'shadow'">
      <br/>

      <table class="table table-bordered table-sm w-auto">
        <thead>
        <tr>
          <th>Phases</th>
          <th>A</th>
          <th>B</th>
          <th>C</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Grid Voltage</td>
          <td>{{shadow.data.state.reported.raw['Grid Voltage A']}}</td>
          <td>{{shadow.data.state.reported.raw['Grid Voltage B']}}</td>
          <td>{{shadow.data.state.reported.raw['Grid Voltage C']}}</td>
        </tr>
        <tr>
          <td>Grid Current</td>
          <td>{{shadow.data.state.reported.raw['Grid Current A']}}</td>
          <td>{{shadow.data.state.reported.raw['Grid Current B']}}</td>
          <td>{{shadow.data.state.reported.raw['Grid Current C']}}</td>
        </tr>
        </tbody>
      </table>

      <strong>Battery</strong>
      <table class="table table-bordered table-sm w-auto">
        <tbody>
        <tr>
          <td>Voltage</td>
          <td>{{shadow.data.state.reported.raw['BAT Voltage']}}</td>
        </tr>
        <tr>
          <td>Current</td>
          <td>{{shadow.data.state.reported.raw['BAT Current']}}</td>
        </tr>
        <tr>
          <td>SoC</td>
          <td>{{shadow.data.state.reported.raw['BAT SOC']}}</td>
        </tr>
        <tr>
          <td>Temperature</td>
          <td>{{shadow.data.state.reported.raw['BAT Temperature']}}</td>
        </tr>
        </tbody>
      </table>

    </div>
    
    <div class="sol-form-footer">
      <Wuilert :msg="wuilertMsg" />
      <button class="btn btn-primary" @click="savePlant">{{$t('common.save')}}</button>&nbsp; 
      <button class="btn btn-warning" @click="$router.push({name: 'plants'})">{{$t('common.cancel')}}</button>&nbsp;
      <button v-if="idParts.length == 2" class="btn btn-danger" @click="deletePlant">{{$t('common.del')}}</button>
    </div>

    </div>

  </main>
</template>

<script setup>

import { Amplify } from 'aws-amplify'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)
import { del, get, post, put } from 'aws-amplify/api'

import { toRefs } from 'vue'
import { useAuthenticator } from '@aws-amplify/ui-vue'

import Slug64 from '../lib/Slug64';
import SolAws from '../lib/SolAws'

import AutoForm from '../components/AutoForm.vue'
import AutoOptions from '../components/AutoOptions.vue'
import FormRow from '../components/FormRow.vue'
import FormRowFull from '../components/FormRowFull.vue'
import Spinner from '../components/Spinner.vue'
import Wuilert from '../components/Wuilert.vue'

</script>

<script>

export default {
  name: 'plant',
  
  data() {
    return {
        user: null,
        data: {},
        formErrors: {},
        errorCount: 0,
        wuilertMsg: '{"msg":""}',
        msg: '',
        searching: false,
        idParts: [],
        shadow: {
          visible: 'none',
          timerId: null
        },

        dataModel: {
          dataModelType: "map",
          i18n: "plants.",
          attr: {
            creator: {default: "", type: "hidden"},
            created: {type: "hidden"},
            installer: {type: "hidden"},
            name: {notEmpty: 1, labelI: "common.name"},
            address: {},
            tz: {default: "Europe/Tallinn", opts: ["Europe/Tallinn"]},
            lat: {default: 0, placeholder: 59.43729, type: "number"},
            lon: {default: 0, placeholder: 24.74533, type: "number"},
            gridT: {default: "N", opts: ["N","L","M","H"], optsI: "~"},
            grid: {
              dataModelType: "map",
              i18n: "grid.",
              attr: {
                joined: {notEmpty: 1, type: "date"},
                out: {notEmpty: 1, type: "number", unit: "kW"},
                in: {notEmpty: 1, type: "number", unit: "kW"}
              }
            },
            inverters: {
              dataModelType: "array",
              i18n: "inverters.",
              attr: {
                name: {notEmpty: 1, labelI: "common.name"},
                shadow: {placeholder: "UUID"},
                Pout: {notEmpty: 1, type: "number", unit: "kW"},
                Udc0: {notEmpty: 1, type: "number", unit: "V"},
                Udc1: {notEmpty: 1, type: "number", unit: "V"},
                Umppt0: {notEmpty: 1, type: "number", unit: "V"},
                Umppt1: {notEmpty: 1, type: "number", unit: "V"},
                Uac: {default: 230, opts: [230,400], unit: "V"},
                BESS: {
                  dataModelType: "map",
                  i18n: "BESS.",
                  attr: {
                    U: {notEmpty: 1, type: "number", unit: "V"},
                    A: {notEmpty: 1, type: "number", unit: "Ah"},
                    Pnom: {notEmpty: 1, type: "number", unit: "kW"},
                    Uw0: {notEmpty: 1, type: "number", unit: "V"},
                    Uw1: {notEmpty: 1, type: "number", unit: "V"},
                    Uc: {notEmpty: 1, type: "number", unit: "V"}
                  }
                }
              }
            },
            producers: {
              dataModelType: "array",
              i18n: "producers.",
              attr: {
                name: {notEmpty: 1, labelI: "common.name"},
                type: {default: "Photovoltaic", opts: ["Photovoltaic", "Wind", "Generator"]}
              }
            },
            consumers: {
              dataModelType: "array",
              i18n: "consumers.",
              attr: {
                name: {notEmpty: 1, labelI: "common.name"},
                type: {default: "Electric Vehicle", opts: ["Electric Vehicle"]}
              }
            }

          }
        }
    };
  },

  async created() {

    // TODO: catch exceptions when there is no browser support
    this.dataModel.attr.tz.opts = Intl.supportedValuesOf('timeZone')
    this.dataModel.attr.tz.default = Intl.DateTimeFormat().resolvedOptions().timeZone

    let gData = this.generateDefaultData(this.dataModel, {})
    this.data = gData.data
    this.formErrors = gData.errors

    const { user } = toRefs(useAuthenticator())
    this.user = user

    if(this.$route.params.id.match(/^[.\-0-9A-Za-z]+_[\d]+$/)) {
      this.idParts = this.$route.params.id.split('_')
      this.searching = true
      this.msg = ''
      try {
        const restOperation = get({ 
          apiName: 'SoleronUIAPI',
          path: '/plants/object/'+this.idParts[0]+'/'+this.idParts[1],
          options: { queryParams: {} }
        });
        const { body } = await restOperation.response
        let bodyTxt = await body.text()
        let plant = JSON.parse(bodyTxt)
        gData = this.generateDefaultData(this.dataModel, plant)
        this.data = gData.data
        this.formErrors = gData.errors
        if(this.data.inverters.length > 0) {
          this.shadowLoad();
          if (this.shadow.timerId === null) { this.shadow.timerId = setInterval(this.shadowLoad, 30000); }
        }
      } catch (error) {
        this.msg = this.$t('common.dbError', {dbErr: error})
      }
      this.searching = false
    }

  },

  beforeUnmount() {
    this.shadowStopPolling()
  },

  beforeDestroy() {
    this.shadowStopPolling()
  },
  
  methods: {

    //////////////// Generic functions

    getVisibleAutoFields(model, idPrefix) {
      let y = {}
      for(let f in model.attr) {
        if(
          !('dataModelType' in model.attr[f])
          && !('type' in model.attr[f] && model.attr[f].type == 'hidden')
        ) { 
          y[f] = {
            type: 'opts' in model.attr[f] 
              ? 'select'
              : ('type' in model.attr[f] ? model.attr[f].type : 'text'),
            placeholder: 'placeholder' in model.attr[f]
              ? model.attr[f].placeholder
              : ('notEmpty' in model.attr[f] ? this.$t('common.fill') : ''),
            id: idPrefix + f,
            textField: true
          }
          let nonTxtTypes = ['select','hidden'];
          for(let i in nonTxtTypes) {
            if(y[f].type == nonTxtTypes[i]) {
              y[f].textField = false
              break
            }
          }
        }
      }
      return y
    },

    generateDefaultData(model, actualData) {
      let dData = {data: {}, errors: {}}
      for(let modelAttr in model.attr) {
        if('dataModelType' in model.attr[modelAttr]) {
          if(dData.data[modelAttr] = model.attr[modelAttr].dataModelType == 'array' ) {
            dData.data[modelAttr] = []
            dData.errors[modelAttr] = []
            if(modelAttr in actualData) {
              for(let arrayItem in actualData[modelAttr]) {
                let subData = this.generateDefaultData(
                  model.attr[modelAttr], 
                  actualData[modelAttr][arrayItem]
                )
                dData.data[modelAttr].push(subData.data)
                dData.errors[modelAttr].push(subData.errors)
              }
            }
          } else {
            let subData = this.generateDefaultData(
              model.attr[modelAttr], 
              modelAttr in actualData ? actualData[modelAttr] : {}
            )
            dData.data[modelAttr] = subData.data
            dData.errors[modelAttr] = subData.errors
          }
        } else {
          dData.data[modelAttr] = modelAttr in actualData
            ? actualData[modelAttr]
            : ('default' in model.attr[modelAttr] ? model.attr[modelAttr].default : '')
          dData.errors[modelAttr] = ''
        }
      }
      return dData;
    },

    addFormSubItem(subData, subErrors, subModel) {
      let gData = this.generateDefaultData(subModel, {})
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
      for(modelAttr in model.attr) {
        if('dataModelType' in model.attr[modelAttr]) {
          if(model.attr[modelAttr].dataModelType == 'array' ) {
            for(let item in data[modelAttr]) {
              errorCount += this.validateFields(
                formErrors[modelAttr][item], 
                model.attr[modelAttr], 
                data[modelAttr][item]
              )
            }
          } else {
            errorCount += this.validateFields(
              formErrors[modelAttr], 
              model.attr[modelAttr],
              data[modelAttr])
          }
        } else {
          formErrors[modelAttr] = ''
          if('notEmpty' in model.attr[modelAttr] && !(''+data[modelAttr]).match(/\S/)) {
            formErrors[modelAttr] = this.$t('common.fill')
            errorCount++;
          }
        }
      }
      return errorCount;
    },

    //////////////// Non-generic functions
    
    async shadowLoad() {

      if(this.data.inverters[0].shadow.length != 36) {
        this.shadow.visible = 'error'
        return
      }

      if(this.shadow.visible != 'shadow') {
        this.shadow.visible = 'loading'
      }

      try {
        const restOperation = get({ 
          apiName: 'SoleronUIAPI',
          path: '/shadow',
          options: {
            queryParams: {
              thing: this.data.inverters[0].shadow
            }
          }
        });
        const { body } = await restOperation.response
        this.shadow.data = JSON.parse(await body.text())
        this.shadow.visible = 'shadow'
      } catch (error) {
        this.shadow.visible = 'error'
        console.log('Shadow didnt load: ' + error)
      }

    },

    shadowStopPolling() {
      if (this.shadow.timerId !== null) {
        clearInterval(this.shadow.timerId);
        this.shadow.timerId = null;
      }
    },

    addInverter() {
      delete this.formErrors.invertersErr
      this.addFormSubItem(
        this.data.inverters,
        this.formErrors.inverters,
        this.dataModel.attr.inverters
      )
    },

    async deletePlant() {
      if(this.idParts.length == 2 && confirm(this.$t('common.sureDel'))) {
        try {
          const restOperation = del({ 
            apiName: 'SoleronUIAPI',
            path: '/plants/object/'+this.idParts[0]+'/'+this.idParts[1],
            options: { queryParams: {} }
          });
          const { body } = await restOperation.response
          let response = await body.text()
          console.log('Response DELETE : '+response)
          this.$router.push({name: 'plants'})
        } catch (error) {
          this.msg = this.$t('common.dbError', {dbErr: error})
        }
      }
    },
    
    async savePlant() {

      this.errorCount = 0;
      this.errorCount += this.validateFields(this.formErrors, this.dataModel, this.data)

      if(this.data.inverters.length == 0) {
        this.formErrors.invertersErr = this.$t('inverters.noInverters')
        this.errorCount ++
      }

      //TODO: ad hoc fix
      if(this.data.gridT == 'N') {
        for(let f in this.formErrors.grid) {
          if(this.formErrors.grid[f] !== '') {
            this.errorCount --
          }
          this.formErrors.grid[f] = ''
        }
      }

      if(this.errorCount) {
        this.wuilertMsg = JSON.stringify({
          text: this.$t('common.fixErrors'),
          t: Date.now(),
        });
        //console.log('DATA' + JSON.stringify(this.data))
        //console.log('ERRORS' + JSON.stringify(this.formErrors) + ' ' + this.errorCount)
      } else {

        if(this.$route.params.id == 'add') {

          this.data.creator = Slug64.uuidToSlug64(this.user.userId)
          this.data.created = SolAws.getSolStamp((new Date()).getTime())
          const restOperation = put({ 
            apiName: 'SoleronUIAPI',
            path: '/plants',
            options: { body: this.data }
          });
          const { body } = await restOperation.response
          let response = await body.text()
          console.log('Response PUT : '+response)

        } else {

          const restOperation = post({ 
            apiName: 'SoleronUIAPI',
            path: '/plants',
            options: { body: this.data }
          });
          const { body } = await restOperation.response
          let response = await body.text()
          console.log('Response POST : '+response)

        }

        //console.log('DATA' + JSON.stringify(this.data))
        //console.log('ERRORS' + JSON.stringify(this.formErrors) + ' ' + this.errorCount)

        this.$router.push({name: 'plants'})
      }

    }
  }
  
};
</script>

<style scoped>

.sol-card-consumer {
  background-color: #c2c8fa;
  margin-top: 18px;
}

.sol-card-grid {
  background-color: #f8d3df;
  margin-top: 18px;
}

.sol-card-inverter {
  background-color: #b8fad9;
  margin-top: 18px;
}

.sol-card-producer {
  background-color: #ecfcb4;
  margin-top: 18px;
}

.sol-inverter-err {
  color: red;
  margin-top: 5px;
}

.sol-shadowphases.table {
    border-collapse: collapse;
    border: 1px solid;
    padding: 2px;
}

</style>
