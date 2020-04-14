
<template>
  <div id="data-list-list-view" class="data-list-container">

    <!-- <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" /> -->

    <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" search :data="Admin_request">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <!-- ACTION - DROPDOWN -->
          <!-- <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer mr-4 mb-4">

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
              <span class="mr-2">Actions</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div> -->

            <!-- <vs-dropdown-menu>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Delete</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="ArchiveIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Archive</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="FileIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Print</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="SaveIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Another Action</span>
                </span>
              </vs-dropdown-item>

            </vs-dropdown-menu>
          </vs-dropdown> -->

          <!-- ADD NEW -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ Admin_request.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : Admin_request.length }} of {{ queriedItems }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
          <vs-dropdown-menu>

            <vs-dropdown-item @click="itemsPerPage=4">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=10">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=15">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=20">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
        </div>

        <!-- ITEMS PER PAGE -->
          <div v-if='usertype!="admin"' class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-success border border-solid border-success" @click="addNewData">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-danger">Request for Partner</span>
          </div>
        
      </div>

      <template slot="thead">
        <!-- <vs-th sort-key="name">Name</vs-th>

        <vs-th sort-key="popularity">Popularity</vs-th> -->
        <vs-th sort-key="order_status">Request Status</vs-th>
        <vs-th sort-key="category">Created At</vs-th>
        <!-- <vs-th sort-key="price">Price</vs-th> -->
        <vs-th>Action</vs-th>
        
      </template>

        <template >
          <tbody  >
            <!-- <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data"> -->

            <vs-tr :key="indextr" v-for="(tr, indextr) in my_request">
              <vs-td>
                <vs-chip :color="getOrderStatusColor(tr.order_status)" class="product-order-status">{{ tr.status }}</vs-chip>
              </vs-td>

              <!-- <vs-td>
                <p class="product-price">${{ tr.price }}</p>
              </vs-td> -->
                <vs-td>
                 <p class="product-category">{{ tr.createdAt }}</p>
              </vs-td>

              <vs-td class="whitespace-no-wrap">
                <!-- <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" /> -->
                <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr._id)" />
              </vs-td>
           
            </vs-tr>
          </tbody>
        </template>
         <template v-if='usertype=="admin"'>
          <tbody  >
            <!-- <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data"> -->

            <vs-tr :key="indextr" v-for="(tr, indextr) in admin_requests">
              <vs-td>
                <vs-chip :color="getOrderStatusColor(tr.order_status)" class="product-order-status">{{ tr.status }}</vs-chip>
        
              </vs-td>

              <vs-td>
                 <p class="product-category">{{ tr.createdAt }}</p>
              </vs-td>

              <vs-td class="whitespace-no-wrap">
                  
              
          <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click="popupActive=true" />
          <!-- <vs-button @click="popupActive=true" color="primary" type="border">Open Default popup</vs-button> -->
       
              <vs-popup class="holamundo" title="Update Status" :active.sync="popupActive">
              <vs-button @click="update(tr,'pending')" color="primary" type="border">Pending</vs-button>&nbsp;
              <vs-button @click="update(tr,'accepted')" color="primary" type="border">Accepted</vs-button>&nbsp;
              <vs-button @click="update(tr,'reviewed')" color="primary" type="border">Reviewed</vs-button>&nbsp;
              <vs-button @click="update(tr,'rejected')" color="primary" type="border">Rejected</vs-button>&nbsp;
          </vs-popup>
       
                <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteUserData(tr._id)" />
              </vs-td>
              
                
            </vs-tr>
          </tbody>
        </template>
         
    </vs-table>
    
  </div>
</template>

<script>
// import DataViewSidebar from '../DataViewSidebar.vue'
// import moduleDataList from '@/store/data-list/moduleDataList.js'

