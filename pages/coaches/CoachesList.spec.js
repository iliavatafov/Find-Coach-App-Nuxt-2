import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'

import CoachesList from '~/pages/coaches/index.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    breadcrumbs: {
      actions: {
        setBreadcrumbs: jest.fn(),
      },
      getters: {
        getBreadcrumbs: () => [],
      },
      namespaced: true,
    },
    coaches: {
      getters: {
        coaches: () => [
          {
            id: 'nPupjajmTnRj6r04UmwRljpMcjh1',
            firstName: 'Ilia',
            lastName: 'Vatafov',
            description: 'Lorem ispusm dolor',
            hourlyRate: 10,
            areas: ['frontend', 'career', 'backend'],
          },
        ],
        getFilters: () => ['frontend', 'career', 'backend'],
      },
      actions: {
        loadCoaches: jest.fn(),
      },
      namespaced: true,
    },
    actions: {
      registerCoaches: jest.fn(),
    },
  },
})

describe('CoachList', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CoachesList, {
      store,
      localVue,
      mocks: {
        $route: {
          path: '/contacts/nPupjajmTnRj6r04UmwRljpMcjh1',
          params: {
            id: 'nPupjajmTnRj6r04UmwRljpMcjh1',
          },
        },
      },
      stubs: {
        'nuxt-link': true,
        'base-badge': true,
        'base-button': true,
        'base-card': true,
        'base-dialog': true,
        'base-spinner': true,
        portal: true,
      },
      data: () => ({
        isLoading: false,
      }),
      computed: {
        filterCoaches() {
          return [
            {
              id: 'nPupjajmTnRj6r04UmwRljpMcjh1',
              firstName: 'Ilia',
              lastName: 'Vatafov',
              description: 'Lorem ispusm dolor',
              hourlyRate: 10,
              areas: ['frontend', 'career', 'backend'],
            },
          ]
        },
        hasCoaches() {
          return true
        },
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('Set "isLoading" to true when refresh button is clicked', () => {
    wrapper.find('button.refresh-btn').trigger('click')
    expect(wrapper.vm.$data.isLoading).toBe(true)
  })

  it('Renders the component with the correct data from coaches list', () => {
    expect(wrapper.find('h4').text()).toBe('$10/hour')
    expect(wrapper.find('h3#name').text()).toBe('Ilia Vatafov')
  })

  it('Renders base badges', () => {
    const baseBadges = wrapper.findAll('.base-badge')
    expect(baseBadges.length).toBe(3)
  })
})
