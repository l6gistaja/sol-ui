<template>
  <br/><br/>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <PageTitle>Welcome to Soleron user interface!</PageTitle>
    </template>
  </authenticator>
</template>

<script setup>

  import "@aws-amplify/ui-vue/styles.css";
  import { Amplify } from 'aws-amplify';
  import awsconfig from '../aws-exports';
  Amplify.configure(awsconfig);

  import PageTitle from '../components/PageTitle.vue'

</script>

<script>

export default {
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

