<template>
  <vx-card no-shadow>

    <!-- <span class="text-danger text-sm" v-show="!isDisabled">The email must be valid.</span>
    <br />
    <br /> -->
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>
    <vs-input 
      v-if="this.lang == 'de'" 
      data-vv-validate-on="blur"
        v-validate="'required|email'" 
      name="email"
      icon-no-border
      icon="icon-mail"
      icon-pack="feather"
      placeholder="Neue e-mail"
      class="w-full mb-base" 
      label-placeholder="Neue e-mail" 
      v-model="email" />
    <vs-input 
      v-if="this.lang == 'sp'" 
      data-vv-validate-on="blur"
        v-validate="'required|email'" 
      name="email"
      icon-no-border
      icon="icon-mail"
      icon-pack="feather"
      placeholder="Nuevo Email"
      class="w-full mb-base" 
      label-placeholder="Nuevo Email" 
      v-model="email" />
    <vs-input 
      v-if="this.lang != 'de' && this.lang != 'sp'" 
      data-vv-validate-on="blur"
        v-validate="'required|email'" 
      name="email"
      icon-no-border
      icon="icon-mail"
      icon-pack="feather"
      placeholder="New Email"
      class="w-full mb-base" 
      label-placeholder="New Email" 
      v-model="email" />
      
    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button 
        v-if="this.lang == 'de'" 
        class="ml-4 mt-2" 
        type="border" 
        color="warning"
        @click="reset"
        :disabled="!isDisabled">Ändern Sie die E-Mail</vs-button>
      <vs-button 
        v-if="this.lang == 'sp'" 
        class="ml-4 mt-2" 
        type="border" 
        color="warning"
        @click="reset"
        :disabled="!isDisabled">Cambiar e-mail</vs-button>
      <vs-button 
        v-if="this.lang != 'de' && this.lang != 'sp'" 
        class="ml-4 mt-2" 
        type="border" 
        color="warning"
        @click="reset"
        :disabled="!isDisabled">Change Email</vs-button>
    </div>
  </vx-card>
</template>

<script>
export default {
  data () {
    return {
      email: ''
    }
  },
  computed: {
    lang() {
      this.graphComponent += 1
      return this.$i18n.locale
    },
    isDisabled () {
      return !this.errors.any() && this.email !== ''
    },
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    reset () {
      if (this.lang == 'de'){
        this.$vs.notify({
          title: 'Warnung',
          text: 'Bitte warten Sie eine Weile',
          color: 'primary',
          iconPack: 'feather',
          position: 'top-center',
          icon:'icon-clock'
        })
      }
      else if (this.lang == 'sp'){
        this.$vs.notify({
          title: 'Advertencia',
          text: 'Por favor espera un poco',
          color: 'primary',
          iconPack: 'feather',
          position: 'top-center',
          icon:'icon-clock'
        })
      }
      else{
        this.$vs.notify({
          title: 'Warning',
          text: 'Please wait a little while',
          color: 'primary',
          iconPack: 'feather',
          position: 'top-center',
          icon:'icon-clock'
        })
      }
    // this.$vs.notify({
    //     title:'Warning',
    //     text:'Please wait a little while',
    //     color:'warning'})
      const { email } = this
      this.$store.getters.getId.then(id => {      
        this.$store.dispatch('editMail', { 
          email
          }).then(() => {
          this.colorAlert = 'primary'
          if (this.lang == 'de'){
            this.$vs.dialog({
              color: this.colorAlert,
              title: `Sie müssen Ihre E-Mail bestätigen...`,
              accept: this.acceptAlert
            })
          }
          else if (this.lang == 'sp'){
            this.$vs.dialog({
              color: this.colorAlert,
              title: `Necesitas confirmar tu correo electrónico...`,
              accept: this.acceptAlert
            })
          }
          else{
            this.$vs.dialog({
              color: this.colorAlert,
              title: `You need to confirm your email...`,
              accept: this.acceptAlert
            })
          }
        })
        .catch(e => {
          this.colorAlert = 'danger'
          this.$vs.dialog({
            color: this.colorAlert,
            title: `Unable to send the confirmation email...`,
            text: `You must be unauthenticated...`,
            accept: this.acceptAlert
          })
        })
      })
    }
  }
}
</script>
