<template>
  <div class="flex flex-col items-center items-center w-full mt-10 mb-10">
    <table class="w-4/5 border-none default-shadow p-0 m-0 bg-white">
      <thead>
        <tr class="text-black w-full p-4 h-12">
          <th
            v-for="title in titles"
            :key="title"
            class="bg-[#3a0061] text-white"
          >
            {{ title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(coach, index) in newCoaches"
          :key="index"
          class="text-black w-full p-4 h-12"
        >
          <td v-for="(value, i) in coachesValue(coach)" :key="i">
            {{ convertArrayTostring(value) }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex gap-8 mt-8">
      <button class="green-btn" @click="confirmImport">Confirm</button>
      <button class="red-btn" @click="cancelImport">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newCoaches: {
      type: Array,
      default: null,
    },
    cancelImport: {
      type: Function,
      default: null,
    },
    confirmImport: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      titles: null,
    }
  },
  created() {
    this.titles = Object.keys(this.newCoaches[0])
  },
  methods: {
    coachesValue(coach) {
      return Object.values(coach)
    },
    convertArrayTostring(value) {
      if (Array.isArray(value)) {
        return value.join(', ')
      }

      if (typeof value === 'number') {
        return value.toLocaleString('en-US')
      }

      return value
    },
  },
}
</script>
