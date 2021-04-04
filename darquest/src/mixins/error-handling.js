export default {
  data () {
    return {
      // Используется в случае отсутствия описания ошибок
      errorText: null,
      // Объект ошибок сервера
      // * Ключь - название input
      // * Значение по ключу - объект со свойствами:
      //    * hasError - Признак наличия ошибки
      //    * text - текст ошибки
      errors: {},
      // Признак ошибки
      hasError: false
    }
  },
  methods: {
    // Функция сброса ошибок
    resetErrors () {
      this.errorText = null
      this.errors = {}
      this.hasError = false
    },
    handleApiError (error) {
      this.resetErrors()

      this.hasError = true
      const status = error.response.status

      this.errorText = error.response.data.message

      if (status === 422) {
        const errors = error.response.data.errors

        // Обойдем возвращенные ошибки по каждому input и
        // сформируем объект
        for (const key in errors) {
          this.errors[key] = {}
          this.errors[key].hasError = true
          this.errors[key].text = errors[key].join('\n')
        }
      }
    },
    getErrorText (inputName) {
      if (Object.prototype.hasOwnProperty.call(this.errors, inputName)) {
        return this.errors[inputName].text
      }
      return ''
    },
    checkHasError (inputName) {
      if (Object.prototype.hasOwnProperty.call(this.errors, inputName)) {
        return this.errors[inputName].hasError
      }
      return false
    }
  },
  computed: {
    // Показывает, что нет детального описания ошибки
    // используется в случае, когда нет описание ошибок полей
    // для общего описание
    noDescription () {
      let noDescription = this.hasError
      for (const key in this.errors) {
        if (this.errors[key].text !== '') {
          noDescription = false
        }
      }
      console.log(noDescription)
      return noDescription
    }
  }
}
