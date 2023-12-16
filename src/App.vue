<template>
  <div class="conatiner-fluid">
    <div class="row" v-if="auth.route === 'authenticated'">
      <!-- Toggle Button for Small Views -->
      <!-- Vertical Navbar -->
      <nav class="navbar navbar-expand-md navbar-light bg-light d-md-none">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebar"
            aria-controls="sidebar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div
        class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse full-height-nav"
        id="sidebar"
      >
        <ul class="nav flex-column">
          <li class="nav-item">
            <RouterLink :to="{ name: 'plants' }" class="nav-link">{{ $t("plants.title") }}</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'stats' }" class="nav-link">Statistics</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'sandbox' }" class="nav-link">Sandbox</RouterLink>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="auth.signOut">{{ $t("common.logout") }}</a>
          </li>
        </ul>
      </div>
      <!-- Main Content -->
      <main class="col-md-9 ms-sm-auto col-lg-10 pt-5 pt-md-0">
        <RouterView />
      </main>
    </div>

    <div class="row" v-if="auth.route !== 'authenticated'">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
  import { RouterLink, RouterView } from "vue-router";
  import { useAuthenticator } from "@aws-amplify/ui-vue";
  const auth = useAuthenticator();
</script>

<script>
export default {
  data: function () {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  /* md breakpoint in Bootstrap 5 */
  .full-height-nav {
    min-height: 100vh;
  }
}
</style>
