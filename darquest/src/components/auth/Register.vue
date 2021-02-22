<template>
  <div style="min-width: 300px">
    <q-card>
      <div class="row no-wrap q-px-md q-pt-md">
        <div class="column">
          <div class="text-h6 q-mb-md">{{ $t('main.sign_up') }}</div>
        </div>
      </div>
      <q-card-section class="q-gutter-md">
        <q-input
            rounded
            standout
            v-model="name"
            :label="$t('attributes.username')"
            :rules="[
              () => $v.name.required || $t('validation.required', {'attribute': $t('attributes.username')}),
              () => $v.name.minLength || $t('validation.min.string', {
                'attribute': $t('attributes.username'),
                'min': usernameMinLength
              })
            ]"
            @input="$v.name.$touch()"
        />
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
      </q-card-section>
      <q-card-actions>
        <q-btn
            class="full-width"
            push
            glossy
            icon="login"
            :label="$t('main.in_game')"
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
import User from '../../core/models/user'

export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      usernameMinLength: userSettings.usernameMinLength,
      passwordMinLength: userSettings.passwordMinLength
    }
  },
  methods: {
    registerUser () {
      User.register({
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
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
