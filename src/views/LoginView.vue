<template>
  <div class="aws-auth-wrapper">
    <!-- socialProviders="{['google']}" -->
    <authenticator :services="services">
      <template v-slot="{ user, signOut }">
        <strong>Welcome to Soleron user interface!</strong>
      </template>
    </authenticator>
  </div>
</template>

<script setup>

  import "@aws-amplify/ui-vue/styles.css"
  import { Amplify } from 'aws-amplify'
  import { signIn, signOut } from 'aws-amplify/auth'
  import awsconfig from '../aws-exports'
  Amplify.configure(awsconfig)

</script>
<script>

const services = {
  async handleSignIn(formData) {
    let { username, password } = formData
    await signOut()
    return signIn({ username, password })
  }
}

export default {
  name: 'login'
}

</script>

<style scoped>
  .aws-auth-wrapper { padding-top: 1em; }
</style>

