]<!-- =========================================================================================
    File Name: Faq.vue
    Description: FAQ Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div id="faq-page">
        <!-- JUMBOTRON -->
        <div class="faq-jumbotron">
            <div v-if="this.lang == 'de'"  class="faq-jumbotron-content lg:p-32 md:p-24 sm:p-16 p-8 rounded-lg mb-base">
                <h1 class="mb-1 text-white">Haben Sie Fragen?</h1>
                <vs-input placeholder="Suche" v-model="faqSearchQuery" icon-pack="feather" icon="icon-search" size="large" class="w-full mt-6" icon-no-border />
            </div>
            <div v-if="this.lang == 'sp'"  class="faq-jumbotron-content lg:p-32 md:p-24 sm:p-16 p-8 rounded-lg mb-base">
                <h1 class="mb-1 text-white">¿Tiene alguna pregunta?</h1>
                <vs-input placeholder="buscar" v-model="faqSearchQuery" icon-pack="feather" icon="icon-search" size="large" class="w-full mt-6" icon-no-border />
            </div>
            <div v-if="this.lang != 'de' && this.lang != 'sp'"  class="faq-jumbotron-content lg:p-32 md:p-24 sm:p-16 p-8 rounded-lg mb-base">
                <h1 class="mb-1 text-white">Have Any Questions?</h1>
                <vs-input placeholder="Search" v-model="faqSearchQuery" icon-pack="feather" icon="icon-search" size="large" class="w-full mt-6" icon-no-border />
            </div>
        </div>
        <div class="vx-row">
            <div class="vx-col w-full md:w-2/5 lg:w-1/4 rounded-lg">
                <vx-card v-if="this.lang == 'sp'" >
                    <vs-button 
                      v-show="activeUserInfo.usertype == 'admin'"
                      color="primary" 
                      type="filled" 
                      @click="goToAddFaqPage"
                      >Agregue sus preguntas frecuentes</vs-button>
                      <br><br>
                      <vs-button 
                      v-show="activeUserInfo.usertype == 'admin'"
                      color="primary" 
                      type="filled" 
                      @click="goToAddCategory"
                      >Añadir nueva categoria</vs-button>
                    <br><br><h4>Tabla de contenidos</h4>
                    <ul class="faq-topics mt-4">
                        <li :key="1" class="p-2 font-medium flex items-center" @click="faqFilter = 1">
                            <div class="h-3 w-3 rounded-full mr-2" :class="'bg-grey'"></div><span class="cursor-pointer">All</span>
                        </li>
                        <li v-for="category in categories" :key="category.id" class="p-2 font-medium flex items-center" @click="faqFilter = category.oid">
                            <div class="h-3 w-3 rounded-full mr-2" :class="'bg-' + category.color"></div><span class="cursor-pointer">{{ category.name }}</span>
                            <vx-tooltip v-if="activeUserInfo.usertype==='admin'" :style="{display:inline,float:'right'}" color="primary" text="Edit this Category">
                                <vs-button :style="{display:inline}" color="primary" type="line" icon="edit" size="large" @click="goToEditCat(category.oid)"></vs-button>
                            </vx-tooltip>
                        </li>
                    </ul>

                    <br><br>
                </vx-card>
                <vx-card v-if="this.lang == 'de'" >
                    <vs-button 
                      v-show="activeUserInfo.usertype == 'admin'"
                      color="primary" 
                      type="filled" 
                      @click="goToAddFaqPage"
                      >Fügen Sie Ihre FAQ hinzu</vs-button>
                      <br><br>
                      <vs-button 
                      v-show="activeUserInfo.usertype == 'admin'"
                      color="primary" 
                      type="filled" 
                      @click="goToAddCategory"
                      >neue Kategorie hinzufügen</vs-button>
                    <br><br><h4>Inhaltsverzeichnis</h4>
                    <ul class="faq-topics mt-4">
                        <li :key="1" class="p-2 font-medium flex items-center" @click="faqFilter = 1">
                            <div class="h-3 w-3 rounded-full mr-2" :class="'bg-grey'"></div><span class="cursor-pointer">All</span>
                        </li>
                        <li v-for="category in categories" :key="category.id" class="p-2 font-medium flex items-center" @click="faqFilter = category.oid">
                            <div class="h-3 w-3 rounded-full mr-2" :class="'bg-' + category.color"></div><span class="cursor-pointer">{{ category.name }}</span>
                            <vx-tooltip v-if="activeUserInfo.usertype==='admin'" :style="{display:inline,float:'right'}" color="primary" text="Edit this Category">
                                <vs-button :style="{display:inline}" color="primary" type="line" icon="edit" size="large" @click="goToEditCat(category.oid)"></vs-button>
                            </vx-tooltip>
                        </li>
                    </ul>

                    <br><br>
                </vx-card>
                <vx-card v-if="this.lang != 'de' && this.lang != 'sp'" >
                    <vs-button 
                      v-show="activeUserInfo.usertype == 'admin'"
                      color="primary" 
                      type="filled" 
                      @click="goToAddFaqPage"
                      >Add Your FAQ</vs-button>
                      <br><br>
                      <vs-button 
                      v-show="activeUserInfo.usertype == 'admin'"
                      color="primary" 
                      type="filled" 
                      @click="goToAddCategory"
                      >Add New Category</vs-button>

                    <br><br><h4>Table of Content</h4>
                    <ul class="faq-topics mt-4">
                        <li :key="1" class="p-2 font-medium flex items-center" @click="faqFilter = 1">
                            <div class="h-3 w-3 rounded-full mr-2" :class="'bg-grey'"></div><span class="cursor-pointer">All</span>
                        </li>
                        <li v-for="category in categories" :key="category.id" class="p-2 font-medium flex items-center" @click="faqFilter = category.oid">
                            <div class="h-3 w-3 rounded-full mr-2" :class="'bg-' + category.color"></div><span class="cursor-pointer">{{ category.name }}</span>
                              <vx-tooltip v-if="activeUserInfo.usertype==='admin'" :style="{display:inline,float:'right'}" color="primary" text="Edit this Category">
                                <vs-button :style="{display:inline}" color="primary" type="line" icon="edit" size="large" @click="goToEditCat(category.oid)"></vs-button>
                              </vx-tooltip>
                        </li>
                    </ul>

                    <br><br>
                </vx-card>
            </div>

            <!-- FAQ COL -->
            <div class="vx-col w-full md:w-3/5 lg:w-3/4 mt-12 md:mt-0">
                <vs-collapse accordion type="margin" class="p-0">
                    <vs-collapse-item v-for="(que,index) in filteredFaq" class="faq-bg rounded-lg" :class="{'mt-0': !index}" :key="que.id">
                        <div slot="header">
                          <h5 :style="{display:inline}">{{ que.question }}</h5>
                          
                          <vx-tooltip v-if="(activeUserInfo.id)&&(activeUserInfo.id===que.askedBy._id || activeUserInfo.usertype==='admin')" :style="{display:inline,float:'right'}" color="danger" text="Delete this faq">
                            <vs-button v-if="(activeUserInfo.id)&&(activeUserInfo.id===que.askedBy._id || activeUserInfo.usertype==='admin')" :style="{display:inline}" color="danger" type="line" icon="delete" size="large" @click="deleteFaq(que._id)"></vs-button>
                          </vx-tooltip>
                          <vx-tooltip v-if="activeUserInfo.id===que.askedBy._id" :style="{display:inline,float:'right'}" color="primary" text="Edit this faq">
                            <vs-button :style="{display:inline}" color="primary" type="line" icon="edit" size="large" @click="goToEdit(que._id)"></vs-button>
                          </vx-tooltip><br>
                          <p :style="pSet" class="dark"><user-plus-icon size="1.6x" class="custom-class"></user-plus-icon>&nbsp;:&nbsp;(&nbsp;</p>
                          <span :style="spanSet" class="success">{{que.askedBy.firstname}}</span>&nbsp;
                          <span :style="spanSet" class="success">{{que.askedBy.lastname}}</span>
                          <p :style="pSet" class="dark">&nbsp;)&nbsp;</p>

                          <p :style="pSet" class="dark">&nbsp;(&nbsp;</p>
                          <span :style="spanSet" class="primary">{{que.askedBy.email}}</span>
                          <p :style="pSet" class="dark">&nbsp;)&nbsp;</p>

                          <p :style="pSet" class="dark">&nbsp;(&nbsp;</p>
                          <span :style="spanSet" class="danger">{{que.askedBy.usertype}}</span>
                          <p :style="pSet" class="dark">&nbsp;)&nbsp;</p>
                        </div>
                        <p>{{ que.answer }}</p>
                    </vs-collapse-item>
                </vs-collapse>

            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import { UserPlusIcon } from 'vue-feather-icons';
  import { DeleteIcon } from 'vue-feather-icons';
  
  export default{
    data () {
      return {
        inline:'inline',
        pSet:{
          display:'inline',
          fontSize: '60%'
        },
        spanSet:{
          display:'inline',
          fontSize: '60%'
        },
        faqSearchQuery: '',
        faqFilter: 1,
        categories: [],
        categoriesGet: [],
        categoryObj: {},
        faqs:[],        
      }
    },
    computed: {
      lang() {
        this.graphComponent += 1
        return this.$i18n.locale
      },
      
      filteredFaq () {
        return this.faqs.filter((faq) => {
          if (this.faqFilter === 1) return faq.question.toLowerCase().includes(this.faqSearchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(this.faqSearchQuery.toLowerCase())
          else return faq.category === this.faqFilter && (faq.question.toLowerCase().includes(this.faqSearchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(this.faqSearchQuery.toLowerCase()))
        })
      },
      activeUserInfo () {
      if (this.$store.state.tempUserObj.token !== undefined) {
        var obj = {
          id: this.$store.state.tempUserObj.id,
          firstname: this.$store.state.tempUserObj.firstname,
          lastname: this.$store.state.tempUserObj.lastname,
          about: this.$store.state.tempUserObj.about,
          photoURL: this.$store.state.tempUserObj.photoURL === undefined ? require('@/assets/images/user/user.png') : this.$store.state.AppActiveUser.photoURL,
          usertype: this.$store.state.tempUserObj.usertype,
          email: this.$store.state.tempUserObj.email
        }
        console.log(obj)
        return obj
      }
      else {
        var obj = {
          id: this.$store.state.AppActiveUser.id,
          firstname: this.$store.state.AppActiveUser.firstname,
          lastname: this.$store.state.AppActiveUser.lastname,
          about: this.$store.state.AppActiveUser.about,
          photoURL: this.$store.state.AppActiveUser.photoURL === "undefined" ? require('@/assets/images/user/user.png') : this.$store.state.AppActiveUser.photoURL,
          usertype: this.$store.state.AppActiveUser.usertype,
          email: this.$store.state.AppActiveUser.email
        }
        console.log(obj)
        return obj
      }
    }
    },
    methods: {
      goToAddFaqPage (){
        this.$router.push('/pages/addfaq')
      },
      goToAddCategory (){
        this.$router.push('/pages/addCategory')
      },
      goToEdit(idd){
        this.$router.push({ name: 'page-faq-edit', params: { id: idd } })
      },
      goToEditCat(idd){
        this.$router.push({ name: 'page-category-edit', params: { id: idd } })
      },
      getCategory(){
        return new Promise((resolve, reject) => {
          axios.get('/category/getCategory').then(resp => {
          this.categoriesGet=resp.data;
          for(let index=0; index<this.categoriesGet.length; index++){
            this.categoryObj= {
              id: index+1,
              oid: this.categoriesGet[index]['_id'],
              name: this.categoriesGet[index]['name'],
              color: 'grey'
            }
            this.categories.push(this.categoryObj)
            this.categoryObj={}
          }
          console.log(this.categories)
          resolve(resp)
          }).catch(err => {
              console.log(err)
              this.$router.push('/pages/login')
              reject(err)
          })
      });

      },
      deleteFaq(id){
        return new Promise((resolve, reject) => {
        if(this.activeUserInfo.usertype==='admin'){
          axios.delete('/faq/deleteQuestion',{
          params: {
            faqId:id
          }
        }).then(resp => {
          console.log(resp);
          for(let index=0; index<this.faqs.length; index++){
            if(this.faqs[index]._id==id){
              this.faqs.splice(index,1);
            }
          }
          resolve(resp)
          }).catch(err => {
              console.log(err);
              reject(err)
          })
        }else{
          axios.delete('/faq/deleteQuestionByOwner',{
          params: {
            faqId:id
          }
        }).then(resp => {
          console.log(resp);
          for(let index=0; index<this.faqs.length; index++){
            if(this.faqs[index]._id==id){
              this.faqs.splice(index,1);
            }
          }
          resolve(resp)
          }).catch(err => {
              console.log(err);
              reject(err)
          })
        }
        
        });
      }
    },
    created() {
      this.getCategory();
      return new Promise((resolve, reject) => {
        axios.get('/faq/getFaqs').then(resp => {
        this.faqs=resp.data;
        console.log(this.faqs)
        for(let index=0; index<this.faqs.length; index++){
          for(let index2=0; index2<this.categories.length; index2++){
            if(this.faqs[index].category==this.categories[index2]['oid']){
              this.faqs[index].categoryId=index2;
            }
          }
        }
        resolve(resp)
        }).catch(err => {
            console.log(err)
            this.$router.push('/pages/login')
            reject(err)
        })
    });
    },
    components: {
      UserPlusIcon,
      DeleteIcon
    }
  }
</script>

<style lang="scss">
#faq-page {
    .faq-jumbotron-content {
        background-image: url('../../assets/images/pages/faq.jpg');
        background-size: cover;
    }

    .faq-bg {
        background-color: #fff;
    }
}

.primary {
  color:#649a4c
}
.success {
  color:rgb(23, 201, 100)
}
.danger {
  color:rgb(242, 19, 93)
}
.warning {
  color:rgb(255, 130, 0)
}
.dark {
  color:rgb(36, 33, 69)
}
</style>
