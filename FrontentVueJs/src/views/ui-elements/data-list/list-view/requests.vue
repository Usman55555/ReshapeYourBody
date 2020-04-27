             
<template>
  <div v-if='usertype=="admin"'   id="data-list-list-view" class="data-list-container">

    <!-- <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" /> -->

    <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" search :data="Admin_request">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

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
          <!-- <div v-if='usertype!="admin"' class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-success border border-solid border-success" @click="addNewData">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-danger">Request for Partner</span>
          </div> -->
        
      </div>

      <template slot="thead" v-if="this.lang == 'de'">
        <!-- <vs-th sort-key="name">Name</vs-th>  -->
          <vs-th sort-key="category">Vorname</vs-th>
        <vs-th sort-key="popularity">Familienname, Nachname</vs-th>
        <vs-th sort-key="popularity">Benutzer Email</vs-th> 
        <vs-th sort-key="order_status">Anforderungsstatus</vs-th>
        <vs-th sort-key="category">Hergestellt in</vs-th>
        <!-- <vs-th sort-key="price">Price</vs-th> -->
        <vs-th>Aktion</vs-th>
        
      </template>
      <template slot="thead" v-else-if="this.lang == 'sp'">
        <!-- <vs-th sort-key="name">Name</vs-th>  -->
          <vs-th sort-key="category">Primer nombre</vs-th>
        <vs-th sort-key="popularity">Apellido</vs-th>
        <vs-th sort-key="popularity">Email del usuario</vs-th> 
        <vs-th sort-key="order_status">Estado de la solicitud</vs-th>
        <vs-th sort-key="category">Creado en</vs-th>
        <!-- <vs-th sort-key="price">Price</vs-th> -->
        <vs-th>Acción</vs-th>
        
      </template>
      <template slot="thead" v-else>
        <!-- <vs-th sort-key="name">Name</vs-th>  -->
          <vs-th sort-key="category">First Name</vs-th>
        <vs-th sort-key="popularity">Second Name</vs-th>
        <vs-th sort-key="popularity">User Email</vs-th> 
        <vs-th sort-key="order_status">Request Status</vs-th>
        <vs-th sort-key="category">Created At</vs-th>
        <!-- <vs-th sort-key="price">Price</vs-th> -->
        <vs-th>Action</vs-th>
        
      </template>

        <!-- <template > -->
          <!-- <tbody  > -->
            <!-- <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data"> -->
