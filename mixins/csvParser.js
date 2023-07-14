import { convertCSVStrToArray } from '~/utils/convertCSVStrToArray'

export default {
  data() {
    return {
      errorData: {
        isError: false,
        errorMessage: null,
      },
      newCoaches: null,
    }
  },
  methods: {
    handleFileUpload(event) {
      if (!event.target.files) {
        this.isError = true
        this.errorData.errorMessage =
          'Somthing went wrong! Please try to attach the file again.'
      }
      const file = event.target.files[0]
      this.readFile(file)
    },
    readFile(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const contents = e.target.result
        this.processCSVData(contents)
      }
      reader.onerror = () => {
        this.isError = true
        this.errorData.errorMessage = 'Error occurred while reading the file.'
      }
      reader.readAsText(file)
    },
    processCSVData(contents) {
      const data = convertCSVStrToArray(contents)
      if (data) {
        this.newCoaches = data
      } else {
        this.isError = true
        this.errorData.errorMessage = 'Error occurred while data parsing.'
      }
    },
    handleFileUploadError() {
      this.errorData = {
        isError: false,
        errorMessage: null,
      }
    },
  },
}
