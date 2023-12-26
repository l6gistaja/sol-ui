<template>

  <main>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb sol-breadcrumb">
        <li class="breadcrumb-item active">
          <RouterLink :to="{ name: 'plant', params: {id: 'add'} }" class="btn btn-sm btn-success" :title="$t('common.add')">+</RouterLink>
          {{ $t("plants.title") }}
        </li>
      </ol>
    </nav>
  </main>

  <Spinner v-if="searching"></Spinner>

  <div v-if="!searching">
    {{msg}}
    <ol>
      <li v-for="(plant, index) in plants" :key="index">
        <RouterLink :to="{ name: 'plant', params: {id: plant.creator +'_'+plant.created}}">{{plant.name}}</RouterLink> ; {{plant.address}}
      </li>
    </ol>
  </div>

</template>

<script setup>

import { Amplify } from 'aws-amplify'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)
import { get } from 'aws-amplify/api'

import Spinner from '../components/Spinner.vue'

</script>

<script>

export default {
  components: { Spinner },
  name: 'plants',
  
  data() {
    return {
      plants: [],
      searching: false,
      msg: ''
    };
  },

  async created() {
    this.searching = true
    this.msg = ''
    try {
      const restOperation = get({ 
        apiName: 'SoleronUIAPI',
        path: '/plants',
        options: { queryParams: {} }
      });
      const { body } = await restOperation.response
      let bodyTxt = await body.text()
      this.plants = JSON.parse(bodyTxt)
      if(this.plants.length == 0) { this.msg = this.$t('common.found0') }
    } catch (error) {
      this.msg = this.$t('common.dbError', {dbErr: error})
    }
    this.searching = false
  },

  methods: {

  }
  
};
</script>

<style scoped>

</style>
