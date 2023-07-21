import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import { nextTick } from 'vue'
import CoachView from '~/pages/coaches/_id/index.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    breadcrumbs: {
      actions: {
        getBreadcrumbs: jest.fn(),
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
      },
      namespaced: true,
    },
  },
})

describe('Details page', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CoachView, {
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
        'nuxt-link': RouterLinkStub,
        'base-spinner': true,
        'base-badge': true,
        'base-card': true,
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('Render the component', async () => {
    await nextTick()

    expect(wrapper.find('h2').text()).toBe('Ilia Vatafov')
    expect(wrapper.find('h3').text()).toBe('$10/hour')
    expect(wrapper.find('p').text()).toBe('Lorem ispusm dolor')
  })

  it('Contact link "to" props is correct', () => {
    const nuxtLink = wrapper.findComponent(RouterLinkStub)
    expect(nuxtLink.props('to')).toBe(
      '/coaches/nPupjajmTnRj6r04UmwRljpMcjh1/contact'
    )
  })
})
