<!-- =========================================================================================
  File Name: DataListListView.vue
  Description: Data List - List View
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-table ref="table" v-model="selected" pagination :max-items="itemsPerPage" search :data="Keys">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <!-- ADD NEW -->
          <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span v-if="lang == 'sp'" class="ml-2 text-base text-primary">Agregar nuevo</span>
              <span v-if="lang == 'de'" class="ml-2 text-base text-primary">Neue hinzufügen</span>
              <span v-if="lang != 'de' && lang != 'sp'" class="ml-2 text-base text-primary">Add New</span>
          </div>
        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span v-if="lang == 'sp'" class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ Keys.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : Keys.length }} de {{ queriedItems }}</span>
            <span v-if="lang == 'de'" class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ Keys.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : Keys.length }} von {{ queriedItems }}</span>
            <span v-if="lang != 'de' && lang != 'sp'" class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ Keys.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : Keys.length }} of {{ queriedItems }}</span>
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

      <template v-if="lang == 'sp'" slot="thead">
        <vs-th sort-key="key">Clave de producto</vs-th>
        <vs-th sort-key="creadtedAt">Creado en</vs-th>
        <vs-th sort-key="used">Usado</vs-th>
        <vs-th sort-key="owner">Propietario</vs-th>
        <vs-th>Acción</vs-th>
      </template>

       <template v-if="lang == 'de'" slot="thead">
        <vs-th sort-key="key">Produktschlüssel</vs-th>
        <vs-th sort-key="creadtedAt">Hergestellt in</vs-th>
        <vs-th sort-key="used">Benutzt</vs-th>
        <vs-th sort-key="owner">Inhaber</vs-th>
        <vs-th>Aktion</vs-th>
      </template>

       <template v-if="lang != 'de' && lang != 'sp'" slot="thead">
        <vs-th sort-key="key">Product Key</vs-th>
        <vs-th sort-key="creadtedAt">Created At</vs-th>
        <vs-th sort-key="used">Used</vs-th>
        <vs-th sort-key="owner">Owner</vs-th>
        <vs-th>Action</vs-th>
      </template>

        <template slot-scope="{data}">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.key }}</p>
                <vs-chip v-if="lang == 'sp'" color="primary"
                  v-clipboard:copy="tr.key"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError">Haga clic para copiar la clave al portapapeles!</vs-chip>

                <vs-chip v-if="lang == 'de'" color="primary"
                  v-clipboard:copy="tr.key"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError">Klicken Sie hier, um den Schlüssel in die Zwischenablage zu kopieren!</vs-chip>
                
                <vs-chip v-if="lang != 'de' && lang != 'sp'" color="primary"
                  v-clipboard:copy="tr.key"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError">Click to Copy Key to Clipboard!</vs-chip>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.creadtedAt }}</p>
              </vs-td>
              <vs-td>
                <vs-chip :color="getOrderStatusColor(tr.used)" class="product-order-status">{{ tr.used}}</vs-chip>
              </vs-td>
              <vs-td>
                <p v-if="tr.owner !== null" class="product-category">{{ tr.owner.email }}</p>
                <p v-else></p>
              </vs-td>

              <vs-td class="whitespace-no-wrap">
                <vx-tooltip :style="{display:inline,float:'right'}" color="danger" text="Delete this key">
                <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr._id)" />
                </vx-tooltip>
              </vs-td>

            </vs-tr>
          </tbody>
        </template>
    </vs-table>
  </div>
</template>

<script>

import axios from 'axios'
import VueClipboard from 'vue-clipboard2'

export default {
  data () {
    return {
      inline:'inline',
      selected: [],
      keys: [],
      itemsPerPage: 4,
      isMounted: false,
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
    Keys () {
      return this.keys
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.Keys.length
    }
  },
  methods: {
    addNewData () {
      return new Promise((resolve, reject) => {
        axios.post('/key/generateKey').then(resp => {
        this.keys.unshift(resp.data)
        if (this.lang == 'de'){
          this.$vs.dialog({
            color: 'primary',
            title: 'Schlüssel erfolgreich hinzugefügt',
            text: resp.data.key,
            accept: this.acceptAlert
          })
        }
        else if (this.lang == 'sp'){
          this.$vs.dialog({
            color: 'primary',
            title: 'Clave agregada exitosamente',
            text: resp.data.key,
            accept: this.acceptAlert
          })
        }
        else{
          this.$vs.dialog({
            color: 'primary',
            title: 'Key added successfully',
            text: resp.data.key,
            accept: this.acceptAlert
          })
        }
        resolve(resp)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
      });
    },
    onCopy: function (e) {
      if (this.lang == 'de'){
        this.$vs.notify({
          title: 'Schlüssel kopiert',
          text: e.text,
          color: 'primary',
          iconPack: 'feather',
          position: 'top-center',
          icon:'icon-check'
        })
      }
      else if (this.lang == 'sp'){
        this.$vs.notify({
          title: 'Clave copiada',
          text: e.text,
          color: 'primary',
          iconPack: 'feather',
          position: 'top-center',
          icon:'icon-check'
        })
      }
      else{
        this.$vs.notify({
          title: 'Key copied',
          text: e.text,
          color: 'primary',
          iconPack: 'feather',
          position: 'top-center',
          icon:'icon-check'
        })
      }
      // this.$vs.dialog({
      //   color: 'warning',
      //   title: 'Key copied',
      //   text: e.text,
      //   accept: this.acceptAlert
      // })
    },
    onError: function (e) {
      this.colorAlert='danger';
      if (this.lang == 'de'){
        this.$vs.dialog({
          color: this.colorAlert,
          title: "Ein Fehler ist aufgetreten",
          accept: this.acceptAlert
        });
      }
      else if (this.lang == 'sp'){
        this.$vs.dialog({
          color: this.colorAlert,
          title: "Ocurrió un error",
          accept: this.acceptAlert
        });
      }
      else{
        this.$vs.dialog({
          color: this.colorAlert,
          title: "An Error occured",
          accept: this.acceptAlert
        });
      }
    },
    deleteData (id) {
      return new Promise((resolve, reject) => {
          axios.delete('/key/deleteKey',{
            params: {
              keyId:id
            }
          }).then(resp => {
          for(let index=0; index<this.keys.length; index++){
            if(this.keys[index]._id==id){
              this.keys.splice(index,1);
            }
          }
          resolve(resp)
          }).catch(err => {
              console.log(err);
              reject(err)
          })
      });
      
    },
    editData (data) {

    },
    getOrderStatusColor (status) {
      if (status) return 'primary'
      if (!status)  return 'danger'
    },

  },
  created () {
    return new Promise((resolve, reject) => {
        axios.get('/key/getKeys').then(resp => {
        this.keys=resp.data;
        resolve(resp)
        }).catch(err => {
            console.log(err);
            reject(err)
        })
    });
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
