<template>
  <q-btn-dropdown
      push
      glossy
      icon="account_circle"
      :label="userName"
  >
    <div>
      <q-card>
        <div class="row no-wrap q-px-md q-pt-md">
          <div class="column">
            <div class="text-h6 q-mb-md">{{ userName }}</div>
          </div>
        </div>
        <q-card-section class="q-gutter-md">
        </q-card-section>
        <q-card-actions>
          <q-btn
              class="full-width"
              push
              glossy
              icon="logout"
              :loading="loading"
              :label="$t('main.logout')"
              @click="logout"
          >
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-btn-dropdown>
</template>

<script>
import api from 'src/api'

export default {
  name: 'ToolbarProfileInfo',
  data () {
    return {
      errorMessage: null,
      loading: false,
      auth: api.auth
    }
  },
  computed: {
    userName () {
      return 'user name'
    }
  },
  methods: {
    logout () {
      this.errorMessage = null
      this.loading = true
      this.$store.dispatch('auth/logout')
      this.auth.logout()
        .then(() => {
          this.loading = false
          this.$router.push('/')
        })
        .catch(error => {
          this.loading = false
          this.hasError = true
          console.log('error.response')
          console.log(error.response)
          if (error.response.status === 422) {
            this.errorMessage = this.$t('validation.invalit_data_to_login', {
              attribute: this.$t('attributes.email')
            })
          } else {
            this.errorMessage = error.message
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
