<template>
  <div class="aws-auth-wrapper">
    <authenticator>
      <template v-slot="{ user, signOut }">
        <PageTitle>Welcome to Soleron user interface!</PageTitle>
      </template>
    </authenticator>
    <!-- .{{route}}. <button class="btn btn-danger" @click="signOut">Signout</button> -->
  </div>
</template>

<script setup>
  import "@aws-amplify/ui-vue/styles.css";
  import { Amplify } from 'aws-amplify';
  import awsconfig from '../aws-exports';
  Amplify.configure(awsconfig);
  import PageTitle from '../components/PageTitle.vue'


  import { toRefs } from 'vue';
  import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
  const { route, user, signOut } = toRefs(useAuthenticator());

</script>
<script>
/*
export default {
  data() {
    return {}
  },
  mounted() {
    console.log('cookie '+window.document.cookie, this.user)
  }

}
*/

</script>

<style scoped>
  .aws-auth-wrapper { padding-top: 1em; }
</style>

