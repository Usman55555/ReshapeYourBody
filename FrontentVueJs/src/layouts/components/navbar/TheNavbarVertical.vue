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
      <vs-row v-if='usertype=="admin"'>
          <vs-input  v-model="broadcast_message" class="mb-2" />
          <p>&nbsp;</p>
          <vs-button
                    color="success" 
                    v-on:click="broadcast"
                    >Broadcast
          </vs-button>
      </vs-row >
      <vs-row v-if='usertype!=="admin"'> 
      <vs-input class="mr-3 w-full" :disabled="disabled"   placeholder="Broadcats will appear here stay tuned"  id="text" v-model=broadcast_message ></vs-input>
      </vs-row>
        <i18n />

        <search-bar />

        <profile-drop-down />

      </vs-navbar>
    </div>
  </div>
</template>



<script>
import I18n                 from './components/I18n.vue'
import SearchBar            from './components/SearchBar.vue'
import ProfileDropDown      from './components/ProfileDropDown.vue'
var io = require('socket.io-client');

// var socket = io("http://localhost:3000/");
// var socket = io.connect('http://localhost:3000.com/api/socket.io');
var socket = io.connect('http://localhost:3000', { resource: '/api/socket.io' });

export default {
   data () {
    return {
      broadcast_message: '',
      usertype:this.$store.state.usertype,
      disabled: true
     
    }
  },
  name: 'the-navbar-vertical',
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    }
  },
  components: {
    I18n,
    SearchBar,
    ProfileDropDown
  },
  computed: {
    navbarColorLocal () {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff' ? '#10163a' : this.navbarColor
    },
    verticalNavMenuWidth () {
      return this.$store.state.verticalNavMenuWidth
    },
    textColor () {
      return {'text-white': (this.navbarColor !== '#10163a' && this.$store.state.theme === 'dark') || (this.navbarColor !== '#fff' && this.$store.state.theme !== 'dark')}
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
    showSidebar () {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
    },
    broadcast(){
      
      
      if (this.broadcast_message=="")
      {
        console.log("please enter something")
      }
      else{
            
            console.log("broadcast button clicked "+ this.$store.state.usertype,this.$store.state.token,this.broadcast_message)
            socket.emit("broadcastThisMessage",this.broadcast_message,this.$store.state.token)
            this.broadcast_message="";
          
                  
      }

     
     
    }
  },
  created(){
           socket.on("newMessage",(message)=>
                          {
                            console.log(message)
                            this.broadcast_message=message
                          })

  }
  
}
</script>
<style lang="scss">
input:disabled {
  background-color:black;
}

#txt {
  color: red;
}

</style>
