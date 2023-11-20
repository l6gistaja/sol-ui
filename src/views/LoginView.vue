<template>
  <div class="container">
    <div class="row justify-content-center align-items-center vh-100">
      <div class="col-md-4">
        <form @submit.prevent="login">
          <div class="form-group mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              v-model="username"
            />
          </div>
          <div class="form-group mb-2">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Login</button>
          </div>
          <div class="form-group">
            <Wuilert :msg="wuilertMsg" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import Wuilert from "../components/Wuilert.vue";
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

<style></style>
