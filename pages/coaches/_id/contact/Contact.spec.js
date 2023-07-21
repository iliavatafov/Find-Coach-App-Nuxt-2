import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import Contact from '~/pages/coaches/_id/contact/index.vue'
import BaseCard from '~/components/ui/BaseCard.vue'
import BaseDialog from '~/components/ui/BaseDialog.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

const store = new Vuex.Store({
  getters: {
    isAuthenticated: () => true,
    getUserEmail: () => 'iliyavatafov@gmail.com',
  },
  dispatch: jest.fn(),
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
      },
      namespaced: true,
    },
  },
})

describe('Contact page', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Contact, {
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
        'base-card': BaseCard,
        'base-dialog': BaseDialog,
        portal: true,
      },
    })
  })

  it('should render the form with all the required fields', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('label[for="email"]').text()).toBe('Your E-Mail')
    expect(wrapper.find('textarea#message').exists()).toBe(true)
  })

  it('should show validation messages when the form is submitted with empty fields', async () => {
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.findAll('p.invalid').at(0).text()).toBe(
      'Please enter a valid input and non-empty message'
    )
  })
})
