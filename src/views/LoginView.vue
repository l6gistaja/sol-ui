<template>

  <authenticator>
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>

</template>

<script setup>
import Wuilert from "../components/Wuilert.vue";

  import { Authenticator } from "@aws-amplify/ui-vue";
  import "@aws-amplify/ui-vue/styles.css";

  import { Amplify } from 'aws-amplify';
  import awsconfig from '../aws-exports';

  Amplify.configure(awsconfig);

</script>

<script>

export default {
  data() {
    return {
      username: "",
      password: "",
      wuilertMsg: '{"msg":""}',
    };
  },
  methods: {
    login() {

          // If the request is successful, store the credentials for future requests
          localStorage.setItem("authCredentials", "");
          window.dispatchEvent(
            new CustomEvent("Wolf-UI-login", {
              detail: {
                username: "admin",
              },
            })
          );
          this.$router.push({
            name: "home",
          }); // Default to home page
          

    },
  },
};
</script>

