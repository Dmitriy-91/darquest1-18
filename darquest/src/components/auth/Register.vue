<template>
  <div style="min-width: 300px">
    <q-card>
      <div class="row no-wrap q-px-md q-pt-md">
        <div class="column">
          <div class="text-h6 q-mb-md">{{ $t('main.sign_up') }}</div>
        </div>
      </div>
      <q-card-section
          class="q-gutter-md"
          @keyup.enter="registerUser"
      >
        <q-card-section
            class="text-warning"
            v-show="noDescription"
        >
          {{ errorText }}
        </q-card-section>
        <q-input
            rounded
            standout
            v-model.trim="name"
            :label="$t('attributes.username')"
            :rules="nameRules"
              :error-message="getErrorText('name')"
              :error="checkHasError('name')"
            @input="$v.name.$touch()"
        />
        <q-input
            rounded
            standout
            v-model.trim="email"
            :label="$t('attributes.email')"
            :rules="emailRules"
            :error-message="getErrorText('email')"
            :error="checkHasError('email')"
            @input="$v.email.$touch()"
        />
        <q-input
            rounded
            standout
            type="password"
            v-model="password"
            :label="$t('attributes.password')"
            :rules="passwordRules"
            :error-message="getErrorText('password')"
            :error="checkHasError('password')"
            @input="$v.password.$touch()"
        />
        <q-input
            rounded
            standout
            type="password"
            v-model="confirmPassword"
            :label="$t('attributes.confirmPassword')"
            :rules="confirmPasswordRules"
            @input="$v.confirmPassword.$touch()"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn
            class="full-width"
            push
            glossy
            icon="login"
            :label="$t('main.in_game')"
            :loading="loading"
            :disable="$v.$invalid"
            @click="registerUser"
        >
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { user as userSettings } from '../../setttings'
import api from 'src/api/index'
import errorHandle from 'src/mixins/error-handling'

export default {
  name: 'Register',
  mixins: [errorHandle],
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      usernameMinLength: userSettings.usernameMinLength,
      passwordMinLength: userSettings.passwordMinLength,
      loading: false,
      auth: api.auth
    }
  },
  computed: {
    nameRules () {
      return [
        () => this.$v.name.required ||
          this.$t('validation.required', {
            attribute: this.$t('attributes.username')
          }),
        () => this.$v.name.minLength ||
          this.$t('validation.min.string', {
            attribute: this.$t('attributes.username'),
            min: this.usernameMinLength
          })
      ]
    },
    emailRules () {
      return [
        () => this.$v.email.required ||
          this.$t('validation.required', {
            attribute: this.$t('attributes.email')
          }),
        () => this.$v.email.email ||
          this.$t('validation.invalid_format', {
            attribute: this.$t('attributes.email')
          })
      ]
    },
    passwordRules () {
      return [
        () => this.$v.password.required ||
          this.$t('validation.required', {
            attribute: this.$t('attributes.password')
          }),
        () => this.$v.password.minLength ||
          this.$t('validation.min.string', {
            attribute: this.$t('attributes.password'),
            min: this.passwordMinLength
          })
      ]
    },
    confirmPasswordRules () {
      return [
        () => this.$v.confirmPassword.required ||
          this.$t('validation.required', {
            attribute: this.$t('attributes.password')
          }),
        () => this.$v.confirmPassword.sameAsPassword ||
          this.$t('validation.same', {
            attribute: this.$t('attributes.confirmPassword'),
            other: this.$t('attributes.password')
          })
      ]
    }
  },
  methods: {
    registerUser () {
      this.loading = true

      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      }

      this.auth.register(data)
        .then(() => {
          this.loading = false
          this.$store.dispatch('auth/getUser')
          this.$router.push('/home')
        })
        .catch(error => {
          this.loading = false
          this.handleApiError(error)
        })
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(userSettings.usernameMinLength)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(userSettings.passwordMinLength)
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  }
}
</script>

<style scoped>

</style>
