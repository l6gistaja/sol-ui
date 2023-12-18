<template>
  <main>
  
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb sol-breadcrumb">
        <li class="breadcrumb-item active">Sandbox</li>
      </ol>
    </nav>
    
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
    {{testGet}}
    <br/>
    <button class="btn btn-warning btn-sm" @click="getLambdaPost">Lambda POST</button>
    {{testPost}}
    <hr/>
  </main>
</template>

<script setup>

import { Amplify } from 'aws-amplify'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)
import { get, post } from 'aws-amplify/api'

</script>

<script>

export default {
  data() {
    return {
      testGet: '',
      testPost: '',
      shadow: '',
      shadowFieldVal: '',

      shdw: '',
      thingName: 'c2d52a12-b9bd-4b37-a7a4-9b07f6d342db'
    };
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
