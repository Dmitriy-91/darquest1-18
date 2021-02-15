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
            <login></login>
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
import Login from '../auth/Login'
import Register from 'components/auth/Register'

export default {
  name: 'ToolbarProfileInfo',
  components: { Register, Login },
  data () {
    return {
      tabs: 'login'
    }
  }
}
</script>

<style scoped>

</style>
