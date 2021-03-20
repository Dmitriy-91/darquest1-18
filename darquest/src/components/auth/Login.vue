<template>
  <div style="min-width: 300px">
    <q-card>
      <div class="row no-wrap q-px-md q-pt-md">
        <div class="column">
          <div class="text-h6 q-mb-md">{{ $t('main.sign_in') }}</div>
        </div>
      </div>
      <q-card-section class="q-gutter-md"
        @keyup.enter="loginUser"
      >
        <q-input
            rounded
            standout
            v-model.trim="email"
            :label="$t('attributes.email')"
            :rules="emailRules"
            @input="$v.email.$touch()"
        />
        <q-input
            rounded
            standout
            type="password"
            v-model.trim="password"
            :label="$t('attributes.password')"
            :rules="passwordRules"
            @input="$v.password.$touch()"
        />
        <q-checkbox
            left-label
            v-model="remember"
            :label="$t('attributes.rememberMe')"
        />

        <br>
        <span class="text-warning" v-show="hasError">{{ errorMessage }}</span>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
            type="a"
            text-color="primary"
            :label="$t('main.reset_password')"
            @click="forgotPassword"
        />
        <q-btn
            class="full-width"
            push
            glossy
            icon="login"
            :label="$t('main.in_game')"
            :loading="loading"
            @click="loginUser"
        >
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { user as userSettings } from '../../setttings'
import api from 'src/api/index'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      remember: false,
      errorMessage: '',
      hasError: false,
      loading: false,
      auth: api.auth
    }
  },
  computed: {
    emailRules () {
      return [
        () => {
          this.$v.email.required ||
          this.$t('validation.required', {
            attribute: this.$t('attributes.email')
          })
        },
        () => {
          this.$v.email.email ||
          this.$t('validation.invalid_format', {
            attribute: this.$t('attributes.email')
          })
        }
      ]
    },
    passwordRules () {
      return [
        () => {
          this.$v.password.required ||
          this.$t('validation.required', {
            attribute: this.$t('attributes.password')
          })
        }
      ]
    }
  },
  methods: {
    loginUser () {
      this.error = null
      this.errorMessage = null
      this.loading = true
      const data = {
        email: this.email,
        password: this.password,
        remember: this.remember
      }
      this.auth.login(data)
        .then(() => {
          this.loading = false
          this.store.dispatch('auth/getUser')
          this.$router.push('/home')
        })
        .catch(error => {
          this.loading = false
          this.hasError = true
          if (error.response.status === 422) {
            this.errorMessage = this.$t('validation.invalit_data_to_login', {
              attribute: this.$t('attributes.email')
            })
          } else {
            this.errorMessage = error.message
          }
        })
    },
    forgotPassword () {
      this.$emit('forgot-password')
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(userSettings.passwordMinLength)
    }
  }
}
</script>

<style scoped>

</style>
