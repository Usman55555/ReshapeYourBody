<template>
  <vx-card no-shadow>

    <div
      v-if="this.lang == 'de'">
      <span class="text-danger text-sm" v-show="!isDisabled">Die alten und neuen Kennwortfelder dürfen nicht leer und neu sein und bestätigen, dass Kennwörter übereinstimmen müssen und alte und neue Kennwortfelder nicht übereinstimmen dürfen.</span>
    </div>
    <div
      v-if="this.lang == 'sp'">
      <span class="text-danger text-sm" v-show="!isDisabled">Los campos de contraseñas antiguas y nuevas no deben estar vacías y nuevas, y las contraseñas de confirmación deben coincidir, y los campos de contraseña antiguos y nuevos no deben coincidir.</span>
    </div>
    <div
      v-if="this.lang != 'de' && this.lang != 'sp'">
      <span class="text-danger text-sm" v-show="!isDisabled">The old and new passwords fields must not be empty and new and confirm passwords must match and old and new password fields must not match.</span>
    </div>
    <br />
    <br />
    <span class="text-danger text-sm">{{ errors.first('oldpassword') }}</span>
    <vs-input 
      v-if="this.lang == 'de'"
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6'"
      name="oldpassword"
      icon-no-border
      icon="icon-lock"
      icon-pack="feather"
      placeholder="Altes Passwort"
      class="w-full mb-base" 
      label-placeholder="Altes Passwort" 
      v-model="old_password" />
    <vs-input 
      v-if="this.lang == 'sp'"
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6'"
      name="oldpassword"
      icon-no-border
      icon="icon-lock"
      icon-pack="feather"
      placeholder="Contraseña anterior"
      class="w-full mb-base" 
      label-placeholder="Contraseña anterior" 
      v-model="old_password" />
    <vs-input 
      v-if="this.lang != 'de' && this.lang != 'sp'"
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6'"
      name="oldpassword"
      icon-no-border
      icon="icon-lock"
      icon-pack="feather"
      placeholder="Old Password"
      class="w-full mb-base" 
      label-placeholder="Old Password" 
      v-model="old_password" />

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
      placeholder="Neues Kennwort"
      class="w-full mb-base" 
      label-placeholder="Neues Kennwort" 
      v-model="new_password" />
    <vs-input 
      v-if="this.lang == 'sp'"
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6'"
      name="password"
      icon-no-border
      icon="icon-lock"
      icon-pack="feather"
      placeholder="Nueva contraseña"
      class="w-full mb-base" 
      label-placeholder="Nueva contraseña" 
      v-model="new_password" />
    <vs-input 
      v-if="this.lang != 'de' && this.lang != 'sp'"
      type="password"
      data-vv-validate-on="blur"
      v-validate="'required|min:6'"
      name="password"
      icon-no-border
      icon="icon-lock"
      icon-pack="feather"
      placeholder="New Password"
      class="w-full mb-base" 
      label-placeholder="New Password" 
      v-model="new_password" />

    <span class="text-danger text-sm">{{ errors.first('confirm_password') }}</span>
    <span class="text-danger text-sm" v-show="!isPasswordValid">The passwords must match.</span>
    <vs-input
      v-if="this.lang == 'de'"
      type="password"
      v-validate="'min:6'"
      data-vv-validate-on="blur"
      data-vv-as="password"
      name="confirm_password"
      icon-no-border
      icon="icon-lock"
      icon-pack="feather"
      label-placeholder="Kennwort bestätigen"
      placeholder="Kennwort bestätigen"
      v-model="confirm_password"
      class="w-full mt-6" />
    <vs-input
      v-if="this.lang == 'sp'"
      type="password"
      v-validate="'min:6'"
      data-vv-validate-on="blur"
      data-vv-as="password"
      name="confirm_password"
      icon-no-border
      icon="icon-lock"
      icon-pack="feather"
      label-placeholder="Confirmar contraseña"
      placeholder="Confirmar contraseña"
      v-model="confirm_password"
      class="w-full mt-6" />
    <vs-input
      v-if="this.lang != 'de' && this.lang != 'sp'"
      type="password"
      v-validate="'min:6'"
      data-vv-validate-on="blur"
      data-vv-as="password"
      name="confirm_password"
      icon-no-border
      icon="icon-lock"
      icon-pack="feather"
      label-placeholder="Confirm Password"
      placeholder="Confirm Password"
      v-model="confirm_password"
      class="w-full mt-6" />
      
    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button 
        v-if="this.lang == 'de'"
        class="ml-4 mt-2" 
        type="border" 
        color="warning"
        @click="reset"
        :disabled="!isDisabled">Zurücksetzen</vs-button>
      <vs-button 
        v-if="this.lang == 'sp'"
        class="ml-4 mt-2" 
        type="border" 
        color="warning"
        @click="reset"
        :disabled="!isDisabled">Reiniciar</vs-button>
      <vs-button 
        v-if="this.lang != 'de' && this.lang != 'sp'"
        class="ml-4 mt-2" 
        type="border" 
        color="warning"
        @click="reset"
        :disabled="!isDisabled">Reset</vs-button>
    </div>
  </vx-card>
</template>

<script>
export default {
  data () {
    return {
      old_password: '',
      new_password: '',
      confirm_password: ''
    }
  },
  computed: {
    lang() {
      this.graphComponent += 1
      return this.$i18n.locale
    },
    isDisabled () {
      return (this.old_password !== '' && this.new_password !== '' &&  this.old_password !== this.new_password &&  this.old_password !== this.confirm_password &&  this.new_password === this.confirm_password)
    },
    isPasswordValid () {
      return (this.new_password === this.confirm_password)
    },
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    reset () {
      const { old_password, new_password, confirm_password } = this
      this.$store.getters.getId.then(id => {      
        this.$store.dispatch('edit', { 
          oldpassword: old_password, 
          password: new_password,
          id: id
          }).then(() => {
          this.colorAlert = 'primary'
          if (this.lang == 'de'){
            this.$vs.dialog({
              color: this.colorAlert,
              title: `das Passwort wurde erfolgreich geändert`,
              accept: this.acceptAlert
            })
          }
          else if (this.lang == 'sp'){
            this.$vs.dialog({
              color: this.colorAlert,
              title: `Contraseña cambiada con éxito`,
              accept: this.acceptAlert
            })
          }
          else{
            this.$vs.dialog({
              color: this.colorAlert,
              title: `Password changed successfully`,
              accept: this.acceptAlert
            })
          }
        })
        .catch(e => {
          this.colorAlert = 'danger'
          if (this.lang == 'de'){
            this.$vs.dialog({
              color: this.colorAlert,
              title: `Passwort kann nicht geändert werden`,
              text: `Sie müssen die falschen Anmeldeinformationen angeben...`,
              accept: this.acceptAlert
            })
          }
          else if (this.lang == 'sp'){
            this.$vs.dialog({
              color: this.colorAlert,
              title: `No se puede cambiar la contraseña`,
              text: `Debe proporcionar las credenciales incorrectas...`,
              accept: this.acceptAlert
            })
          }
          else{
            this.$vs.dialog({
              color: this.colorAlert,
              title: `Unable to change password`,
              text: `You must be providing the wrong credentials...`,
              accept: this.acceptAlert
            })
          }
        })
      })
    }
  }
}
</script>
