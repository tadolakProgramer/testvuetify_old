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
                :height="200"
                :labels="labels"
                :datasets="displayedDatasets"
                :options="$options.options"
        ></line-chart>
    </div>
</template>

<script>
    //import numeral from 'numeral';
    import LineChart from './lineChart';
    import StatisticService from "../../services/StatisticService";
    import moment from 'moment'

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true,
            fontSize: 18,
            fontColor: '#4CAF50',
            text: 'Zestawienie awarii z ostatnich 12 miesięcy'
        },
        tooltips: {
            borderColor: '#f60404',
            borderWidth: 2
        }
    };
    export default {
        name: 'monthly-failure-chart',
        options,
        components: {
            LineChart
        },
        data() {
            return {
                selectedYears: [],
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
        created() {
            moment.locale('pl');
            // this.dataGodzina = moment().format('lll');

        },
        computed: {
            displayedDatasets() {
                return this.selectedYears.map(year => this.datasets[year]);
            }
        },
        async mounted() {
            this.dane = (await StatisticService.getFailurePerMonth()).data
            for (let k = 0; k<this.dane.length; k++){
                let data = (this.dane[k].Year_ID).toString() +" "+(moment().month(this.dane[k].Month-1).format("MMMM")).toString()
                    this.labels.push(data);
                    this.datasets["2017"].data.push(this.dane[k].SumaAwariiA)
                    this.datasets["2018"].data.push(this.dane[k].SumaAwariiM)

            }
            this.selectedYears = [2017, 2018]
       }
    }
</script>