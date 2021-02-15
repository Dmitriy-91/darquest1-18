<template>
  <div style="min-width: 300px">
    <q-card>
      <div class="row no-wrap q-px-md q-pt-md">
        <div class="column">
          <div class="text-h6 q-mb-md">{{ $t('main.sign_in') }}</div>
        </div>
      </div>
      <q-card-section class="q-gutter-md">
        <q-input
            rounded
            standout
            v-model.trim="login"
            :label="$t('attributes.username')"
            :rules="[
              () => $v.login.required || $t('validation.required', {'attribute': $t('attributes.email')}),
              () => $v.login.email || $t('validation.invalid_format', {'attribute': $t('attributes.email')})
            ]"
            @input="$v.login.$touch()"
        />
        <q-input
            rounded
            standout
            type="password"
            v-model.trim="password"
            :label="$t('attributes.password')"
            :rules="[
              () => $v.password.required || $t('validation.required', {'attribute': $t('attributes.password')})
            ]"
            @input="$v.password.$touch()"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn
            class="full-width"
            push
            glossy
            icon="login"
            :label="$t('main.in_game')"
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

export default {
  name: 'Login',
  data () {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    loginUser () {
      console.log('loginUser')
    }
  },
  validations: {
    login: {
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
