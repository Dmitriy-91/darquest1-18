<template>
  <div style="min-width: 300px">
    <q-btn
        push
        glossy
        icon="arrow_back_ios"
        :label="$t('main.return')"
        @click="backToLogin"
    ></q-btn>
    <q-card>
      <div class="row no-wrap q-px-md q-pt-md">
        <div class="column">
          <div class="text-h6 q-mb-md">
            {{ $t('main.reset_password') }}
          </div>
        </div>
      </div>
      <q-card-section class="q-gutter-md">
        <q-input
            rounded
            standout
            v-show="showInput"
            v-model.trim="email"
            :label="$t('attributes.email')"
            :rules="[
              () => $v.email.required
              || $t('validation.required', {
                'attribute': $t('attributes.email')
              }),
              () => $v.email.email
              || $t('validation.invalid_format', {
                'attribute': $t('attributes.email')
              })
            ]"
            :error-message="errorMessage"
            :error="hasError"
            @input="$v.email.$touch()"
            @keyup.enter="sendForm"
        />
        <span v-show="isSuccess">{{ $t('main.reset_passwordemail_sent') }}</span>
      </q-card-section>
      <q-card-actions>
        <q-btn
            class="full-width"
            push
            glossy
            icon="login"
            :loading="loading"
            :label="$t('main.send')"
            @click="sendForm"
        >
        </q-btn>
        </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import api from '../../api/index'

export default {
  name: 'ForgotPassword',
  data () {
    return {
      email: '',
      auth: api.auth,
      loading: false,
      hasError: false,
      errorMessage: '',
      showInput: true,
      isSuccess: false
    }
  },
  methods: {
    async sendForm () {
      this.loading = true
      this.hasError = false
      this.auth.forgotPassword({
        email: this.email
      })
        .then(() => {
          this.showInput = false
          this.isSuccess = true
          this.loading = false
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errorMessage = this.$t('validation.email_has_not_register')
            console.log(JSON.parse(JSON.stringify(error)))
          }
          this.loading = false
          this.hasError = true
        })
    },
    backToLogin () {
      this.$emit('back-to-login')
    }
  },
  validations: {
    email: {
      required,
      email
    }
  }
}
</script>

<style scoped>

</style>
