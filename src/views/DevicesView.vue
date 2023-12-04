<template>
  <main>
    <PageTitle>Devices</PageTitle>
    <table class="table">
    <tbody>
        <tr>
        <td>
            <button class="btn btn-success btn-sm rowBtn" @click="openDevice">🖉</button>
            Inverter
        </td>
        <td></td>
        </tr>
        <tr>
        <td>
            <button class="btn btn-success btn-sm rowBtn" @click="openDevice">🖉</button>
            <button class="btn btn-danger btn-sm rowBtn" @click="deleteDevice">&times;</button>
            Grid
        </td>
        <td><span style="color:blue">- 2000 W</span></td>
        </tr>
        <tr>
        <td>
            <button class="btn btn-success btn-sm rowBtn" @click="openDevice">🖉</button>
            <button class="btn btn-danger btn-sm rowBtn" @click="deleteDevice">&times;</button>
            Accubank
        </td>
        <td><span style="color:blue">- 1000 W</span></td>
        </tr>
        <tr>
        <td>
            <button class="btn btn-success btn-sm rowBtn" @click="openDevice">🖉</button>
            <button class="btn btn-danger btn-sm rowBtn" @click="deleteDevice">&times;</button>
            Solarpanels
        </td>
        <td><span style="color:red">+ 3000 W</span></td>
        </tr>
    </tbody>
    </table>
    <button class="btn btn-warning btn-sm" @click="openDevice">+</button>
  </main>
</template>

<script setup>

import PageTitle from '../components/PageTitle.vue'

</script>

<script>

export default {
  data() {
    return {
    };
  },

  methods: {
    openDevice() {
        this.$router.push({name: "device"})
    },

    deleteDevice() {
        confirm('Delete device?')
    }
  }
};
</script>

<style scoped>
.rowBtn {
    margin-right: 5px;
}
</style>