<!-- 
            <vs-tr :key="indextr" v-for="(tr, indextr) in my_request">
              <vs-td>
                <vs-chip :color="getOrderStatusColor(tr.status)" class="product-order-status">{{ tr.status }}</vs-chip>
              </vs-td> -->

              <!-- <vs-td>
                <p class="product-price">${{ tr.price }}</p>
              </vs-td> -->
                <!-- <vs-td>
                 <p class="product-category">{{ tr.createdAt }}</p>
              </vs-td> -->

              <!-- <vs-td class="whitespace-no-wrap"> -->
                <!-- <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" /> -->
                <!-- <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr._id)" />
              </vs-td>
           
            </vs-tr>
          </tbody>
        </template> -->
         <template >
          <tbody  >
            <!-- <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data"> -->

            <vs-tr :key="indextr" v-for="(tr, indextr) in admin_requests">
              <vs-td>
                 <p class="product-category">{{ tr.madeBy.firstname }}</p>
              </vs-td>
              <vs-td>
                 <p class="product-category">{{ tr.madeBy.lastname }}</p>
              </vs-td>
              <vs-td>
                 <p class="product-category">{{ tr.madeBy.email }}</p>
              </vs-td>
              <vs-td>
                <vs-chip :color="getOrderStatusColor(tr.status)" class="product-order-status">{{ tr.status }}</vs-chip>
        
              </vs-td>

              <vs-td>
                 <p class="product-category">{{ tr.createdAt }}</p>
              </vs-td>

              <vs-td v-if="lang == 'de'"  class="whitespace-no-wrap">
                  
      
        
        <feather-icon  icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click="popupActive=true" />

              <vs-popup  class="holamundo" title="Update Status" :active.sync="popupActive">
              <vs-button  @click="update(tr,'pending',indextr)" color="primary" type="border">Steht aus</vs-button>&nbsp;
              <vs-button @click="update(tr,'accepted',indextr)" color="primary" type="border">Akzeptiert</vs-button>&nbsp;
              <vs-button @click="update(tr,'reviewed',indextr)" color="primary" type="border">Bewertet</vs-button>&nbsp;
              <vs-button @click="update(tr,'rejected',indextr)" color="primary" type="border">Rejected</vs-button>&nbsp;
              </vs-popup>
             
       
                <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteUserData(tr._id)" />
           </vs-td>
           <vs-td v-else-if="lang == 'sp'"  class="whitespace-no-wrap">
                  
      
        
        <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click="popupActive=true" />

              <vs-popup  class="holamundo" title="Estado de actualización" :active.sync="popupActive">
              <vs-button  @click="update(tr,'pending',indextr)" color="primary" type="border">Pendiente</vs-button>&nbsp;
              <vs-button @click="update(tr,'accepted',indextr)" color="primary" type="border">Aceptada</vs-button>&nbsp;
              <vs-button @click="update(tr,'reviewed',indextr)" color="primary" type="border">Revisadas</vs-button>&nbsp;
              <vs-button @click="update(tr,'rejected',indextr)" color="primary" type="border">Abgelehnt</vs-button>&nbsp;
              </vs-popup>

             
       
                <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteUserData(tr._id)" />
           </vs-td>
           <vs-td v-else class="whitespace-no-wrap">
                  
      
        
        <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click="popupActive=true" />

              <vs-popup  class="holamundo" title="Update Status" :active.sync="popupActive">
              <vs-button @click="update(tr,'pending',indextr)" popupActive=false color="primary" type="border">Pending</vs-button>&nbsp;
              <vs-button @click="update(tr,'accepted',indextr)" color="primary" type="border">Accepted</vs-button>&nbsp;
              <vs-button @click="update(tr,'reviewed',indextr)" color="primary" type="border">Reviewed</vs-button>&nbsp;
              <vs-button @click="update(tr,'rejected',indextr)" color="primary" type="border">Rejected</vs-button>&nbsp;
              </vs-popup>
             
       
                <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteUserData(tr._id)" />
           </vs-td>
              
                
            </vs-tr>
          </tbody>
        </template>
         
    </vs-table>
    
  </div>
  <div v-else  id="page-user-view" >

    <!-- <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" /> -->

    <!-- <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" search :data="my_request"> -->

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
          <div  class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-success border border-solid border-success" @click="addNewData">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span v-if="this.lang == 'sp'" class="ml-2 text-base text-danger">Solicitud de socio</span>
              <span v-else-if="this.lang == 'de'" class="ml-2 text-base text-danger">Anfrage für Partner</span>
              <span v-else class="ml-2 text-base text-danger">Request for Partner</span>
          </div>
        
      </div>
    
            <div class="vx-row">
               <div class="vx-col lg:w-1/4 xl:w-1/4 mb-base">
                </div>
              <div class="vx-col sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
                        
                            <vx-card
                                v-if="this.lang == 'de'" 
                                title="Ihre Anfrage"
                                title-color="#fff"
                                content-color="#fff"
                                card-background="linear-gradient(to right, #649a4c, #8fb67e)">
                               
                                
                                <vs-tr :key="indextr" v-for="(tr, indextr) in my_request">
                                <p class="mb-3"><strong>Status</strong></p>
                                <vs-chip :color="getOrderStatusColor(tr.status)" class="product-order-status">{{ tr.status }}</vs-chip>
                                <span>&nbsp;&nbsp;&nbsp;</span><br><br>
                                  <p class="mb-3"><strong>Email: </strong></p> 
                                 <p class="product-category">{{ tr.madeBy.email }}</p>
                                  <br>
                                  <p class="mb-3"><strong>Anfrage gemacht am: </strong></p> 
                                  <p class="product-category">{{ tr.createdAt }}</p> 
                                </vs-tr>
                              
                            </vx-card>
                              <vx-card
                                v-if="this.lang == 'sp'" 
                                 title="Tu petición"
                                title-color="#fff"
                                content-color="#fff"
                                card-background="linear-gradient(to right, #649a4c, #8fb67e)">
                               
                                
                                <vs-tr :key="indextr" v-for="(tr, indextr) in my_request">
                                <p class="mb-3"><strong>Estado</strong></p>
                                <vs-chip :color="getOrderStatusColor(tr.status)" class="product-order-status">{{ tr.status }}</vs-chip>
                                <span>&nbsp;&nbsp;&nbsp;</span><br><br>
                                  <p class="mb-3"><strong>Correo electrónico: </strong></p> 
                                 <p class="product-category">{{ tr.madeBy.email }}</p>
                                  <br>
                                  <p class="mb-3"><strong>Solicitud realizada el: </strong></p> 
                                  <p class="product-category">{{ tr.createdAt }}</p> 
                                </vs-tr>
                            </vx-card>
                            <vx-card 
                                v-if="this.lang != 'de' && this.lang != 'sp' && my_request != ''  " 
                                title="Your Request"
                                title-color="#fff"
                                content-color="#fff"
                                card-background="linear-gradient(to right, #649a4c, #8fb67e)">
                               
                                
                                <vs-tr  :key="indextr" v-for="(tr, indextr) in my_request">
                                <p class="mb-3"><strong>Status</strong></p>
                                <vs-chip :color="getOrderStatusColor(tr.status)" class="product-order-status">{{ tr.status }}</vs-chip>
                                <span>&nbsp;&nbsp;&nbsp;</span><br><br>
                                  <p class="mb-3"><strong>Email: </strong></p> 
                                 <p class="product-category">{{ tr.madeBy.email }}</p>
                                  <br>
                                  <p class="mb-3"><strong>Request Made on: </strong></p> 
                                  <p class="product-category">{{ tr.createdAt }}</p> 
                                </vs-tr>
                              
                            </vx-card>
                        
                     </div>
             </div>
        
       

        <!-- ITEMS PER PAGE -->
          

      <!-- <template slot="thead" v-if="this.lang == 'de'"> -->
        <!-- <vs-th sort-key="name">Name</vs-th>  -->
          <!-- <vs-th sort-key="category">Vorname</vs-th>
        <vs-th sort-key="popularity">Familienname, Nachname</vs-th>
        <vs-th sort-key="popularity">Benutzer Email</vs-th> 
        <vs-th sort-key="order_status">Anforderungsstatus</vs-th>
        <vs-th sort-key="category">Hergestellt in</vs-th> -->
        <!-- <vs-th sort-key="price">Price</vs-th> -->
        <!-- <vs-th>Aktion</vs-th> -->
        
      <!-- </template> -->
      <!-- <template slot="thead" v-else-if="this.lang == 'sp'"> -->
        <!-- <vs-th sort-key="name">Name</vs-th>  -->
          <!-- <vs-th sort-key="category">Primer nombre</vs-th> -->
        <!-- <vs-th sort-key="popularity">Apellido</vs-th>
        <vs-th sort-key="popularity">Email del usuario</vs-th> 
        <vs-th sort-key="order_status">Estado de la solicitud</vs-th>
        <vs-th sort-key="category">Creado en</vs-th> -->
        <!-- <vs-th sort-key="price">Price</vs-th> -->
        <!-- <vs-th>Acción</vs-th> -->
        
      <!-- </template>
      <template slot="thead" v-else> -->
        <!-- <vs-th sort-key="name">Name</vs-th>  -->
          <!-- <vs-th sort-key="category">First Name</vs-th>
        <vs-th sort-key="popularity">Second Name</vs-th>
        <vs-th sort-key="popularity">User Email</vs-th> 
        <vs-th sort-key="order_status">Request Status</vs-th>
        <vs-th sort-key="category">Created At</vs-th> -->
        <!-- <vs-th sort-key="price">Price</vs-th> -->
        <!-- <vs-th>Action</vs-th> -->
        
      <!-- </template> -->

        <!-- <template >
          <tbody  > -->
            <!-- <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data"> -->

            <!-- <vs-tr :key="indextr" v-for="(tr, indextr) in my_request">
                <vs-td>
                 <p class="product-category">{{ tr.madeBy.firstname }}</p>
              </vs-td>
              <vs-td>
                 <p class="product-category">{{ tr.madeBy.lastname }}</p>
              </vs-td>
              <vs-td>
                 <p class="product-category">{{ tr.madeBy.email }}</p>
              </vs-td>
              <vs-td>
                <vs-chip :color="getOrderStatusColor(tr.status)" class="product-order-status">{{ tr.status }}</vs-chip>
              </vs-td> -->

              <!-- <vs-td>
                <p class="product-price">${{ tr.price }}</p>
              </vs-td> -->
                <!-- <vs-td>
                 <p class="product-category">{{ tr.createdAt }}</p>
              </vs-td> -->

              <!-- <vs-td class="whitespace-no-wrap"> -->
                <!-- <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" /> -->
                <!-- <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr._id)" />
              </vs-td> -->
           
            <!-- </vs-tr>
          </tbody> -->
        <!-- </template> -->
         <!-- <template v-if='usertype=="admin"'>
          <tbody  > -->
            <!-- <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data"> -->

            <!-- <vs-tr :key="indextr" v-for="(tr, indextr) in admin_requests">
              <vs-td>
                <vs-chip :color="getOrderStatusColor(tr.status)" class="product-order-status">{{ tr.status }}</vs-chip>
        
              </vs-td> -->

              <!-- <vs-td>
                 <p class="product-category">{{ tr.createdAt }}</p>
              </vs-td>

              <vs-td class="whitespace-no-wrap"> -->
                  
              
          <!-- <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click="popupActive=true" /> -->
          <!-- <vs-button @click="popupActive=true" color="primary" type="border">Open Default popup</vs-button> -->
       
              <!-- <vs-popup class="holamundo" title="Update Status" :active.sync="popupActive">
              <vs-button @click="update(tr,'pending')" color="primary" type="border">Pending</vs-button>&nbsp;
              <vs-button @click="update(tr,'accepted')" color="primary" type="border">Accepted</vs-button>&nbsp;
              <vs-button @click="update(tr,'reviewed')" color="primary" type="border">Reviewed</vs-button>&nbsp;
              <vs-button @click="update(tr,'rejected')" color="primary" type="border">Rejected</vs-button>&nbsp;
          </vs-popup> -->
       
                <!-- <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteUserData(tr._id)" />
              </vs-td>
              
                
            </vs-tr>
          </tbody>
        </template> -->
         
    <!-- </vs-table> -->
    
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
      user_request:[],
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
   
    lang() {
        this.graphComponent += 1
        return this.$i18n.locale
      },
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
        if (this.usertype=="admin")
        {
          return this.$refs.table ? this.$refs.table.queriedResults.length : this.admin_requests.length
          }
        if(this.usertype!="admin"){
          return this.$refs.table ? this.$refs.table.queriedResults.length : this.my_request.length
        }
            
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
           if(this.lang=="de")
          {
                this.$vs.dialog({
                color: 'danger',
                title:  "Sie haben bereits angefordert. Bitte akzeptieren Sie diese Warnung.",
                accept: this.acceptAlert,
                })
          }
          else if(this.lang=="sp")
          {
                this.$vs.dialog({
                color: 'danger',
                title:  "Ya lo has solicitado. Por favor acepte esta alerta.",
                accept: this.acceptAlert,
                })
          }
        else 
        {
          this.$vs.dialog({
                color: 'danger',
                title:  resp.data.errmsg,
                accept: this.acceptAlert,
                })
        }
        }
        else{
          if(this.lang=="sp")
          {
                this.$vs.dialog({
                color: 'success',
                title:  "El estado de su solicitud es :"+resp.data.status,
                accept: this.acceptAlert,
                })
          }
          else if (this.lang=="de")
          {
                this.$vs.dialog({
                color: 'success',
                title:  "Der Status Ihrer Anfrage lautet : "+resp.data.status,
                accept: this.acceptAlert,
                })

          }
          else{
             this.$vs.dialog({
                color: 'success',
                title:  "Your request's status is: "+resp.data.status,
                accept: this.acceptAlert,
                })
          }
           
        }
      
        resolve(resp)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
      });
    },
    update(data,str,index){
      console.log(data._id)
     
        var obj={
          status:str,
          reqId:data._id,
          madeBy:data.madeBy._id
       };
    
      console.log(obj)
        
                   axios.put('/request/updateRequestStatus',obj).then(resp => {
                      
                  
                   console.log(resp,"hhhhhhhhhhhhhhhhhhhhhhhhhh")
                    this.admin_requests[index]=resp.data
                   
                    
                    }).catch(err => {
                       
                      
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
      if (status === 'reviewed')   return 'warning'
      if (status === 'accepted') return 'success'
      if (status === 'rejected')  return 'danger'
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
