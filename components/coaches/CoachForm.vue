<template>
  <form @submit.prevent="submitForm">
    <div class="my-2">
      <label
        class="base-label"
        :class="{ 'text-red': !firstName.isValid }"
        for="firstname"
        >Firstname</label
      >
      <input
        id="firstname"
        v-model.trim="firstName.val"
        class="base-input"
        :class="{ 'border border-solid border-red': !firstName.isValid }"
        type="text"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid">Firstname must not be empty.</p>
    </div>
    <div class="my-2">
      <label
        class="base-label"
        :class="{ 'text-red': !lastName.isValid }"
        for="lastname"
        >Lastname</label
      >
      <input
        id="lastname"
        v-model.trim="lastName.val"
        class="base-input"
        :class="{ 'border border-solid border-red': !lastName.isValid }"
        type="text"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">Lastname must not be empty.</p>
    </div>
    <div class="my-2">
      <label
        class="base-label"
        :class="{ 'text-red': !description.isValid }"
        for="description"
        >Description</label
      >
      <textarea
        id="description"
        v-model.trim="description.val"
        class="base-textarea"
        :class="{ 'border border-solid border-red': !description.isValid }"
        rows="5"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">Description must not be empty.</p>
    </div>
    <div class="my-2" :class="{ invalid: !rate.isValid }">
      <label
        class="base-label"
        :class="{ 'text-red': !rate.isValid }"
        for="rate"
        >Hourly Rate</label
      >
      <input
        id="rate"
        v-model.number="rate.val"
        class="base-input"
        :class="{ 'border border-solid border-red': !rate.isValid }"
        type="number"
        @blur="clearValidity('rate')"
      />
      <p v-if="!rate.isValid">Rate must not be empty.</p>
    </div>
    <div class="my-2">
      <h3
        class="my-2 text-base font-bold"
        :class="{ 'text-red': !areas.isValid }"
      >
        Areas of Expertise
      </h3>
      <div>
        <input
          id="frontend"
          v-model="areas.val"
          class="inline w-auto border-none focus:outline-[#3d008d] focus:border-[#3d008d]"
          :class="{ 'border border-solid border-red': !areas.isValid }"
          type="checkbox"
          value="frontend"
          @blur="clearValidity('areas')"
        />
        <label class="font-normal inline ml-2" for="frontend"
          >Frontend Development</label
        >
      </div>
      <div>
        <input
          id="backend"
          v-model="areas.val"
          class="inline w-auto border-none focus:outline-[#3d008d] focus:border-[#3d008d]"
          :class="{ 'border border-solid border-red bg-red': !areas.isValid }"
          type="checkbox"
          value="backend"
          @blur="clearValidity('areas')"
        />
        <label class="font-normal inline ml-2" for="backend"
          >Backend Development</label
        >
      </div>
      <div>
        <input
          id="career"
          v-model="areas.val"
          :class="
            !areas.isValid
              ? 'border border-solid border-red'
              : 'inline w-auto border-none focus:outline-[#3d008d] focus:border-[#3d008d]'
          "
          type="checkbox"
          value="career"
          @blur="clearValidity('areas')"
        />
        <label class="font-normal inline ml-2" for="career"
          >Career Advisory</label
        >
      </div>
      <p v-if="!areas.isValid">At least one experties must be selected.</p>
    </div>
    <base-button>Register</base-button>
    <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: {
        val: '',
        isValid: true,
      },
      lastName: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    }
  },
  methods: {
    submitForm() {
      this.formIsValid = true
      this.validateForm()

      if (!this.formIsValid) {
        return
      }
      // Create object with user input
      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      }
      // Emit event and pass data to CoachRegistration component
      this.$emit('save-data', formData)
    },
    validateForm() {
      if (this.firstName.val === '') {
        this.firstName.isValid = false
        this.formIsValid = false
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false
        this.formIsValid = false
      }
      if (this.description.val === '') {
        this.description.isValid = false
        this.formIsValid = false
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false
        this.formIsValid = false
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false
        this.formIsValid = false
      }
    },
    clearValidity(input) {
      this[input].isValid = true
    },
  },
}
</script>
