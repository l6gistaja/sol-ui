<template>
  <main>
    <PageTitle>Sandbox</PageTitle>

    <button class="btn btn-warning btn-sm" @click="getLambdaTest">Lambda test</button>
    {{test}}
    <hr/>

    <button class="btn btn-warning btn-sm" @click="getShadow">Get shadow</button>
    {{shadow}}
    <hr/>
  </main>
</template>

<script setup>

import { Amplify } from 'aws-amplify'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)
import { get } from 'aws-amplify/api'

import PageTitle from '../components/PageTitle.vue'

</script>

<script>

export default {
  data() {
    return {
      test: '',
      shadow: ''
    };
  },

  methods: {

    async getLambdaTest() {
      this.test = 'LOADING ...';
      try {
        const restOperation = get({ 
          apiName: 'SoleronUIAPI',
          path: '/test',
          options: {
            queryParams: {
              id: '123'
            }
          }
        });
        const { body } = await restOperation.response
        this.test = await body.text()
      } catch (error) {
        this.test = 'Test call failed: ' + error
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
              thing: 'test122'
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
