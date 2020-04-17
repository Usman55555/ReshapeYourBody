<template>
    <vue-apex-charts 
        type="bar" 
        height="350" 
        :options="columnChart.chartOptions" 
        :series="columnChart.series">
    </vue-apex-charts>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'

  export default {
    components: {
        StatisticsCardLine,
        VueApexCharts
    },
    computed: {    
        lang() {
            this.graphComponent += 1
            console.log(this.columnChart.chartOptions.yaxis.title)
            // if (this.$i18n.locale == 'de'){
            //     this.columnChart.yaxis.title.text = 'Anzahl der Personen'
            // }
            // else if (this.$i18n.locale == 'sp'){
            //     this.columnChart.yaxis.title.text = 'Número de personas'

            // }
            // else{
            //     this.columnChart.yaxis.title.text = 'Number of people'
            // }
            return this.$i18n.locale
        }
    },
    created() {
        this.$store.dispatch('home')
      .then(res => { 
        // this.userData = res.data,
        // console.log(this.userData)
        // console.log(res.data.userArray)
        // console.log(+res.data.userArray[res.data.userArray.length - 1])
        // if (res.data.userArray.length > 1)
        //     this.mUsers = +res.data.userArray[res.data.userArray.length - 1]
        // if (res.data.customerArray.length > 1)
        //     this.mCustomers = +res.data.customerArray[res.data.customerArray.length - 1]
        // if (res.data.partnerArray.length > 1)
        //     this.mPartners = +res.data.partnerArray[res.data.partnerArray.length - 1]
        
        if (this.lang == 'de'){
          this.columnChart.series.push(
              {
                  name: 'Partner',
                  data: res.data.partnerArray
              },
              {
                  name: 'Kunden',
                  data: res.data.customerArray
              },
              {
                  name: 'Benutzer',
                  data: res.data.userArray
              }
          )
        }
        else if (this.lang == 'sp'){
          this.columnChart.series.push(
              {
                  name: 'Socios/Socias',
                  data: res.data.partnerArray
              },
              {
                  name: 'Clientes',
                  data: res.data.customerArray
              },
              {
                  name: 'Los usuarios',
                  data: res.data.userArray
              }
          )
        }
        else {
          this.columnChart.series.push(
              {
                  name: 'Partners',
                  data: res.data.partnerArray
              },
              {
                  name: 'Customers',
                  data: res.data.customerArray
              },
              {
                  name: 'Users',
                  data: res.data.userArray
              }
          )
        }

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        var d = new Date();
        var month = d.getMonth() + 1;
        // for (let i = 0; i < 13; i++){
        for (let i = 0; i < 12; i++){
            if (month > 11){
                month = month - 12
            }
            this.columnChart.chartOptions.xaxis.categories.push(months[month])
            month++
        }
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 404) {
          this.user_not_found = true
          return
        }
        console.error(err) 
      })  
    },
    data(){
      return {
        themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
        columnChart: {
            series: [],
            chartOptions: {
            colors: this.themeColors,
            plotOptions: {
                bar: {
                horizontal: false,
                endingShape: 'rounded',
                columnWidth: '55%',
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },

            xaxis: {
                categories: [],
            },
            yaxis: {
                title: {
                    text: "Number of people"
                }
            },
            fill: {
                opacity: 1

            },
            tooltip: {
                y: {
                formatter: function(val) {
                    // return "$ " + val + " thousands"
                    return val + "No. of people"
                }
                }
            }
            }
        }
      } 
    }
  }
</script>
