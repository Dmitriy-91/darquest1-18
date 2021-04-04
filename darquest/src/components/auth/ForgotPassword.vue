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
      <q-card-section
          class="text-warning"
          v-show="noDescription"
      >
        {{ errorText }}
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-input
            rounded
            standout
            v-show="showInput"
            v-model.trim="email"
            :label="$t('attributes.email')"
            :rules="emailRules"
            :error-message="getErrorText('email')"
            :error="checkHasError('email')"
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
            v-show="showInput"
            :loading="loading"
            :label="$t('main.send')"
            :disable="$v.$invalid"
            @click="sendForm"
        >
        </q-btn>
        <q-btn
            class="full-width"
            push
            glossy
            icon="replay"
            v-show="!showInput"
            :label="$t('main.repeat')"
            @click="showInput = !showInput"
        >
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import api from 'src/api/index'
import errorHandle from 'src/mixins/error-handling'

export default {
  name: 'ForgotPassword',
  mixins: [errorHandle],
  data () {
    return {
      email: '',
      auth: api.auth,
      loading: false,
      showInput: true,
      isSuccess: false
    }
  },
  computed: {
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
    }
  },
  methods: {
    async sendForm () {
      this.loading = true
      this.auth.forgotPassword({
        email: this.email
      })
        .then(() => {
          this.showInput = false
          this.isSuccess = true
          this.loading = false
        })
        .catch(error => {
          this.handleApiError(error)
          this.loading = false
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
