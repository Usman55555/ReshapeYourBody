<template>
  <div>
    <vs-tabs 
      v-if="this.lang == 'de'" 
      :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">

      <!-- IMAGE -->
      <vs-tab icon-pack="feather" icon="icon-image" :label="!isSmallerScreen ? 'Bild' : ''">
        <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-image/>
        </div>
      </vs-tab>
      <!-- GENERAL -->
      <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'Allgemeines' : ''">
        <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-general :user="user"/>
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-info" :label="!isSmallerScreen ? 'Adresse' : ''">
        <div class="tab-info md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-info />
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'Ändere das Passwort' : ''">
        <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-change-password />
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-mail" :label="!isSmallerScreen ? 'Ändern Sie die E-Mail' : ''">
        <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-change-email />
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-user-minus" :label="!isSmallerScreen ? 'Konto löschen' : ''">
        <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-delete />
        </div>
      </vs-tab>
    </vs-tabs>

    <vs-tabs 
      v-if="this.lang == 'sp'" 
      :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">

      <!-- IMAGE -->
      <vs-tab icon-pack="feather" icon="icon-image" :label="!isSmallerScreen ? 'Imagen' : ''">
        <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-image/>
        </div>
      </vs-tab>
      <!-- GENERAL -->
      <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'General' : ''">
        <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-general :user="user"/>
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-info" :label="!isSmallerScreen ? 'Datos del Domicilio' : ''">
        <div class="tab-info md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-info />
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'Cambia la contraseña' : ''">
        <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-change-password />
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-mail" :label="!isSmallerScreen ? 'Cambiar e-mail' : ''">
        <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-change-email />
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-user-minus" :label="!isSmallerScreen ? 'Borrar cuenta' : ''">
        <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-delete />
        </div>
      </vs-tab>
    </vs-tabs>

    <vs-tabs 
      v-if="this.lang != 'de' && this.lang != 'sp'" 
      :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">

      <!-- IMAGE -->
      <vs-tab icon-pack="feather" icon="icon-image" :label="!isSmallerScreen ? 'Image' : ''">
        <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-image/>
        </div>
      </vs-tab>
      <!-- GENERAL -->
      <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'General' : ''">
        <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-general :user="user"/>
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-info" :label="!isSmallerScreen ? 'Address Info' : ''">
        <div class="tab-info md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-info />
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'Change Password' : ''">
        <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-change-password />
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-mail" :label="!isSmallerScreen ? 'Change Email' : ''">
        <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-change-email />
        </div>
      </vs-tab>
      <vs-tab icon-pack="feather" icon="icon-user-minus" :label="!isSmallerScreen ? 'Delete Account' : ''">
        <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
          <user-settings-delete />
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import UserSettingsGeneral from './UserSettingsGeneral.vue'
import UserSettingsChangePassword from './UserSettingsChangePassword.vue'
import UserSettingsChangeEmail from './UserSettingsChangeEmail.vue'
import UserSettingsDelete from './UserSettingsDelete.vue'
import UserSettingsInfo from './UserSettingsInfo.vue'
import UserSettingsImage from './UserSettingsImage.vue'

export default {
  components: {
    UserSettingsGeneral,
    UserSettingsChangePassword,
    UserSettingsChangeEmail,
    UserSettingsDelete,
    UserSettingsInfo,
    UserSettingsImage
  },
  data () {
    return {
      user: null
    }
  },
  created() {
    // return new Promise((resolve, reject) => {
    //   this.$store.dispatch('me')
    //   .then(res => {
    //     this.user = res.data
    //     console.log(this.user)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     if (err.response.status === 404) {
    //       this.user_not_found = true
    //       return
    //     }
    //     console.error(err) 
    //   })
    // });
  },
  computed: {
    lang() {
      this.graphComponent += 1
      return this.$i18n.locale
    },
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    }
  }
}
</script>

<style lang="scss">
#profile-tabs {
  .vs-tabs--content {
    padding: 0;
  }
}
</style>
