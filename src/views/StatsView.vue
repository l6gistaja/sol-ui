<template>
  <div>
    
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb sol-breadcrumb">
          <li class="breadcrumb-item active">Statistics (DEMO)</li>
        </ol>
      </nav>

    <Line :data="data" :options="options" />
  </div>
</template>

<script>

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'App',
  components: {
    Line
  },
  data() {
    return {
      data: {
        labels: [],
        datasets: [
          {
            label: 'Accubank, W',
            backgroundColor: 'red',
            data: []
          },
          {
            label: 'Solar, W',
            backgroundColor: 'blue',
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        //maintainAspectRatio: false
      }
    }
  },

  created() {
    for(let i=0; i<60; i++) {
      this.data.labels.push('0'+Math.floor(i/6)+':'+(i%6 ? 10*(i%6) : '00') )
      let testVal = Math.floor(Math.random() * 6000)
      this.data.datasets[0].data.push(testVal)
      this.data.datasets[1].data.push(-testVal)
    }
  }
}
</script>