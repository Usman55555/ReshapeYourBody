<template>
  <vx-card no-shadow>

    <vs-alert
      v-if="this.lang == 'de'" 
      color="danger" title="Achtung" active="true" class="mt-3">
        Bitte seien Sie vorsichtig, Sie können alle Ihre Unterlagen verlieren, indem Sie dieses Formular abschicken.
    </vs-alert>
    <vs-alert
      v-if="this.lang == 'sp'" 
      color="danger" title="Ten cuidado" active="true" class="mt-3">
        Tenga cuidado, puede perder todos sus registros al enviar este formulario.
    </vs-alert>
    <vs-alert
      v-if="this.lang != 'de' && this.lang != 'sp'" 
      color="danger" title="Be Carefull" active="true" class="mt-3">
        Please, be carefull, you can loose all of your record by submitting this form.
    </vs-alert>

    <br />
    <br />
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>
    <vs-input 
      v-if="this.lang == 'de'" 
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6'"
      name="password"
      icon-no-border
      icon="icon-lock"
      icon-pack="feather"
      placeholder="Passwort"
      class="w-full mb-base" 
      label-placeholder="Passwort" 
      v-model="password" />
    <vs-input 
      v-if="this.lang == 'sp'" 
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6'"
      name="password"
      icon-no-border
      icon="icon-lock"
      icon-pack="feather"
      placeholder="Contraseña"
      class="w-full mb-base" 
      label-placeholder="Contraseña" 
      v-model="password" />
    <vs-input 
      v-if="this.lang != 'de' && this.lang != 'sp'" 
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6'"
      name="password"
      icon-no-border
      icon="icon-lock"
      icon-pack="feather"
      placeholder="Password"
      class="w-full mb-base" 
      label-placeholder="Password" 
      v-model="password" />
    
    <div class="flex flex-wrap items-center justify-end">
      <vs-button 
        v-if="this.lang == 'de'" 
        class="ml-4 mt-2" 
        type="border" 
        color="danger"
        @click="deleteAccount"
        :disabled="!isDisabled">Konto löschen</vs-button>
      <vs-button 
        v-if="this.lang == 'sp'" 
        class="ml-4 mt-2" 
        type="border" 
        color="danger"
        @click="deleteAccount"
        :disabled="!isDisabled">Borrar cuenta</vs-button>
      <vs-button 
        v-if="this.lang != 'de' && this.lang != 'sp'" 
        class="ml-4 mt-2" 
        type="border" 
        color="danger"
        @click="deleteAccount"
        :disabled="!isDisabled">Delete Account</vs-button>
    </div>
  </vx-card>
</template>

<script>
export default {
  data () {
    return {
        'password': ''
    }
  },
  computed: {
    lang() {
      this.graphComponent += 1
      return this.$i18n.locale
    },
    isDisabled () {
      return !this.errors.any() && this.password !== ''
    },
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    deleteAccount () {
      if (this.lang == 'de'){
        this.$vs.notify({
          title: 'Warnung',
          text: 'Bitte warten Sie eine Weile',
          color: 'warning',
          iconPack: 'feather',
          position: 'top-center',
          icon:'icon-clock'
        })
      }
      else if (this.lang == 'sp'){
        this.$vs.notify({
          title: 'Advertencia',
          text: 'Por favor espera un poco',
          color: 'warning',
          iconPack: 'feather',
          position: 'top-center',
          icon:'icon-clock'
        })
      }
      else{
        this.$vs.notify({
          title: 'Warning',
          text: 'Please wait a little while',
          color: 'warning',
          iconPack: 'feather',
          position: 'top-center',
          icon:'icon-clock'
        })
      }
      const { password } = this
      this.$store.getters.getId.then(id => {      
        this.$store.dispatch('deleteAccount', { 
          password
          }).then(() => {
          this.colorAlert = 'primary'
          if (this.lang == 'de'){
            this.$vs.dialog({
              color: this.colorAlert,
              title: `Ihr Konto wird gelöscht...`,
              accept: this.acceptAlert
            })
          }
          else if (this.lang == 'sp'){
            this.$vs.dialog({
              color: this.colorAlert,
              title: `Tu cuenta ha sido eliminada...`,
              accept: this.acceptAlert
            })
          }
          else{
            this.$vs.dialog({
              color: this.colorAlert,
              title: `Your account is deleted...`,
              accept: this.acceptAlert
            })
          }
          this.$router.push('/pages/login')
          this.$store.dispatch('logout')
        })
        .catch(e => {
          this.colorAlert = 'danger'
          if (this.lang == 'de'){
            this.$vs.dialog({
              color: this.colorAlert,
              title: `Etwas ist schief gelaufen`,
              text: `Sie müssen nicht authentifiziert sein...`,
              accept: this.acceptAlert
            })
          }
          else if (this.lang == 'sp'){
            this.$vs.dialog({
              color: this.colorAlert,
              title: `Algo salió mal`,
              text: `Debes estar no autenticado...`,
              accept: this.acceptAlert
            })
          }
          else{
            this.$vs.dialog({
              color: this.colorAlert,
              title: `Something went wrong`,
              text: `You must be unauthenticated...`,
              accept: this.acceptAlert
            })
          }
        })
      })
    }
  }
}
</script>
