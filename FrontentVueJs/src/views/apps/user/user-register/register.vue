<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-edit-tab-info">


    <!-- Content Row -->
    <div v-if="this.lang == 'sp'"  class="vx-row">
      <div class="vx-col md:w-1/2 w-full">

          <span class="text-danger text-sm">{{ errors.first('email') }}</span>
            <!-- <label class="vs-input--label">Email</label> -->
          <vs-input 
            data-vv-validate-on="blur"
            v-validate="'required|email'" 
            name="email"
            class="w-full mb-base" 
            label-placeholder="Correo electrónico"
            placeholder="Correo electrónico"
            v-model="email" />

        <span class="text-danger text-sm"  v-show="errors.has('firstname')">{{ errors.first('firstname') }}</span>
       <vs-input 
            data-vv-validate-on="blur"
            label-placeholder="Primer nombre"
            placeholder="Primer nombre"
            class="w-full mt-4" label="First Name" v-model="firstname" v-validate="'required|alpha_spaces'" name="firstname" />
        
        <span class="text-danger text-sm"  v-show="errors.has('lastname')">{{ errors.first('lastname') }}</span>
        <vs-input 
            data-vv-validate-on="blur"
            label-placeholder="Apellido"
            placeholder="Apellido"
            class="w-full mt-4" label="Last Name" v-model="lastname" v-validate="'required|alpha_spaces'" name="lastname" />
        

        <br />
        <!-- <label class="text-sm">Role</label> -->
        <span class="text-danger text-sm" v-show="isEmpty">El rol del usuario debe estar definido.</span>
        <v-select 
            label-placeholder="Papel"
            placeholder="Papel"
            v-model="role" :options="roleOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                
                <!-- langs -->
        <span class="text-danger text-sm" v-show="isLang">Seleccione por favor un idioma.</span>
        <div class="mt-8">
          <!-- <label class="text-sm">Languages</label> -->
          <v-select 
            label-placeholder="Idiomas"
            placeholder="Idiomas"
            v-model="languages" :closeOnSelect="true" :options="langOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
        </div>

        <div class="mt-8">
          <!-- <label class="text-sm">Birth Date</label> -->
            <flat-pickr 
            label-placeholder="Fecha de nacimiento"
            placeholder="Fecha de nacimiento"
            v-model="dob" :config="{ dateFormat: 'd F Y' }" class="w-full" />
        </div>

      </div>

      <div class="vx-col md:w-1/2 w-full">
        
            <div class="mt-4">

            </div>
            <!-- phone Number -->
            <span class="text-danger text-sm" v-show="isPhoneValid">El número de teléfono debe ser válido.</span>
            <vs-input
            data-vv-validate-on="blur"
            name="phone"
            type="phone"
            label-placeholder="Teléfono"
            placeholder="Teléfono (a partir del código del país)"
            v-model="phone"
            class="w-full mt-6" />

            
            <br />
            <vs-input 
            label-placeholder="Habla a 1"
            placeholder="Habla a 1"
            class="w-full mt-4" v-model="address1" name="Address1" />
            <!-- <span class="text-danger text-sm"  v-show="errors.has('city')">{{ errors.first('city') }}</span> -->

            <vs-input 
            label-placeholder="Habla a 2"
            placeholder="Habla a 2"
            class="w-full mt-4" v-model="address2"  name="Address2" />
            <!-- <span class="text-danger text-sm"  v-show="errors.has('postal')">{{ errors.first('postal') }}</span> -->

        <!-- City -->
        <div class="mt-8">
        <!-- <label class="text-sm">City</label> -->

            <vs-input
            data-vv-validate-on="blur"
            name="city"
            type="city"
            label-placeholder="Ciudad"
            placeholder="Ciudad"
            v-model="city"
            class="w-full mt-6" />

        </div>
        
        <!-- Country -->
        <div class="mt-8">
        <!-- <label class="text-sm">Country</label> -->
        <v-select 
            label-placeholder="País"
            placeholder="País"
        v-model="country1" :options="countryOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
        
        </div>

        <div class="mt-8">
            <vs-input
            data-vv-validate-on="blur"
            name="postal"
            type="postal"
            label-placeholder="Postal"
            placeholder="Postal"
            v-model="postal"
            class="w-full mt-6" />
        </div>

      </div>
    </div>

        <!-- Content Row -->
    <div v-if="this.lang == 'de'"  class="vx-row">
      <div class="vx-col md:w-1/2 w-full">

          <span class="text-danger text-sm">{{ errors.first('email') }}</span>
            <!-- <label class="vs-input--label">Email</label> -->
          <vs-input 
            data-vv-validate-on="blur"
            v-validate="'required|email'" 
            name="email"
            class="w-full mb-base" 
            label-placeholder="Email"
            placeholder="Email"
            v-model="email" />

        <span class="text-danger text-sm"  v-show="errors.has('firstname')">{{ errors.first('firstname') }}</span>
       <vs-input 
            data-vv-validate-on="blur"
            label-placeholder="Vorname"
            placeholder="Vorname"
            class="w-full mt-4" label="First Name" v-model="firstname" v-validate="'required|alpha_spaces'" name="firstname" />
        
        <span class="text-danger text-sm"  v-show="errors.has('lastname')">{{ errors.first('lastname') }}</span>
        <vs-input 
            data-vv-validate-on="blur"
            label-placeholder="Nachname"
            placeholder="Nachname"
            class="w-full mt-4" label="Last Name" v-model="lastname" v-validate="'required|alpha_spaces'" name="lastname" />
        

        <br />
        <!-- <label class="text-sm">Role</label> -->
        <span class="text-danger text-sm" v-show="isEmpty">Die Benutzerrolle muss definiert sein.</span>
        <v-select 
            label-placeholder="Rolle"
            placeholder="Rolle"
            v-model="role" :options="roleOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                
                <!-- langs -->
        <span class="text-danger text-sm" v-show="isLang">Bitte wählen Sie mindestens eine Sprache aus.</span>
        <div class="mt-8">
          <!-- <label class="text-sm">Languages</label> -->
          <v-select 
            label-placeholder="Sprachen"
            placeholder="Sprachen"
            v-model="languages" :closeOnSelect="true" :options="langOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
        </div>

        <div class="mt-8">
          <!-- <label class="text-sm">Birth Date</label> -->
            <flat-pickr 
            label-placeholder="Geburtstag"
            placeholder="Geburtstag"
            v-model="dob" :config="{ dateFormat: 'd F Y' }" class="w-full" />
        </div>

      </div>

      <div class="vx-col md:w-1/2 w-full">
        
            <div class="mt-4">

            </div>
            <!-- phone Number -->
            <span class="text-danger text-sm" v-show="isPhoneValid">Die Telefonnummer muss gültig sein.</span>
            <vs-input
            data-vv-validate-on="blur"
            name="phone"
            type="phone"
            label-placeholder="Telefon"
            placeholder="Telefon (beginnend mit der Landesvorwahl)"
            v-model="phone"
            class="w-full mt-6" />

            
            <br />
            <vs-input 
            label-placeholder="Adresse 1"
            placeholder="Adresse 1"
            class="w-full mt-4" v-model="address1" name="Address1" />
            <!-- <span class="text-danger text-sm"  v-show="errors.has('city')">{{ errors.first('city') }}</span> -->

            <vs-input 
            label-placeholder="Adresse 2"
            placeholder="Adresse 2"
            class="w-full mt-4" v-model="address2"  name="Address2" />
            <!-- <span class="text-danger text-sm"  v-show="errors.has('postal')">{{ errors.first('postal') }}</span> -->

        <!-- City -->
        <div class="mt-8">
        <!-- <label class="text-sm">City</label> -->

            <vs-input
            data-vv-validate-on="blur"
            name="city"
            type="city"
            label-placeholder="Stadt"
            placeholder="Stadt"
            v-model="city"
            class="w-full mt-6" />

        </div>

        <!-- Country -->
        <div class="mt-8">
        <!-- <label class="text-sm">Country</label> -->
        <v-select 
            label-placeholder="Land"
            placeholder="Land"
        v-model="country1" :options="countryOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
        
        </div>

        <div class="mt-8">
            <vs-input
            data-vv-validate-on="blur"
            name="postal"
            type="postal"
            label-placeholder="Post"
            placeholder="Post"
            v-model="postal"
            class="w-full mt-6" />
        </div>

      </div>
    </div>


        <!-- Content Row -->
    <div v-if="this.lang != 'de' && this.lang != 'sp'"  class="vx-row">
      <div class="vx-col md:w-1/2 w-full">

          <span class="text-danger text-sm">{{ errors.first('email') }}</span>
            <!-- <label class="vs-input--label">Email</label> -->
          <vs-input 
            data-vv-validate-on="blur"
            v-validate="'required|email'" 
            name="email"
            class="w-full mb-base" 
            label-placeholder="Email"
            placeholder="Email"
            v-model="email" />

        <span class="text-danger text-sm"  v-show="errors.has('firstname')">{{ errors.first('firstname') }}</span>
       <vs-input 
            data-vv-validate-on="blur"
            label-placeholder="Firstname"
            placeholder="Firstname"
            class="w-full mt-4" label="First Name" v-model="firstname" v-validate="'required|alpha_spaces'" name="firstname" />
        
        <span class="text-danger text-sm"  v-show="errors.has('lastname')">{{ errors.first('lastname') }}</span>
        <vs-input 
            data-vv-validate-on="blur"
            label-placeholder="Lastname"
            placeholder="Lastname"
            class="w-full mt-4" label="Last Name" v-model="lastname" v-validate="'required|alpha_spaces'" name="lastname" />
        

        <br />
        <!-- <label class="text-sm">Role</label> -->
        <span class="text-danger text-sm" v-show="isEmpty">The user role must be defined.</span>
        <v-select 
            label-placeholder="Role"
            placeholder="Role"
            v-model="role" :options="roleOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                
                <!-- langs -->
        <span class="text-danger text-sm" v-show="isLang">Please select atlease one language.</span>
        <div class="mt-8">
          <!-- <label class="text-sm">Languages</label> -->
          <v-select 
            label-placeholder="Languages"
            placeholder="Languages"
            v-model="languages" :closeOnSelect="true" :options="langOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
            <!-- v-model="languages" multiple :closeOnSelect="false" :options="langOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" /> -->
        </div>

        <div class="mt-8">
          <!-- <label class="text-sm">Birth Date</label> -->
            <flat-pickr 
            label-placeholder="Birth Date"
            placeholder="Birth Date"
            v-model="dob" :config="{ dateFormat: 'd F Y' }" class="w-full" />
        </div>

      </div>

      <div class="vx-col md:w-1/2 w-full">
        
            <div class="mt-4">

            </div>
            <!-- phone Number -->
            <span class="text-danger text-sm" v-show="isPhoneValid">The phone number must be valid.</span>
            <vs-input
            data-vv-validate-on="blur"
            name="phone"
            type="phone"
            label-placeholder="Phone"
            placeholder="Phone (Starting with the country code)"
            v-model="phone"
            class="w-full mt-6" />

            
            <br />
            <vs-input 
            label-placeholder="Address1"
            placeholder="Address1"
            class="w-full mt-4" v-model="address1" name="Address1" />
            <!-- <span class="text-danger text-sm"  v-show="errors.has('city')">{{ errors.first('city') }}</span> -->

            <vs-input 
            label-placeholder="Address2"
            placeholder="Address2"
            class="w-full mt-4" v-model="address2"  name="Address2" />
            <!-- <span class="text-danger text-sm"  v-show="errors.has('postal')">{{ errors.first('postal') }}</span> -->

        <!-- City -->
        <div class="mt-8">
        <!-- <label class="text-sm">City</label> -->
            
            <vs-input
            data-vv-validate-on="blur"
            name="city"
            type="city"
            label-placeholder="City"
            placeholder="City"
            v-model="city"
            class="w-full mt-6" />

        </div>

        <!-- Country -->
        <div class="mt-8">
        <!-- <label class="text-sm">Country</label> -->
        <v-select 
            label-placeholder="Country"
            placeholder="Country"
        v-model="country1" :options="countryOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
        
        </div>

        <div class="mt-8">
            <vs-input
            data-vv-validate-on="blur"
            name="postal"
            type="postal"
            label-placeholder="Postal"
            placeholder="Postal"
            v-model="postal"
            class="w-full mt-6" />
        </div>

      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div v-if="this.lang == 'sp'"  class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button 
            class="ml-auto mt-2" 
            @click="save_changes" 
            :disabled="validateForm">Guardar cambios</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reiniciar</vs-button>
        </div>

        <div v-if="this.lang == 'de'"  class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button 
            class="ml-auto mt-2" 
            @click="save_changes" 
            :disabled="validateForm">Änderungen speichern</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Zurücksetzen</vs-button>
        </div>

        <div v-if="this.lang != 'de' && this.lang != 'sp'"  class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button 
            class="ml-auto mt-2" 
            @click="save_changes" 
            :disabled="validateForm">Save Changes</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reset</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import axios from 'axios';
