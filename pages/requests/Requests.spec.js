import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Requests from '~/pages/requests/index.vue'

describe('MyComponent', () => {
  it('renders message when no received requests', async () => {
    const receivedRequests = []
    const wrapper = mount(Requests, {
      mocks: {
        $store: {
          getters: {
            'requests/requests': receivedRequests,
            'requests/hasRequests': false,
            isAuthenticated: true,
          },
          dispatch: jest.fn(),
        },
      },
    })

    await nextTick()

    expect(wrapper.find('h3').text()).toContain(
      "You haven't received any requests yet!"
    )
  })

  it('renders requests data when there is requests', async () => {
    const receivedRequests = [
      {
        id: '-N_d0TeSjaRBiX9gzjxT',
        coachId: 'nPupjajmTnRj6r04UmwRljpMcjh1',
        userEmail: 'iliyavatafov@gmail.com',
        message: 'Some text',
      },
    ]
    const wrapper = mount(Requests, {
      mocks: {
        $store: {
          getters: {
            'requests/requests': receivedRequests,
            'requests/hasRequests': true,
            isAuthenticated: true,
          },
          dispatch: jest.fn(),
        },
      },
      stubs: {
        'base-spiner': true,
        'base-badge': true,
        'base-card': true,
        'base-dialog': true,
        portal: true,
      },
    })

    await nextTick()

    expect(wrapper.find('a').text()).toBe('iliyavatafov@gmail.com')
    expect(wrapper.find('a').attributes('href')).toBe(
      'mailto:iliyavatafov@gmail.com'
    )
    expect(wrapper.findAll('p').at(1).text()).toBe('Some text')
  })
})
