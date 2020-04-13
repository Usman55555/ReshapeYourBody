<template>
    <div id="page-user-view" v-show="show">
        <div v-show="admin()">
            <div class="vx-row">
                <div class="vx-col w-full md:w-full xl:w-1/2">
                    <div class="vx-row">
                        <div class="vx-col w-full">
                            <vx-card
                                title="The whole summery"
                                title-color="#fff"
                                card-background="success"
                                content-color="#fff">
                                <p class="mb-3">Total Partners, Users and Customers currently in your database.</p>
                            </vx-card>
                            <br />
                        </div>
                    </div>
                    <div class="vx-row">
                        <div class="vx-col w-1/2 md:w-1/3 xl:w-1/3">
                            <statistics-card-line
                            hideChart
                            class="mb-base"
                            icon="HeartIcon"
                            :statistic="+userData.countPartners"
                            statisticTitle="Partners"/>
                        </div>
                        <div class="vx-col w-1/2 md:w-1/3 xl:w-1/3">
                            <statistics-card-line
                            hideChart
                            class="mb-base"
                            icon="SmileIcon"
                            :statistic="+userData.countCustomers"
                            statisticTitle="Customers"
                            color="success" />
                        </div>
                        <div class="vx-col w-1/2 md:w-1/3 xl:w-1/3">
                            <statistics-card-line
                            hideChart
                            class="mb-base"
                            icon="EyeIcon"
                            :statistic="+userData.countUsers"
                            statisticTitle="Users" />
                        </div>
                    </div>
                </div>
                <div class="vx-col w-full md:w-full xl:w-1/2">
                    <div class="vx-row">
                        <div class="vx-col w-full">
                            <vx-card
                                title="A month summery"
                                title-color="#fff"
                                card-background="success"
                                content-color="#fff">
                                <!-- <p class="mb-3">You can use <strong>card-background</strong> prop to change background color of card. This prop supports hex, rgba, rgb and theme colors.</p> -->
                                <p class="mb-3">Partners, Users and Customers registered in the last 30 days.</p>
                            </vx-card>
                            <br />
                        </div>
                    </div>
                    <div class="vx-row">
                        <div class="vx-col w-1/2 md:w-1/3 xl:w-1/3">
                            <statistics-card-line
                            hideChart
                            class="mb-base"
                            icon="HeartIcon"
                            :statistic="+mPartners"
                            statisticTitle="Partners"/>
                        </div>
                        <div class="vx-col w-1/2 md:w-1/3 xl:w-1/3">
                            <statistics-card-line
                            hideChart
                            class="mb-base"
                            icon="SmileIcon"
                            :statistic="+mCustomers"
                            statisticTitle="Customers"
                            color="success" />
                        </div>
                        <div class="vx-col w-1/2 md:w-1/3 xl:w-1/3">
                            <statistics-card-line
                            hideChart
                            class="mb-base"
                            icon="EyeIcon"
                            :statistic="+mUsers"
                            statisticTitle="Users" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col w-full md:w-full xl:w-full">
                    <vue-apex-charts 
                        type="bar" 
                        height="350" 
                        :options="columnChart.chartOptions" 
                        :series="columnChart.series">
                    </vue-apex-charts>
                </div>
            </div>
        </div>
        <div v-show="partner()">
            <div class="vx-row">
                <div class="vx-col lg:w-1/4 xl:w-1/4 mb-base">
                </div>
                <div class="vx-col w-full sm:w-full lg:w-1/2 xl:w-1/2 mb-base">
                    <div class="vx-row">
                        <div class="vx-col w-full mb-base">
                            <vx-card slot="no-body" class="text-center bg-primary-gradient greet-user">
                                        <img src="@/assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="200" >
                                        <img src="@/assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="175">
                                <!-- <feather-icon icon="AwardIcon" class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon> -->
                                <h1 class="mb-6 text-white">Welcome, {{ this.$store.state.AppActiveUser.firstname }}</h1>
                            </vx-card>
                        </div>
                    </div>
                    <div class="vx-row">
                        <div class="vx-col w-full mb-base">
                            <vx-card
                                title="Gradient Background Color"
                                title-color="#fff"
                                content-color="#fff"
                                card-background="linear-gradient(to right, #56ab2f, #a8e063)">
                                <p class="mb-3">You can use <strong>card-background</strong> prop to change background color of card. This prop supports hex, rgba, rgb and theme colors.</p>
                                <p class="mb-3">Oat cake powder sesame snaps. Chocolate bar dessert bonbon chocolate bar pudding apple pie muffin chocolate ice cream. I love bear claw I love.</p>
                            </vx-card>
                        </div>
                    </div>
                </div>
                <div class="vx-col lg:w-1/4 xl:w-1/4 mb-base">
                </div>
            </div>            
            <!-- <vs-row>
                <vs-col vs-type="flex" vs-offset="2" vs-justify="center" vs-align="center" vs-w="8">
                    <vs-row>
                        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                            <vx-card
                                title="Gradient Background Color"
                                title-color="#fff"
                                content-color="#fff"
                                card-background="linear-gradient(to right, #56ab2f, #a8e063)">
                                <p class="mb-3">You can use <strong>card-background</strong> prop to change background color of card. This prop supports hex, rgba, rgb and theme colors.</p>
                                <p class="mb-3">Oat cake powder sesame snaps. Chocolate bar dessert bonbon chocolate bar pudding apple pie muffin chocolate ice cream. I love bear claw I love.</p>
                            </vx-card>
                        </vs-col>
                    </vs-row>
                </vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
                </vs-col>
            </vs-row> -->
        </div>
        <div v-show="customer()">
            <div class="vx-row">
                <div class="vx-col lg:w-1/4 mb-base">
                </div>
                <div class="vx-col w-full lg:w-1/2 mb-base">
                    <div class="vx-row">
                        <div class="vx-col w-full mb-base">
                            <vx-card
                                title="Gradient Background Color"
                                title-color="#fff"
                                content-color="#fff"
                                card-background="linear-gradient(to right, #56ab2f, #a8e063)">
                                <p class="mb-3">You can use <strong>card-background</strong> prop to change background color of card. This prop supports hex, rgba, rgb and theme colors.</p>
                                <p class="mb-3">Oat cake powder sesame snaps. Chocolate bar dessert bonbon chocolate bar pudding apple pie muffin chocolate ice cream. I love bear claw I love.</p>
                            </vx-card>
                            <br />
                            <vs-button 
                                @click="() => {this.$router.push({name:'file-download'})}"
                                vs-justify="center" 
                                color="success" 
                                type="gradient">
                                Go to the download section</vs-button>
                        </div>
                    </div>
                </div>
                <div class="vx-col lg:w-1/4 mb-base">
                </div>
            </div>            
        </div>
        <div v-show="user()">
            <div class="vx-row">
                <div class="vx-col sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
                    <vx-card
                        title="Gradient Background Color"
                        title-color="#fff"
                        content-color="#fff"
                        card-background="linear-gradient(to right, #56ab2f, #a8e063)">
                        <p class="mb-3">You can use <strong>card-background</strong> prop to change background color of card. This prop supports hex, rgba, rgb and theme colors.</p>
                        <p class="mb-3">Oat cake powder sesame snaps. Chocolate bar dessert bonbon chocolate bar pudding apple pie muffin chocolate ice cream. I love bear claw I love.</p>
                    </vx-card>
                </div>
                <div class="vx-col sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
                    <vx-card
                        title="Gradient Background Color"
                        title-color="#fff"
                        content-color="#fff"
                        card-background="linear-gradient(to right, #56ab2f, #a8e063)">
                        <p class="mb-3">You can use <strong>card-background</strong> prop to change background color of card. This prop supports hex, rgba, rgb and theme colors.</p>
                        <p class="mb-3">Oat cake powder sesame snaps. Chocolate bar dessert bonbon chocolate bar pudding apple pie muffin chocolate ice cream. I love bear claw I love.</p>
                    </vx-card>
                </div>
            </div> 
            <div class="vx-row">
                <div class="vx-col lg:w-1/4 xl:w-1/4 mb-base">
                </div>
                <div class="vx-col w-full lg:w-1/2 mb-base">
                  <span class="text-danger text-sm" v-show="isKeyValid">The key is not valid.</span>
                  <vs-input
                    name="key"
                    type="key"
                    label-placeholder="Key"
                    placeholder="Key"
                    v-model="key"
                    class="w-full mt-6 mb-2" 
                    />
                  <vs-button @click="() => {this.key = ''}" color="danger" type="filled">Clear</vs-button>
                  &nbsp;
                  <vs-button 
                    :disabled="isDisabled"
                    @click="submit" 
                    color="success" 
                    type="filled">Sumbit</vs-button>
                </div>
            </div>           
        </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'