import phone from 'phone'
import Datepicker from 'vuejs-datepicker'
import { en, he } from 'vuejs-datepicker/src/locale'
var jsonData = require('../../../pages/user-settings/countries_json.json');

export default {
  components: {
    vSelect,
    flatPickr
  },
  data () {
    return {
        role: '',
      dob: null,
      languages: [],
      
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      validphone: '',
      password: '',
      confirm_password: '',
      address1: '',
      address2: '',
      country1: '',
      country: '',
      city: '',
      postal: '',
      countryOptions: jsonData,

      roleOptions: [
        { label: 'Admin',  value: 'admin' },
        { label: 'User',  value: 'user' },
        { label: 'Customer',  value: 'customer' },
        { label: 'Partner',  value: 'partner' },
        ],

      langOptions: [
        { label: 'English',  value: 'english'  },
        { label: 'Spanish',   value: 'spanish'   },
        { label: 'German',   value: 'german'   },
      ]}
  },
  computed: {
    lang() {
      return this.$i18n.locale
    },
    isLang () {
        return this.languages.length <= 0
    },
    isEmpty () {
        return this.role === ''
    },
    validateForm () {
        var a = false
        if (this.phone !== '') {
            a = this.isPhoneValid
        }
      return this.errors.any() || this.firstname === '' || this.lastname === '' || this.role === null || this.role.value === '' || this.role === '' || this.languages.length < 1  || this.email === '' || a
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
    reset_data () {
        this.role = [
        ],
      this.dob = null,
      this.languages = [],
      
      this.firstname = '',
      this.lastname = '',
      this.email = '',
      this.phone = '',
      this.validphone = '',
      this.password = '',
      this.confirm_password = '',
      this.address1 = '',
      this.address2 = '',
      this.country1 = '',
      this.country = '',
      this.city = '',
      this.postal = ''
    },
    capitalize (str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1, str.length)
    },
    save_changes () {

        // const payload = {
        //     firstname: this.firstname,
        //     lastname: this.lastname,
        //     email: this.email,
        //     password: this.password,
        //     phone: this.validphone,
        //     languages: this.languages,
        //     address1: this.address1,
        //     address2: this.address2,
        //     city: this.city,
        //     country: this.country,
        //     postal: this.postal,
        //     usertype: this.role
        //   }
        var langs = []
        for (let i in this.languages){
            langs.push(this.languages[i].label)
        }
        var birthdate = ''
        if (this.dob !== '' || this.dob !== null || this.dob !== undefined){
          birthdate = new Date(this.dob).toISOString()
        }
        if (this.lang == 'de'){
          this.$vs.notify({
            title: 'Warten Sie mal',
            text: 'Bitte warten Sie, während wir die E-Mail senden.',
            color: 'primary',
            iconPack: 'feather',
            position: 'top-center',
            icon:'icon-check'
          })
        }
        else if (this.lang == 'sp'){
          this.$vs.notify({
            title: 'por favor espera',
            text: 'Por favor espere mientras enviamos el correo electrónico.',
            color: 'primary',
            iconPack: 'feather',
            position: 'top-center',
            icon:'icon-check'
          })
        }
        else{
          this.$vs.notify({
            title: 'Please wait...',
            text: 'Please wait while we send the email.',
            color: 'primary',
            iconPack: 'feather',
            position: 'top-center',
            icon:'icon-check'
          })
        }
        if (this.validphone !== ''){          
            axios.post('/user/adminRegister',
                {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    phone: this.validphone,
                    languages: langs,
                    address1: this.address1,
                    address2: this.address2,
                    city: this.city,
                    country: this.country,
                    postal: this.postal,
                    usertype: this.role.value == null ? 'user' : this.role.value,
                    birthdate: birthdate
                }
                ).then(() => {
                  this.colorAlert = 'primary'
                  if (this.lang == 'de'){
                    this.$vs.dialog({
                        color: this.colorAlert,
                        title: `Sie haben den Benutzer registriert.`,
                        text: `Die Bestätigungs-E-Mail wurde gesendet.`,
                        accept: this.acceptAlert
                    })
                  }
                  else if (this.lang == 'sp'){
                    this.$vs.dialog({
                        color: this.colorAlert,
                        title: `Has registrado al usuario.`,
                        text: `El correo electrónico de confirmación ha sido enviado.`,
                        accept: this.acceptAlert
                    })
                  }
                  else{
                    this.$vs.dialog({
                        color: this.colorAlert,
                        title: `You have registered the user.`,
                        text: `The confirmation email has been sent.`,
                        accept: this.acceptAlert
                    })
                  }
                })
                .catch(e => {
                  console.log(e)
                  this.colorAlert = 'danger'
                  if (this.lang == 'de'){
                    this.$vs.dialog({
                      color: this.colorAlert,
                      title: `Registrierung nicht möglich`,
                      text: `Möglicherweise befindet sich der Benutzer bereits in der Datenbank...`,
                      accept: this.acceptAlert
                    })
                  }
                  else if (this.lang == 'sp'){
                    this.$vs.dialog({
                      color: this.colorAlert,
                      title: `Incapaz de registrarse`,
                      text: `Quizás el usuario ya está en la base de datos...`,
                      accept: this.acceptAlert
                    })
                  }
                  else{
                    this.$vs.dialog({
                      color: this.colorAlert,
                      title: `Unable to register`,
                      text: `Maybe the user is already in the database...`,
                      accept: this.acceptAlert
                    })
                  }
            })
        }
        else{          
            axios.post('/user/adminRegister',
                {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    languages: langs,
                    address1: this.address1,
                    address2: this.address2,
                    city: this.city,
                    country: this.country,
                    postal: this.postal,
                    usertype: this.role.value == null ? 'user' : this.role.value,
                    birthdate: birthdate
                }
                ).then(() => {
                  this.colorAlert = 'primary'
                  if (this.lang == 'de'){
                    this.$vs.dialog({
                        color: this.colorAlert,
                        title: `Sie haben den Benutzer registriert.`,
                        text: `Die Bestätigungs-E-Mail wurde gesendet.`,
                        accept: this.acceptAlert
                    })
                  }
                  else if (this.lang == 'sp'){
                    this.$vs.dialog({
                        color: this.colorAlert,
                        title: `Has registrado al usuario.`,
                        text: `El correo electrónico de confirmación ha sido enviado.`,
                        accept: this.acceptAlert
                    })
                  }
                  else{
                    this.$vs.dialog({
                        color: this.colorAlert,
                        title: `You have registered the user.`,
                        text: `The confirmation email has been sent.`,
                        accept: this.acceptAlert
                    })
                  }
                })
                .catch(e => {
                  console.log(e)
                  this.colorAlert = 'danger'
                  if (this.lang == 'de'){
                    this.$vs.dialog({
                      color: this.colorAlert,
                      title: `Registrierung nicht möglich`,
                      text: `Möglicherweise befindet sich der Benutzer bereits in der Datenbank...`,
                      accept: this.acceptAlert
                    })
                  }
                  else if (this.lang == 'sp'){
                    this.$vs.dialog({
                      color: this.colorAlert,
                      title: `Incapaz de registrarse`,
                      text: `Quizás el usuario ya está en la base de datos...`,
                      accept: this.acceptAlert
                    })
                  }
                  else{
                    this.$vs.dialog({
                      color: this.colorAlert,
                      title: `Unable to register`,
                      text: `Maybe the user is already in the database...`,
                      accept: this.acceptAlert
                    })
                  }
            })
        }
    },
    update_avatar () {
      // You can update avatar Here
      // For reference you can check dataList example
      // We haven't integrated it here, because data isn't saved in DB
    }
  }
}
</script>
