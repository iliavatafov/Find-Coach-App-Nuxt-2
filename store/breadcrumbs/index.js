export const state = () => {
  return {
    breadcrumbs: [],
  }
}

export const getters = {
  getBreadcrumbs(state) {
    return state.breadcrumbs
  },
}

export const actions = {
  setBreadcrumbs(context, breadcrumbs) {
    context.commit('set', breadcrumbs)
  },
  pushBreadcrumb(context, breadcrumb) {
    context.commit('push', breadcrumb)
  },
  popBreadcrumb(context) {
    context.commit('pop')
  },
  replaceBreadcrumb(context, payload) {
    context.commit('replace', payload)
  },
  emptyBreadcrumb(context) {
    context.commit('empty')
  },
}

export const mutations = {
  set(state, breadcrumbs) {
    state.breadcrumbs = breadcrumbs
  },
  push(state, breadcrumb) {
    state.breadcrumbs.push(breadcrumb)
  },
  pop(state) {
    state.breadcrumbs.pop()
  },
  replace(state, payload) {
    const index = state.breadcrumbs.findIndex((breadcrumb) => {
      return breadcrumb.text === payload.find
    })

    if (index) {
      state.breadcrumbs.splice(index, 1, payload.replace)
    }
  },
  empty(state) {
    state.breadcrumbs = []
  },
}
