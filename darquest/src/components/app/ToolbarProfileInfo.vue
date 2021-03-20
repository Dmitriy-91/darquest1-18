<template>
  <q-btn-dropdown
      push
      glossy
      icon="account_circle"
      :label="userName"
  >
    <div>
      Profile
    </div>
  </q-btn-dropdown>
</template>

<script>
export default {
  name: 'ToolbarProfileInfo',
  data () {
    return {
    }
  },
  computed: {
    userIsLogin () {
      return true
    },
    userName () {
      return 'user name'
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
