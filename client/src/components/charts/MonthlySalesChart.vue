<template>
    <div>
        <div class="field is-grouped">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" :value="2018" v-model="selectedYears">
                    Mechaniczne
                </label>
            </div>
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" :value="2017" v-model="selectedYears">
                    Elektroniczne
                </label>
            </div>
        </div>

        <line-chart
                :width="500"
                :height="300"
                :labels="labels"
                :datasets="displayedDatasets"
                :options="$options.options"
        ></line-chart>
    </div>
</template>

<script>
    //import numeral from 'numeral';
    import LineChart from './horizontalBarChart';
    import StatisticService from "../../services/StatisticService";
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },

    };
    export default {
        name: 'monthly-sales-chart',
        options,
        components: {
            LineChart
        },
        data() {
            return {
                selectedYears: [2017, 2018],
                dane:[],
                labels:[],
                count:[],
                datasets : {
                    2018: {
                        label: 'Mechaniczne',
                        borderColor: 'rgba(50, 115, 220, 0.5)',
                        backgroundColor: 'rgba(23,43,222,0.79)',
                        data: []
                    },
                    2017: {
                        label: 'Elektroniczne',
                        borderColor: 'rgb(23,72,17)',
                        backgroundColor: 'rgba(107,177,7,0.74)',
                        data: []
                    }
                }
            };
        },
        computed: {
            displayedDatasets() {
                return this.selectedYears.map(year => this.datasets[year]);
            }
        },
        async mounted() {

            this.dane = (await StatisticService.getCountFailureByMachine()).data
            for (let k = 0; k<this.dane.length; k++){
                    this.labels.push(this.dane[k].NazwaMaszyny);
                    this.datasets["2017"].data.push(this.dane[k].SumaAwariiA)
                    this.datasets["2018"].data.push(this.dane[k].SumaAwariiM)
            }
            this.selectedYears = [2017, 2018]

        }
    }
</script>