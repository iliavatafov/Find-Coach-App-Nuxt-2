import axios from 'axios'

export const state = () => {
  return {
    requests: [],
  }
}

export const getters = {
  requests(state, getters, rootState, rootGetters) {
    const coachId = rootGetters.userId
    return state.requests.filter((req) => req.coachId === coachId)
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0
  },
}

export const actions = {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    }

    const url = `${process.env.baseUrl}/requests/${payload.coachId}.json`

    const response = await axios.post(url, newRequest)

    if (response.statusText !== 'OK') {
      const error = new Error('Faild to send request.')
      throw error
    }

    newRequest.id = response.data.name
    newRequest.coachId = payload.coachId

    context.commit('addRequest', newRequest)
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId
    const token = context.rootGetters.token

    const url = `${process.env.baseUrl}/requests/${coachId}.json?auth=${token}`

    const response = await axios.get(url)

    if (response.statusText !== 'OK') {
      const error = new Error('Failed to fetch requests.')
      throw error
    }

    const requests = []

    for (const key in response.data) {
      const request = {
        id: key,
        coachId,
        userEmail: response.data[key].userEmail,
        message: response.data[key].message,
      }

      requests.push(request)
    }

    context.commit('setRequests', requests)
  },
}

export const mutations = {
  addRequest(state, payload) {
    state.requests.push(payload)
  },
  setRequests(state, payload) {
    state.requests = payload
  },
}
