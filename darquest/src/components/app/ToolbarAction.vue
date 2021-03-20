<template>
  <div>
    <toolbar-auth-button v-show="!userIsLogin"></toolbar-auth-button>
    <toolbar-profile-info v-show="userIsLogin"></toolbar-profile-info>
  </div>
</template>

<script>
import ToolbarAuthButton from './ToolbarAuthButton'
import ToolbarProfileInfo from './ToolbarProfileInfo'

export default {
  name: 'ToolbarAction',
  components: { ToolbarAuthButton, ToolbarProfileInfo },
  computed: {
    userIsLogin () {
      return true
    }
  }
}
</script>

<style scoped>

</style>