export default {
  data() {
    return {
      show: false,
      key: '',
      mUsers: null,
      mCustomers: null,
      mPartners: null,
      activeUser: {},
      userData: {},
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
              text: "no. of people"
            }
          },
          fill: {
            opacity: 1

          },
          tooltip: {
            y: {
              formatter: function(val) {
                // return "$ " + val + " thousands"
                return val + " no. of people"
              }
            }
          }
        }
      }
    }
  },
  computed: {
    isDisabled() {
      if (this.key.length != 23){
        return true
      }
      else{
        return false
      }
    },
    isKeyValid() {
      this.key = this.key.toUpperCase();
      String.prototype.splice = function(idx, rem, str) {
          return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      if( this.key.length == 5){
        this.key = this.key.splice(5, 0, "-")
      }
      else if( this.key.length == 11)
        this.key = this.key.splice(11, 0, "-")
      else if( this.key.length == 17 )
        this.key = this.key.splice(17, 0, "-")
      
      if (this.key.length > 23){
        return true
      }
      else{
        return false
      }
    }
  },
  methods: {
    rellood(){
      if( window.localStorage )
      {
        if( !localStorage.getItem( 'firstLoad' ) )
        {
          localStorage[ 'firstLoad' ] = true;
          window.location.reload();
        }  

        else
          localStorage.removeItem( 'firstLoad' );
      }
    },
    admin () {
      return localStorage.getItem('user-usertype') === 'admin'
    },
    partner () {
      return localStorage.getItem('user-usertype') === 'partner'
    },
    customer () {
      return localStorage.getItem('user-usertype') === 'customer'
    },
    user () {
      return localStorage.getItem('user-usertype') === 'user'
    },
    submit() {
      this.$store.dispatch('key', this.key)
      .then(res => {
        this.$vs.notify({
          title: 'Congratulations',
          text: 'You are now promoted to Customer',
          color: 'success',
          iconPack: 'feather',
          position: 'top-center',
          icon:'icon-check'
        })
      })
      .catch(err => {
        this.colorAlert = 'danger'
        this.$vs.dialog({
          color: this.colorAlert,
          title: `Sooo sorry`,
          text: `You must have provided the wrong key...`,
          accept: this.acceptAlert
        })
      })
    }
  },
  created () {
    this.rellood()
    setTimeout(() => {
      this.activeUser = this.$store.state.AppActiveUser
      console.log(this.activeUser.usertype)
      this.show = true
    }, 500)
    this.$store.dispatch('home')
      .then(res => { 
        this.userData = res.data,
        console.log(this.userData)
        console.log(res.data.userArray)
        console.log(+res.data.userArray[res.data.userArray.length - 1])
        if (res.data.userArray.length > 1)
            this.mUsers = +res.data.userArray[res.data.userArray.length - 1]
        if (res.data.customerArray.length > 1)
            this.mCustomers = +res.data.customerArray[res.data.customerArray.length - 1]
        if (res.data.partnerArray.length > 1)
            this.mPartners = +res.data.partnerArray[res.data.partnerArray.length - 1]
        
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
  components: {
    StatisticsCardLine,
    VueApexCharts
  }
}
</script>

<style lang="scss">
.editBtn {
  margin-right: 0;
  margin-left:auto;
}

#avatar-col {
  width: 13rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }


@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }

}
</style>
