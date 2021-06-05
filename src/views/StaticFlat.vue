<template>
  <div class="container">
    <h1>Статический Флэт</h1>
    <div class="row mt-4">
      
      <div class="controls col-md-4">
        <b-card>
          
          <!-- bank -->
          <b-input-group prepend="Размер банка:" class="mt-2">
            <b-form-input min="0" v-model="bank"></b-form-input>
          </b-input-group>
          
          <!-- % banka -->
          <b-input-group 
            prepend="% Банка" 
            class="mt-3"
          >
            <b-form-input type="range" class="form-range" min="0" max="100" v-model="share"></b-form-input>
            <template #append>
              <b-form-input style="width:60px" v-model="share"></b-form-input>
            </template>
          </b-input-group>
          
          <!-- veroyatnost' -->
          <b-input-group 
            prepend="Вероятность" 
            class="mt-3"
          >
            <b-form-input type="range" class="form-range" min="0" max="1" step="0.01" v-model="probability"></b-form-input>
            <template #append>
              <b-form-input style="width:60px" v-model="probability"></b-form-input>
            </template>
          </b-input-group>

          <!-- coeff -->
          <b-input-group 
            prepend="Коэф букмекера" 
            class="mt-3"
          >
            <b-form-input type="range" class="form-range" min="0" max="10" step="0.1" v-model="coeff"></b-form-input>
            <template #append>
              <b-form-input style="width:60px" v-model="coeff"></b-form-input>
            </template>
          </b-input-group>

          <!-- params -->
          <b-input-group 
            prepend="E" 
            class="mt-3"
          >
            <b-form-input disabled min="0" max="100" v-model="E"></b-form-input>
            <span class="input-group-text">Вэлью</span>
            <b-form-input disabled min="0" max="100" v-model="value"></b-form-input>
            
          </b-input-group>

          <!-- no -->
          <b-input-group 
            prepend="Количество ставок" 
            class="mt-3"
          >
            <b-form-select class="form-select" v-model="betno">
              <option selected>1000</option>
              <option>5000</option>
              <option>10000</option>
            </b-form-select>
          </b-input-group>

          <b-button 
            class="mt-3" 
            block 
            variant="outline-primary"
            v-on:click="evaluate"
          >
            Смоделировать
            </b-button>
        </b-card>
      </div>

      <div class="graph col-md-8">
        <b-card>
          <canvas id="chart" style="width:100%"></canvas>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  data () {
    return {
      bank: 1000,
      share: 10,
      probability: 0.5,
      coeff: 1.9,
      value: 0,
      E: 0,
      bets: [],
      incomes: [],
      betno: 1000,
    }
  },
  updated () {
    this.value = this.round10(this.probability*this.coeff - 1);
    this.E = this.round10(this.value*(this.bank*this.share));
  },
  mounted () {
    const ctx = document.getElementById('chart')
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.bets,
        datasets: [
          {
            fill: false,
            pointRadius: 1,
            borderColor: "rgba(255,0,0,0.5)",
            data: this.incomes
          }
        ]
      },    
      options: {
        legend: {display: false},
        title: {
          display: true,
          text: "Статический Флэт",
          fontSize: 16
        }
      }
    });
    this.evaluate();
  },
  methods: {
    renderChart(chart) {
      chart.config.data.labels = this.bets;
      chart.config.data.datasets[0].data = this.incomes;
      chart.update();
    },
    simulate() {
      for (let x = 1; x <= this.betno; x++) {
        var bid = this.share/100 * this.bank
        var outcome = Math.random()

        this.bets.push(x);
        if (outcome <= this.probability) {
          //???
          this.incomes.push(this.incomes[x-1]+Math.round(bid*(this.coeff-1)));
        }
        else {
          if (this.incomes[x-1]-bid<0){
            this.incomes.push(0)
            break
          }
          this.incomes.push(this.incomes[x-1]-Math.round(bid));
        }
      }
    },
    evaluate() {
      this.bets = [0];
      this.incomes = [this.bank];
      this.simulate();
      this.renderChart(this.chart);
    },
    round10 (value) {
      return Math.round(value*1000)/1000;
    },
  }
}
</script>