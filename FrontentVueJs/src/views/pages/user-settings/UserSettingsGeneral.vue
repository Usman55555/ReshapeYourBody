<template>
  <vx-card no-shadow>

    <vs-input 
      v-if="this.lang == 'de'" 
      class="w-full mb-base" 
      label-placeholder="Vorname" 
      v-model="firstname"></vs-input>
    <vs-input 
      v-if="this.lang == 'sp'" 
      class="w-full mb-base" 
      label-placeholder="Nombre de pila" 
      v-model="firstname"></vs-input>
    <vs-input 
      v-if="this.lang != 'de' && this.lang != 'sp'" 
      class="w-full mb-base" 
      label-placeholder="First Name" 
      v-model="firstname"></vs-input>

    <vs-input
      v-if="this.lang == 'de'" 
      class="w-full mb-base" 
      label-placeholder="Nachname" 
      v-model="lastname"></vs-input>
    <vs-input
      v-if="this.lang == 'sp'" 
      class="w-full mb-base" 
      label-placeholder="Apellido" 
      v-model="lastname"></vs-input>
    <vs-input
      v-if="this.lang != 'de' && this.lang != 'sp'" 
      class="w-full mb-base" 
      label-placeholder="Last Name" 
      v-model="lastname"></vs-input>

    <!-- dob -->
    <div class="mt-8">
      <label 
        v-if="this.lang == 'de'" 
        class="text-sm">Geburtstag</label>
      <label 
        v-if="this.lang == 'sp'" 
        class="text-sm">Fecha de nacimiento Date</label>
      <label 
        v-if="this.lang != 'de' && this.lang != 'sp'" 
        class="text-sm">Birth Date</label>
      <flat-pickr v-model="dob" :config="{ dateFormat: 'd F Y' }" class="w-full" />
    </div>


    <!-- langs -->
    <div class="mt-8">
      <label 
        v-if="this.lang == 'de'" 
        class="text-sm">Sprachen (E-Mails werden an die erste gesendet)</label>
      <label 
        v-if="this.lang == 'sp'" 
        class="text-sm">Idiomas (Los correos electrónicos serán enviados al primero)</label>
      <label 
        v-if="this.lang != 'de' && this.lang != 'sp'" 
        class="text-sm">Languages (Emails will be sent to the first one)</label>
      <v-select v-model="langs" multiple :closeOnSelect="false" :options="langOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
    </div>

    <div
      v-if="this.lang == 'de'">
      <!-- phone Number -->
      <span class="text-danger text-sm">{{ errors.first('phone') }}</span><br />
      <span class="text-danger text-sm" v-show="isPhoneValid">Die Telefonnummer muss gültig sein.</span>
      <vs-input
        v-validate="'required'"
        data-vv-validate-on="blur"
        name="phone"
        type="phone"
        label-placeholder="Telefon"
        placeholder="Telefon (beginnend mit der Landesvorwahl)"
        v-model="phone"
        class="w-full mt-6" />
    </div>
    <div
      v-if="this.lang == 'sp'">
      <!-- phone Number -->
      <span class="text-danger text-sm">{{ errors.first('phone') }}</span><br />
      <span class="text-danger text-sm" v-show="isPhoneValid">El número de teléfono debe ser válido..</span>
      <vs-input
        v-validate="'required'"
        data-vv-validate-on="blur"
        name="phone"
        type="phone"
        label-placeholder="Teléfono"
        placeholder="Teléfono (a partir del código del país)"
        v-model="phone"
        class="w-full mt-6" />
    </div>
    <div
      v-if="this.lang != 'de' && this.lang != 'sp'">
      <!-- phone Number -->
      <span class="text-danger text-sm">{{ errors.first('phone') }}</span><br />
      <span class="text-danger text-sm" v-show="isPhoneValid">The phone number must be valid.</span>
      <vs-input
        v-validate="'required'"
        data-vv-validate-on="blur"
        name="phone"
        type="phone"
        label-placeholder="Phone"
        placeholder="Phone (Starting with the country code)"
        v-model="phone"
        class="w-full mt-6" />
    </div>

    <br />
    <!-- Save & Reset Button -->
    <div
      v-if="this.lang == 'de'"
      class="flex flex-wrap items-center justify-end">
      <vs-button 
        @click="registerUser" 
        :disabled="!isDisabled"
        class="ml-auto mt-2"
        >Änderungen speichern</vs-button>
    </div>
    <div
      v-if="this.lang == 'sp'"
      class="flex flex-wrap items-center justify-end">
      <vs-button 
        @click="registerUser" 
        :disabled="!isDisabled"
        class="ml-auto mt-2"
        >Guardar cambios</vs-button>
    </div>
    <div
      v-if="this.lang != 'de' && this.lang != 'sp'"
      class="flex flex-wrap items-center justify-end">
      <vs-button 
        @click="registerUser" 
        :disabled="!isDisabled"
        class="ml-auto mt-2"
        >Save Changes</vs-button>
    </div>
  </vx-card>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import vSelect from 'vue-select'
