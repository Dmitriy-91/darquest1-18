<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-8">
        <q-card>
          <div class="row no-wrap q-px-md q-pt-md">
            <div class="column">
              <div class="text-h6 q-mb-md">{{ $t('main.reset_password') }}</div>
            </div>
          </div>
          <q-card-section class="q-gutter-md">

            <q-input
                rounded
                standout
                v-model.trim="email"
                :label="$t('attributes.email')"
                :rules="[
              () => $v.email.required || $t('validation.required', {'attribute': $t('attributes.email')}),
              () => $v.email.email || $t('validation.invalid_format', {'attribute': $t('attributes.email')})
            ]"
                @input="$v.email.$touch()"
            />
            <q-input
                rounded
                standout
                type="password"
                v-model="password"
                :label="$t('attributes.password')"
                :rules="[
              () => $v.password.required || $t('validation.required', {'attribute': $t('attributes.password')}),
              () => $v.password.minLength || $t('validation.min.string', {
                'attribute': $t('attributes.password'),
                'min': passwordMinLength
              })
            ]"
                @input="$v.password.$touch()"
            />
            <q-input
                rounded
                standout
                type="password"
                v-model="confirmPassword"
                :label="$t('attributes.confirmPassword')"
                :rules="[
              () => $v.confirmPassword.required || $t('validation.required', {'attribute': $t('attributes.password')}),
              () => $v.confirmPassword.sameAsPassword || $t('validation.same', {
                'attribute': $t('attributes.confirmPassword'),
                'other': $t('attributes.password')
              })
            ]"
                @input="$v.confirmPassword.$touch()"
            />
            <span class="text-warning" v-show="hasError">{{ errorMessage }}</span>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn
                class="full-width"
                push
                glossy
                icon="login"
                :label="$t('main.reset_password')"
                :loading="loading"
                @click="resetPassword"
            >
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { user as userSettings } from 'src/setttings'
import api from 'src/api'

export default {
  name: 'ResetPassword',
  data () {
    return {
      auth: api.auth,
      email: '',
      password: '',
      confirmPassword: '',
      passwordMinLength: userSettings.passwordMinLength,
      hasError: false,
      errorMessage: '',
      loading: false
    }
  },
  methods: {
    resetPassword () {
      this.error = null
      this.message = null
      this.loading = true
      const data = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        token: this.$route.query.token
      }
      this.auth.resetPassword(data)
        .then(() => {
          this.loading = false
          this.$router.push('/')
        })
        .catch(error => {
          this.loading = false
          this.hasError = true
          this.errorMessage = error.message
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
