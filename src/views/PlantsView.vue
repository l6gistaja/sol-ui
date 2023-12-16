<template>
  <main>
    <PageTitle>{{ $t("plants.title") }}</PageTitle>
  </main>
</template>

<script setup>

import { Amplify } from 'aws-amplify'
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig)
import { get, post } from 'aws-amplify/api'

import PageTitle from '../components/PageTitle.vue'

</script>

<script>

export default {
  data() {
    return {
    };
  },

  methods: {

  }
};
</script>

<style scoped>

</style>
