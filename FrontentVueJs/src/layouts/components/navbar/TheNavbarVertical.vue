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

    <div class="vx-navbar-wrapper" :class="classObj">

      <vs-navbar class="vx-navbar navbar-custom navbar-skelton" :color="navbarColorLocal" :class="textColor">

        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon class="sm:inline-flex xl:hidden cursor-pointer p-2" icon="MenuIcon" @click.stop="showSidebar" />

    
        <vs-spacer />

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
              class="inputx mr-3 w-full" :disabled="disabled"   v-model="broadcast_message"  />
            <vs-input 
              v-if="this.lang == 'sp'" 
              class="inputx mr-3 w-full" :disabled="disabled"  v-model="broadcast_message"  />
            <vs-input 
              v-if="this.lang != 'de' && this.lang != 'sp'" 
              class="inputx mr-3 w-full" :disabled="disabled"   v-model="broadcast_message"  />
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
var io = require('socket.io-client');

var socket = io.connect('http://localhost:3000', { resource: '/api/socket.io' });

export default {
  name: 'the-navbar-vertical',
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
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
    navbarColorLocal () {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff' ? '#10163a' : this.navbarColor
    },
    verticalNavMenuWidth () {
      return this.$store.state.verticalNavMenuWidth
    },
    textColor () {
      return {'text-white': (this.navbarColor !== '#10163a' && this.$store.state.theme === 'dark') || (this.navbarColor !== '#fff' && this.$store.state.theme !== 'white')}
    },
    windowWidth () {
      return this.$store.state.windowWidth
    },

    // NAVBAR STYLE
    classObj () {
      if      (this.verticalNavMenuWidth === 'default') return 'navbar-default'
      else if (this.verticalNavMenuWidth === 'reduced') return 'navbar-reduced'
      else if (this.verticalNavMenuWidth)               return 'navbar-full'
    }
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
    showSidebar () {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
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
  }
}
</script>
<style lang="scss">
input {
      color: #fa6e6e !important;
    }

</style>
