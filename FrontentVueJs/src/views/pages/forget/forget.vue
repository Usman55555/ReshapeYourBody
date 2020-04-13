<template>
  <div class="h-screen flex w-full bg-img">
    <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">

            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img src="@/assets/images/pages/forgot-password.png" alt="login" class="mx-auto">
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">

                <div class="vx-card__title mb-8">
                    <h4 class="mb-4">Recover your password</h4>
                    <p>Please enter your email address and we'll send you the code that will be valid for 10 minutes.</p>
                </div>

                <div>
                  <span class="text-danger text-sm" v-show="isEmailValid()">Email must be valid.</span>
                  <br />
                  <vs-input
                      name="email"
                      icon-no-border
                      icon="icon icon-mail"
                      icon-pack="feather"
                      label-placeholder="Email"
                      v-model="email"
                      class="w-full mb-8"/>
                  
                  <br />
                  <vs-button type="border" to="/pages/login" class="px-4 w-full md:w-auto">Back To Login</vs-button>
                  <vs-button 
                    v-validate="'required|email'" 
                    placeholder="Your Email" 
                    name="email" 
                    @click.prevent="submitted"
                    :disabled="isDisabled()"
                    class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0"
                    >Recover Password</vs-button>
                  <!-- <vs-button 
                    v-validate="'required|email'" 
                    placeholder="Your Email" 
                    name="email" 
                    class="float-left" 
                    @click.prevent="submitted"
                    :disabled="isDisabled()">Request a confirmation email</vs-button> -->

                  <br />
                </div>

              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  methods: {
    isEmailValid () {
      // return ((this.email === '') ? '' : (this.reg.test(this.email))? false : true)
      return !((this.email === '') ? true : (this.reg.test(this.email)))
    },
    isDisabled () {
      return !(this.reg.test(this.email))
    },
    submitted () {
      const { email } = this
      console.log(this.email)
      this.$store.dispatch('forget', {email}).then(() => {
          this.$vs.notify({
            title: 'Warning',
            text: 'Check your email',
            color: 'warning',
            iconPack: 'feather',
            position: 'top-center',
            icon:'icon-email'
          })
          this.$router.push('/pages/confirm')
        })
        .catch(e => {
          this.colorAlert = 'danger'
          this.$vs.dialog({
            color: this.colorAlert,
            title: `Unable to send email`,
            text: `May be you the email address you entered is not registered...`,
            accept: this.acceptAlert
          })
        })
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
</style>