import phone from 'phone'
import axios from 'axios';

export default {
  components: {
    flatPickr,
    vSelect
  },
  props: ['user'],
  data () {
    return {
      birthdate: null,
      languages: [],
      firstname: this.$store.state.firstname,
      lastname: this.$store.state.lastname,
      dob: null,
      langs: [],
      phone: '',

      langOptions: [
        { label: 'English',  value: 'english'  },
        { label: 'Spanish',   value: 'spanish'   },
        { label: 'German',   value: 'german'   },
      ]
    }
  },
  computed: {
    lang() {
      this.graphComponent += 1
      return this.$i18n.locale
    },
    isDisabled () {
      return this.dob !== null && this.langs.length > 0 && this.phone !== '' && !this.isPhoneValid
    },
    isPhoneValid () {
      if (phone(this.phone).length > 0) {
        this.validphone = phone(this.phone)[0]
        return false
      }
      else if (this.phone === '') {
        return false
      }
      else {
        return true
      }
    }
  },
  methods: {
    registerUser () {
      const { firstname, lastname, dob, langs, phone } = this
      if (dob !== ''){
        this.birthdate = new Date(dob).toISOString()
      }
      for (let i in this.langs){
        this.languages.push(this.langs[i].label)
      }
      var obj = {}
      if (firstname !== ""){
        obj.firstname = firstname
      }
      if (lastname !== ""){
        obj.lastname = lastname
      }
      if (phone !== ""){
        obj.phone = phone
      }
      const { birthdate, languages } = this
      if (birthdate !== ""){
        obj.birthdate = birthdate
      }
      if (languages.length > 0){
        obj.languages = languages
      }
      this.$store.getters.getId.then(id => { 
        obj.id = id     
        this.$store.dispatch('edit', obj).then(() => {
          if (this.lang == 'de'){
            this.$vs.notify({
              title: 'Erfolg',
              text: 'Ihr Profil wurde erfolgreich aktualisiert',
              color: 'primary',
              iconPack: 'feather',
              position: 'top-center',
              icon:'icon-check'
            })
          }
          else if (this.lang == 'sp'){
            this.$vs.notify({
              title: 'Éxito',
              text: 'Tu perfil se actualizó correctamente',
              color: 'primary',
              iconPack: 'feather',
              position: 'top-center',
              icon:'icon-check'
            })
          }
          else{
            this.$vs.notify({
              title: 'Success',
              text: 'Your profile updated successfully',
              color: 'primary',
              iconPack: 'feather',
              position: 'top-center',
              icon:'icon-check'
            })
          }
        })
        .catch(e => {
          this.colorAlert = 'danger'
          if (this.lang == 'de'){
            this.$vs.dialog({
              color: this.colorAlert,
              title: `Etwas ist schief gelaufen`,
              text: `Ihr Profil konnte nicht aktualisiert werden...`,
              accept: this.acceptAlert
            })
          }
          else if (this.lang == 'sp'){
            this.$vs.dialog({
              color: this.colorAlert,
              title: `Algo salió mal`,
              text: `No se pudo actualizar tu perfil...`,
              accept: this.acceptAlert
            })
          }
          else{
            this.$vs.dialog({
              color: this.colorAlert,
              title: `Some thing went wrong`,
              text: `Couldn't update your profile...`,
              accept: this.acceptAlert
            })
          }
        })
      })
    }
  }
}
</script>
