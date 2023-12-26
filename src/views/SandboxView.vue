<template>
  <main>
  
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb sol-breadcrumb">
        <li class="breadcrumb-item active">Sandbox</li>
      </ol>
    </nav>
    
    <div class="sol-grouptitle">AWS</div>
    <ol>
      <li v-for="(url, service) in aws" :key="url">
        <a target="_blank" :href="url">{{service}}</a>
      </li>
    </ol>

    <div v-if="user">
    User UUID: {{user.userId}}<br/>
    User Slug64: {{Slug64.uuidToSlug64(user.userId)}}<br/>
    User loginId: {{user.signInDetails.loginId}}
    </div>

    <hr/>

    <button class="btn btn-warning btn-sm" @click="getShadow(thingName)">Get shadow</button>&nbsp;
    Shadow = <input type="text" v-model="thingName"/>
    {{shdw}}
    <hr/>

    Shadow = test123
    <button class="btn btn-warning btn-sm" @click="getShadowtest123('test123')">Get shadow</button>&nbsp;
    <button class="btn btn-warning btn-sm" @click="updateShadow('test123', {welcome: shadowFieldVal})">Change welcome</button>
    <input type="text" v-model="shadowFieldVal"/>
    {{shadow}}
    <hr/>

    <button class="btn btn-warning btn-sm" @click="getLambdaGet">Lambda GET</button>
    User UUID: {{testGetUuid}}<hr/>
    {{testGet}}
    <br/>
    <button class="btn btn-warning btn-sm" @click="getLambdaPost">Lambda POST</button>
    User UUID: {{testPostUuid}}<hr/>
    {{testPost}}
    <hr/>
  </main>
</template>

<script setup>

import { Amplify } from 'aws-amplify'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)
import { get, post } from 'aws-amplify/api'

import { toRefs } from 'vue'
import { useAuthenticator } from '@aws-amplify/ui-vue'
const { user } = toRefs(useAuthenticator())

//import { uuidToSlug64 } from '../lib/Slug64';

import Slug64 from '../lib/Slug64';
import SolAws from '../lib/SolAws'

//import { getUserUuidFromLambda } from '../lib/Slug64';

//import { getUserUuidFromLambda } from "../lib/SolAws"

//const SolAws = import.meta.glob("../lib/SolAws")

</script>

<script>

//const SolAws = import.meta.glob("../lib/SolAws")

export default {

  created () {
    let solawstest = {t0:(new Date()).getTime()}
    solawstest.sol = SolAws.getSolStamp(solawstest.t0)
    solawstest.t1 = SolAws.getUnixEpoch(solawstest.sol)
    solawstest.d0 = '' + (new Date(solawstest.t0)).toString()
    solawstest.d1 = '' + (new Date(solawstest.t1)).toString()
    solawstest.sl64 = Slug64.intToSlug64(solawstest.sol)
    console.log(solawstest)

    let req = { creator:'', created:0, gridT:'N'}
  },

  data() {
    return {
      //SolAws: import.meta.glob("../lib/SolAws"),
      testGet: '',
      testGetUuid: '',
      testPost: '',
      testPostUuid: '',
      shadow: '',
      shadowFieldVal: '',

      shdw: '',
      thingName: 'c2d52a12-b9bd-4b37-a7a4-9b07f6d342db',

      aws: {
        API: "https://eu-north-1.console.aws.amazon.com/apigateway/main/apis?region=eu-north-1",
        CloudWatch: "https://eu-north-1.console.aws.amazon.com/cloudwatch/home?region=eu-north-1#logsV2:log-groups",
        Cognito: "https://eu-north-1.console.aws.amazon.com/cognito/v2/idp/user-pools?region=eu-north-1",
        DynamoDB: "https://eu-north-1.console.aws.amazon.com/dynamodbv2/home?region=eu-north-1#tables",
        IAM: "https://us-east-1.console.aws.amazon.com/iam/home?region=eu-north-1#/users",
        IoT: "https://eu-north-1.console.aws.amazon.com/iot/home?region=eu-north-1#/thinghub",
        Lambda: "https://eu-north-1.console.aws.amazon.com/lambda/home?region=eu-north-1#/functions"
      }

    }
  },

  methods: {

    async getLambdaGet() {
      this.testGet = 'LOADING ...';
      try {
        const restOperation = get({ 
          apiName: 'SoleronUIAPI',
          path: '/test',
          options: {
            queryParams: {
              testMethod: 'GET'
            }
          }
        });
        const { body } = await restOperation.response
        this.testGet = await body.text()
        let testGetObj = JSON.parse(this.testGet)
        this.testGetUuid = SolAws.getUserUuidFromLambda(testGetObj.event)
      } catch (error) {
        this.testGet = 'Test call failed: ' + error
      }
    },

    async getLambdaPost() {
      this.testPost = 'LOADING ...';
      try {
        const restOperation = post({ 
          apiName: 'SoleronUIAPI',
          path: '/test',
          options: {
            queryParams: {
              testMethod: 'POST'
            },
            body: {
              name: "bob",
            }
          }
        });
        const { body } = await restOperation.response
        this.testPost = await body.text()
        let testPostObj = JSON.parse(this.testPost)
        this.testPostUuid = SolAws.getUserUuidFromLambda(testPostObj.event)
      } catch (error) {
        this.testPost = 'Test call failed: ' + error
      }
    },

    async getShadow(thing) {
      this.shdw = 'LOADING ...';
      try {
        const restOperation = get({ 
          apiName: 'SoleronUIAPI',
          path: '/shadow',
          options: {
            queryParams: {
              thing: thing
            }
          }
        });
        const { body } = await restOperation.response
        this.shdw = await body.text()
      } catch (error) {
        this.shdw = 'Call failed: ' + error
      }
    },

    async getShadowtest123(thing) {
      this.shadow = 'LOADING ...';
      try {
        const restOperation = get({ 
          apiName: 'SoleronUIAPI',
          path: '/shadow',
          options: {
            queryParams: {
              thing: thing
            }
          }
        });
        const { body } = await restOperation.response
        this.shadow = await body.text()
        var json = JSON.parse(this.shadow)
        this.shadowFieldVal = json.state.desired.welcome
      } catch (error) {
        this.shadow = 'Call failed: ' + error
      }
    },

    async updateShadow(thing, body) {
      this.shadow = 'LOADING ...';
      try {
        const restOperation = post({
          apiName: 'SoleronUIAPI',
          path: '/shadow',
          options: {
            queryParams: {thing: thing},
            body: body
          }
        });
        const { body } = await restOperation.response
        this.shadow = await body.text()
      } catch (error) {
        this.shadow = 'Call failed: ' + error
      }
    },

  }
};
</script>

<style scoped>
.rowBtn {
    margin-right: 5px;
}
</style>
