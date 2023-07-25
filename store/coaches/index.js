import axios from 'axios'
import { generateUserId } from '~/utils/idGenerator'

export const state = () => {
  return {
    lastFetch: null,
    coaches: null,
    rawCoaches: null,
    filters: {
      frontend: true,
      backend: true,
      career: true,
    },
  }
}

export const getters = {
  coaches(state) {
    return state.coaches
  },
  rawCoaches(state) {
    return state.rawCoaches
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches
    const userId = rootGetters.userId
    if (coaches) {
      return coaches.some((coach) => coach.id === userId)
    }
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch
    if (!lastFetch) {
      return true
    }

    const currentTimeStamp = new Date().getTime()
    return (currentTimeStamp - lastFetch) / 1000 > 60
  },
  getFilters(state) {
    return state.filters
  },
}

export const actions = {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId
    const token = context.rootGetters.token

    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    }

    const url = `${process.env.baseUrl}/coaches/${userId}.json?auth=${token}`

    const response = await axios.put(url, coachData)

    if (response.statusText !== 'OK') {
      const error = new Error('Faild to fetch!')
      throw error
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    })
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return
    }

    const url = `${process.env.baseUrl}/coaches.json`

    const response = await axios.get(url)

    if (response.statusText !== 'OK') {
      const error = new Error('Faild to fetch!')
      throw error
    }

    const coaches = []

    for (const key in response.data) {
      const coach = {
        id: key,
        firstName: response.data[key].firstName,
        lastName: response.data[key].lastName,
        description: response.data[key].description,
        hourlyRate: response.data[key].hourlyRate,
        areas: response.data[key].areas,
      }

      coaches.push(coach)
    }

    context.commit('setCoaches', coaches)
    context.commit('setRawCoaches', response.data)
    context.commit('setFetchTimestamp')
  },
  setFilter(context, payload) {
    context.commit('setFilter', payload)
  },
  async registerCoaches(context, payload) {
    const currentCoaches = context.getters.rawCoaches

    const newCoaches = payload.reduce((acc, value) => {
      const userId = generateUserId()
      acc[userId] = value
      return acc
    }, {})

    const mergedCoaches = currentCoaches
      ? Object.assign(currentCoaches, newCoaches)
      : newCoaches

    const url = `${process.env.baseUrl}/coaches.json`

    const response = await axios.put(url, mergedCoaches)

    if (response.statusText !== 'OK') {
      const error = new Error('Faild to post!')
      throw error
    }

    const coaches = []

    for (const key in mergedCoaches) {
      const coach = {
        id: key,
        firstName: mergedCoaches[key].firstName,
        lastName: mergedCoaches[key].lastName,
        description: mergedCoaches[key].description,
        hourlyRate: mergedCoaches[key].hourlyRate,
        areas: mergedCoaches[key].areas,
      }
      coaches.push(coach)
    }

    context.commit('setCoaches', coaches)
  },
}

export const mutations = {
  registerCoach(state, payload) {
    state.coaches.push(payload)
  },
  setCoaches(state, payload) {
    state.coaches = payload
  },
  setRawCoaches(state, payload) {
    state.rawCoaches = payload
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime()
  },
  setFilter(state, payload) {
    state.filters = payload
  },
}
