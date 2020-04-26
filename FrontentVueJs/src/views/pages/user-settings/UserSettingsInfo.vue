<template>
  <vx-card no-shadow>

    <vs-input
      v-if="this.lang == 'de'" 
      data-vv-validate-on="blur"
      name="address1"
      type="address1"
      label-placeholder="Adresse 1"
      placeholder="Adresse 1"
      v-model="address1"
      class="w-full mt-6" />
    <vs-input
      v-if="this.lang == 'sp'" 
      data-vv-validate-on="blur"
      name="address1"
      type="address1"
      label-placeholder="Habla a 1"
      placeholder="Habla a 1"
      v-model="address1"
      class="w-full mt-6" />
    <vs-input
      v-if="this.lang != 'de' && this.lang != 'sp'" 
      data-vv-validate-on="blur"
      name="address1"
      type="address1"
      label-placeholder="Address 1"
      placeholder="Address 1"
      v-model="address1"
      class="w-full mt-6" />

    <vs-input
      v-if="this.lang == 'de'" 
      data-vv-validate-on="blur"
      name="address2"
      type="address2"
      label-placeholder="Adresse 2"
      placeholder="Adresse 2"
      v-model="address2"
      class="w-full mt-6" />
    <vs-input
      v-if="this.lang == 'sp'" 
      data-vv-validate-on="blur"
      name="address2"
      type="address2"
      label-placeholder="Habla a 2"
      placeholder="Habla a 2"
      v-model="address2"
      class="w-full mt-6" />
    <vs-input
      v-if="this.lang != 'de' && this.lang != 'sp'" 
      data-vv-validate-on="blur"
      name="address2"
      type="address2"
      label-placeholder="Address 2"
      placeholder="Address 2"
      v-model="address2"
      class="w-full mt-6" />

    <vs-input
      v-if="this.lang == 'de'" 
      data-vv-validate-on="blur"
      name="postal"
      type="postal"
      label-placeholder="Post"
      placeholder="Post"
      v-model="postal"
      class="w-full mt-6" />
    <vs-input
      v-if="this.lang == 'sp'" 
      data-vv-validate-on="blur"
      name="postal"
      type="postal"
      label-placeholder="Postal"
      placeholder="Postal"
      v-model="postal"
      class="w-full mt-6" />
    <vs-input
      v-if="this.lang != 'de' && this.lang != 'sp'" 
      data-vv-validate-on="blur"
      name="postal"
      type="postal"
      label-placeholder="Postal"
      placeholder="Postal"
      v-model="postal"
      class="w-full mt-6" />

    <!-- City -->
    <vs-input
      v-if="this.lang == 'de'" 
      data-vv-validate-on="blur"
      name="city"
      type="city"
      label-placeholder="Stadt"
      placeholder="Stadt"
      v-model="postal"
      class="w-full mt-6" />
    <vs-input
      v-if="this.lang == 'sp'" 
      data-vv-validate-on="blur"
      name="city"
      type="city"
      label-placeholder="Ciudad"
      placeholder="Ciudad"
      v-model="city"
      class="w-full mt-6" />
    <vs-input
      v-if="this.lang != 'de' && this.lang != 'sp'" 
      data-vv-validate-on="blur"
      name="city"
      type="city"
      label-placeholder="City"
      placeholder="City"
      v-model="city"
      class="w-full mt-6" />

    <!-- Country -->
    <div class="mt-8">
      <label 
        v-if="this.lang == 'de'" 
        class="text-sm">Land</label>
      <label 
        v-if="this.lang == 'sp'" 
        class="text-sm">País</label>
      <label 
        v-if="this.lang != 'de' && this.lang != 'sp'" 
        class="text-sm">Country</label>
      <v-select v-model="country1" :options="countryOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
    </div>

    <!-- Website  -->
    <!-- <vs-input class="w-full mt-8" label-placeholder="Website" v-model="website" /> -->

    <br />
    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button 
        v-if="this.lang == 'de'"
        @click="update" 
        :disabled="!isDisabled"
        class="ml-auto mt-2">Änderungen speichern</vs-button>
      <vs-button 
        v-if="this.lang == 'sp'"
        @click="update" 
        :disabled="!isDisabled"
        class="ml-auto mt-2">Guardar cambios</vs-button>
      <vs-button 
        v-if="this.lang != 'de' && this.lang != 'sp'"
        @click="update" 
        :disabled="!isDisabled"
        class="ml-auto mt-2">Save Changes</vs-button>
    </div>
  </vx-card>
</template>

<script>
import vSelect from 'vue-select'
var jsonData = require('./countries_json.json');

export default {
  components: {
    vSelect
  },
  data () {
    return {
      address1: '',
      address2: '',
      country1: '',
      country: '',
      city: '',
      postal: '',
      countryOptions: jsonData
    }
  },
  computed: {
    lang() {
      this.graphComponent += 1
      return this.$i18n.locale
    },
    isDisabled () {
      return this.country !== '' ||  this.address1 !== '' ||  this.address2 !== '' ||  this.city !== '' ||  this.postal !== ''
    },
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    update () {
      const { country, address1, address2, city, postal } = this
      var obj = {}
      if (country !== ""){
        obj.country = country
      }
      if (address1 !== ""){
        obj.address1 = address1
      }
      if (address2 !== ""){
        obj.address2 = address2
      }
      if (city !== ""){
        obj.city = city
      }
      if (postal !== ""){
        obj.postal = postal
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
