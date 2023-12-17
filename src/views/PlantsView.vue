<template>
  <main>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active"><RouterLink :to="{ name: 'plants'}" >{{ $t("plants.title") }}</RouterLink></li>
      </ol>
    </nav>
    <RouterLink :to="{ name: 'plant', params: {id: 'add'} }" class="btn btn-sm btn-success" :title="$t('common.add')">+</RouterLink>
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
  name: 'plants',
  /*
  data() {
    return {
    };
  },

  methods: {

  }
  */
};
</script>

<style scoped>

</style>
