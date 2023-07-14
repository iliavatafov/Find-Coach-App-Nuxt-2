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

    const url = `https://vue-http-demo-6f676-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newRequest),
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Faild to send request.')
      throw error
    }

    newRequest.id = responseData.name
    newRequest.coachId = payload.coachId

    context.commit('addRequest', newRequest)
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId
    const token = context.rootGetters.token

    const url = `https://vue-http-demo-6f676-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`

    const response = await fetch(url)

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests.'
      )
      throw error
    }

    const requests = []

    for (const key in responseData) {
      const request = {
        id: key,
        coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
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
