<template>
  <div>
    <q-btn-dropdown
        push
        glossy
        icon="login"
        :label="$t('main.in_game')"
    >
      <div>
        <q-tabs v-model="tabs">
          <q-tab name="login" :label="$t('main.sign_in')"></q-tab>
          <q-tab name="register" :label="$t('main.sign_up')"></q-tab>
        </q-tabs>

        <q-separator></q-separator>

        <q-tab-panels v-model="tabs">
          <q-tab-panel name="login">
            <login v-show="!forgotPassword"
                   @forgot-password="switchLoginForgotPassword"
            ></login>
            <forgotPassword
                v-show="forgotPassword"
                @back-to-login="switchLoginForgotPassword"
            ></forgotPassword>
          </q-tab-panel>
          <q-tab-panel name="register">
            <register></register>
          </q-tab-panel>
        </q-tab-panels>

      </div>
    </q-btn-dropdown>
  </div>
</template>

<script>
import Login from 'components/auth/Login'
import Register from 'components/auth/Register'
import ForgotPassword from 'components/auth/ForgotPassword'

export default {
  name: 'ToolbarProfileInfo',
  components: { Register, Login, ForgotPassword },
  data () {
    return {
      tabs: 'login',
      forgotPassword: false
    }
  },
  methods: {
    switchLoginForgotPassword () {
      this.forgotPassword = !this.forgotPassword
    }
  }
}
</script>

<style scoped>

</style>
