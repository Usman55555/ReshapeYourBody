<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
<div class="relative">
  <div class="vx-navbar-wrapper navbar-full p-0">
    <vs-navbar class="navbar-custom navbar-skelton" :class="navbarClasses"  :style="navbarStyle" :color="navbarColor">

      <router-link tag="div" to="/" class="vx-logo cursor-pointer mx-auto flex items-center">
        <logo class="w-10 mr-4 fill-current text-primary" />
        <span class="vx-logo-text text-primary">Vuexy</span>
      </router-link>

      &nbsp;
      &nbsp;
      <vs-row v-if='admin()'>
          <div class="flex  w-full bg-white chat-input-container mr-3">
                <vs-input
                  v-if="this.lang == 'de'" 
                  v-model="broadcast_message" class="mr-3 w-full" placeholder="Geben Sie Ihre Nachricht ein" ></vs-input>
                <vs-input
                  v-if="this.lang == 'sp'" 
                  v-model="broadcast_message" class="mr-3 w-full" placeholder="Escribe tu mensaje" ></vs-input>
                <vs-input
                  v-if="this.lang != 'de' && this.lang != 'sp'" 
                  v-model="broadcast_message" class="mr-3 w-full" placeholder="Type Your Message" ></vs-input>
              <vs-button v-on:click="broadcast" icon-pack="feather" icon="icon-send" ></vs-button>
          </div>
      </vs-row >

      <vs-row v-else> 
            <vs-input 
              v-if="this.lang == 'de'" 
              class="inputx mr-3 w-full" :disabled="disabled"  placeholder="Die Sendung von Admin wird hier angezeigt..." v-model="broadcast_message"  />
            <vs-input 
              v-if="this.lang == 'sp'" 
              class="inputx mr-3 w-full" :disabled="disabled"  placeholder="La transmisión del administrador aparecerá aquí..." v-model="broadcast_message"  />
            <vs-input 
              v-if="this.lang != 'de' && this.lang != 'sp'" 
              class="inputx mr-3 w-full" :disabled="disabled"  placeholder="Broadcats from Admin will appear here..." v-model="broadcast_message"  />
      </vs-row>

      <i18n />

      <!-- <search-bar /> -->

      &nbsp;
      <span v-show="available"><profile-drop-down :key="watchIt"/></span>

    </vs-navbar>
  </div>
</div>
</template>

<script>
import I18n                 from './components/I18n.vue'
import SearchBar            from './components/SearchBar.vue'
import ProfileDropDown      from './components/ProfileDropDown.vue'
import Logo                 from '../Logo.vue'

var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', { resource: '/api/socket.io' });


export default {
  name: 'the-navbar-horizontal',
  props: {
    logo: { type: String                                                                                                          },
    navbarType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      available: null,
      broadcast_message: '',
      usertype:this.$store.state.usertype,
      disabled: true
    }
  },
  created() {
    this.ifAvailable()    
    socket.on("newMessage",(message)=>
      {
        // console.log(message)
        this.broadcast_message=message
      })
  },
  components: {
    Logo,
    I18n,
    SearchBar,
    ProfileDropDown
  },
  computed: {
    lang() {
      this.graphComponent += 1
      return this.$i18n.locale
    },
    watchIt () {
      console.log(this.$store.state.componentKey)
      return this.$store.state.componentKey
    },
    navbarColor () {
      let color = '#fff'
      if (this.navbarType === 'sticky') color = '#f7f7f7'
      else if (this.navbarType === 'static') {
        if (this.scrollY < 50) {
          color = '#f7f7f7'
        }
      }

      if (this.isThemedark === 'dark') {
        if (color === '#fff') {
          color = '#10163a'
        } else {
          color = '#262c49'
        }
      }

      return color
    },
    isThemedark ()          { return this.$store.state.theme                                                                       },
    navbarStyle ()          { return this.navbarType === 'static' ? {transition: 'all .25s ease-in-out'} : {}                      },
    navbarClasses ()        { return this.scrollY > 5 && this.navbarType === 'static' ? null : 'd-theme-dark-light-bg shadow-none' },
    scrollY ()              { return this.$store.state.scrollY                                                                     },
    verticalNavMenuWidth () { return this.$store.state.verticalNavMenuWidth                                                        },
    windowWidth ()          { return this.$store.state.windowWidth                                                                 }
  },
  methods: {
    admin () {
      return localStorage.getItem('user-usertype') === 'admin'
    },
    ifAvailable () {
        console.log('inside fun '+this.available)
      this.watchForStorage().then(() => {
        this.available = true
        // console.log(this.available)
      })
    },
    watchForStorage() {
      return new Promise((resolve, reject) => {
        var timer = setInterval(function() {
        // console.log(localStorage.getItem('user-token') != null)
          if (localStorage.getItem('user-token') != null){
            clearInterval(timer);
            resolve()
          }
        }, 250);
      })
    },
    broadcast(){
      if (this.broadcast_message=="")
      {
        console.log("please enter something")
      }
      else{
        console.log("broadcast this message: "+ this.broadcast_message)
        socket.emit("broadcastThisMessage",this.broadcast_message,this.$store.state.token)
        this.$vs.notify({
          title: 'Message sent',
          text: this.broadcast_message,
          color: 'primary',
          iconPack: 'feather',
          position: 'bottom-right',
          icon:'icon-check'
        })
        this.broadcast_message="";
      }
    }
  },
}

</script>

