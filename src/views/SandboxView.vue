<template>
  <main>
  
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb sol-breadcrumb">
        <li class="breadcrumb-item active">Sandbox</li>
      </ol>
    </nav>

    <table>
      <tr>
        <td><button class="btn btn-warning btn-sm" @click="addDoc">+</button></td>
        <td><input type="text" id="n"></td>
        <td></td>
      </tr>
    </table>
    <hr/>

    <button class="btn btn-warning btn-sm" @click="getShadow">Get shadow</button>&nbsp;
    <button class="btn btn-warning btn-sm" @click="updateShadow">Change welcome</button>
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
      shadowFieldVal: ''
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

    async getShadow() {
      this.shadow = 'LOADING ...';
      try {
        const restOperation = get({ 
          apiName: 'SoleronUIAPI',
          path: '/shadow',
          options: {
            queryParams: {
              thing: 'test123'
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

    async updateShadow() {
      this.shadow = 'LOADING ...';
      try {
        const restOperation = post({
          apiName: 'SoleronUIAPI',
          path: '/shadow',
          options: {
            queryParams: {thing: 'test123' },
            body: {
              welcome: this.shadowFieldVal,
            }
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