import axios from 'axios'
export default {
  components: {
  
  },
  data () {
    return {
      selected: [],
      popupActive: false,
      // products: [],
       colorAlert:'success',
      alertMessage:'',
      itemsPerPage: 4,
      isMounted: false,
      my_request:[],
      admin_requests:[],
      usertype:this.$store.state.usertype,

      // Data Sidebar
    //   addNewDataSidebar: false,
    //   sidebarData: {}
    }
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    Admin_request () {
      return this.admin_requests
    },
    // products () {
    //   return this.$store.state.dataList.products
    // },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.admin_requests.length
    }
  },
  methods: {
    addNewData () {
      return new Promise((resolve, reject) => {
        axios.post('/request/newRequest').then(resp => {
            console.log("requested successfully")
            console.log(resp)
            if(!resp.data.errmsg){ this.my_request.push(resp.data)}
            
           
            // if (resp.data.errmsg)
            // {
            //     title:resp.data.errmsg
            // }
            // else{
            //      title:  resp.data.status,s
            // }
        // this.keys.unshift(resp.data)
        if (resp.data.errmsg){
        this.$vs.dialog({
                color: 'danger',
                title:  resp.data.errmsg,
                accept: this.acceptAlert,
                })
        }
        else{
             this.$vs.dialog({
                color: 'success',
                title:  "Your status is : "+resp.data.status,
                accept: this.acceptAlert,
                })
        }
      
        resolve(resp)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
      });
    },
    update(data,str){
      console.log(data._id)
     
        var obj={
          status:str,
          reqId:data._id
       };
    
      console.log(obj)
        return new Promise((resolve, reject) => {
                   axios.put('/request/updateRequestStatus',obj)
          }).then(resp => {
                      
                  
                   console.log(resp,"hhhhhhhhhhhhhhhhhhhhhhhhhh")
                    resolve(resp)
                    }).catch(err => {
                       
                        reject(err)
                    })
                
                
               
    },
    deleteData (id) {
      return new Promise((resolve, reject) => {
          axios.delete('/request/deleteMyRequest',{
            params: {
              reqId:id
            }
          }).then(resp => {
            console.log(resp)
          for(let index=0; index<this.my_request.length; index++){
            if(this.my_request[index]._id==id){
              this.my_request.splice(index,1);
              
            }
          }
          // if(this.my_request._id==id )
          // {
          //    this.my_request.splice(index,1);
          // }
          // else{
          //   console.log("id dpnt match"+this.my_request._id)
          // }
          resolve(resp)
          }).catch(err => {
              console.log(err);
              reject(err)
          })
      });
      
    },
    deleteUserData (id) {
      return new Promise((resolve, reject) => {
          axios.delete('/request/delete',{
            params: {
              reqId:id
            }
          }).then(resp => {
            console.log(resp)
          for(let index=0; index<this.admin_requests.length; index++){
            if(this.admin_requests[index]._id==id){
              this.admin_requests.splice(index,1);
              
            }
          }
          // if(this.my_request._id==id )
          // {
          //    this.my_request.splice(index,1);
          // }
          // else{
          //   console.log("id dpnt match"+this.my_request._id)
          // }
          resolve(resp)
          }).catch(err => {
              console.log(err);
              reject(err)
          })
      });
      
    },
    editData (data) {
      console.log("datataaaaaaaaaaaaaaaa",data)
      
    },
    getOrderStatusColor (status) {
      if (status === 'on_hold')   return 'warning'
      if (status === 'delivered') return 'success'
      if (status === 'canceled')  return 'danger'
      return 'primary'
    },
    // getPopularityColor (num) {
    //   if (num > 90)  return 'success'
    //   if (num > 70)  return 'primary'
    //   if (num >= 50) return 'warning'
    //   if (num < 50)  return 'danger'
    //   return 'primary'
    // },
    // toggleDataSidebar (val = false) {
    //   this.addNewDataSidebar = val
    // }
  },
  created () {
    // return new Promise((resolve, reject) =>
    //  {
      
         axios.get(`/request/viewMyRequests`)
            .then(res => {
            console.log(res,"hasssssssssssssssssssssssssssssan")
            console.log("usertype:",this.$store.state.usertype,)
            this.my_request=res.data
            })
            .catch(err => {
            console.log(err)
            });

        axios.get(`/request/AllRequests`)
        .then(res => {
        console.log(res,"hasssssssssssssssssssssssssssssan")
        console.log("usertype:",this.$store.state.usertype,)
        this.admin_requests=res.data
        })
        .catch(err => {
        console.log(err)
        });
            
     
      //  });
            
    // if (!moduleDataList.isRegistered) {
    //   this.$store.registerModule('dataList', moduleDataList)
    //   moduleDataList.isRegistered = true
    // }
    // this.$store.dispatch('dataList/fetchDataListItems')
    
  },

  mounted () {
    this.isMounted = true
  }
}
</script>

<style lang="scss">
#data-list-list-view {
  .vs-con-table {

    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 20px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
          }
          td.td-check{
            padding: 20px !important;
          }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
