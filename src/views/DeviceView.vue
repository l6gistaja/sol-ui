<template>
  <main>
    <PageTitle>Device</PageTitle>
    <form @submit.prevent="saveDevice">

        <FormRow>
          <template v-slot:label>Name</template>
          <template v-slot:field>
            <input type="text" class="form-control form-control-sm">
          </template>
        </FormRow>


        <FormRow>
          <template v-slot:label>Type</template>
          <template v-slot:field>
            <select class="form-select form-select-sm">
                <option value="grid">Grid</option>
                <option value="accu">Accubank</option>
                <option value="sol">Solar panels</option>
            </select>
          </template>
        </FormRow>

        <div class="form-group row mt-3">
          <div class="col-sm-12">
            <button type="submit" class="btn btn-primary btn-sm wolf-btn">Save</button>
          </div>
        </div>


    </form>
  </main>
</template>


<script setup>

import PageTitle from '../components/PageTitle.vue'
import FormRow from '../components/FormRow.vue'

</script>

<script>

export default {
  data() {
    return {
    };
  },
  methods: {
    saveDevice() {
        this.$router.push({name: "devices"})
    }
  }
};

</script>
