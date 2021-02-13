<template>
  <div>
    <q-btn-dropdown
        push
        glossy
        icon="login"
        :label="$t('main.in_game')"
        @click="showLoginForm"
    >
      <div>
        <login></login>
      </div>
    </q-btn-dropdown>
  </div>
</template>

<script>
import Login from '../auth/Login'

export default {
  name: 'ToolbarProfileInfo',
  components: { Login }
}
</script>

<style scoped>

</style>
