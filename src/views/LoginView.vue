<template>
  <br/><br/>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <center>
      <br/><br/>{{ user.signInDetails.loginId }}
      <br/><br/><button class="btn btn-primary" @click="signOut">Sign Out</button>
      </center>
    </template>
  </authenticator>
</template>

<script setup>

  import "@aws-amplify/ui-vue/styles.css";
  import { Amplify } from 'aws-amplify';
  import awsconfig from '../aws-exports';
  Amplify.configure(awsconfig);

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

