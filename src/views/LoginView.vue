<template>
  <div class="aws-auth-wrapper">
    <authenticator>
      <template v-slot="{ user, signOut }">
        <PageTitle>Welcome to Soleron user interface!</PageTitle>
      </template>
    </authenticator>
  </div>
</template>

<script setup>
  import "@aws-amplify/ui-vue/styles.css";
  import { Amplify } from 'aws-amplify';
  import awsconfig from '../aws-exports';
  Amplify.configure(awsconfig);
  import PageTitle from '../components/PageTitle.vue'
</script>

<style scoped>
  .aws-auth-wrapper { padding-top: 1em; }
</style>

