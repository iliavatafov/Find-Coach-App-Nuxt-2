import { RouterLinkStub, mount } from '@vue/test-utils'

import TheHeader from '~/components/layout/TheHeader.vue'

describe('TheHeader.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(TheHeader, {
      stubs: {
        'nuxt-link': RouterLinkStub,
      },
      computed: {
        coaches: () => [
          {
            areas: ['frontend', 'backend'],
            description: 'Lorem ispusm dolor',
            firstName: 'Ilia',
            lastName: 'Vatafov',
            hourlyRate: 10,
            id: 'nPupjajmTnRj6r04UmwRljpMcjh1',
          },
        ],
        isLoggedIn: () => true,
        getBreadcrumbs: () => [
          {
            text: 'All Coaches',
            to: {
              path: '/coaches',
            },
          },
          {
            text: 'Ilia Vatafov',
            to: {
              path: '/coaches/32132dd12d1',
            },
          },
          {
            text: 'Contact',
            to: {
              path: '/coaches/32132dd12d1/contact',
            },
          },
        ],
      },
      mocks: {
        $store: {
          getters: {
            isAuthenticated: true,
          },
          dispatch: jest.fn(),
        },
        $router: {
          currentRoute: { path: '/coaches/32132dd12d1/contact' },
          replace: jest.fn(),
        },
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the header when coaches exist', () => {
    const header = wrapper.find('header')
    expect(header.exists()).toBe(true)
  })

  it('renders requests button when isLoggedIn false', () => {
    const requestsLinks = wrapper.findAllComponents(RouterLinkStub)
    expect(requestsLinks.at(1).text()).toContain('All Coaches')
    expect(requestsLinks.at(2).text()).toContain('Ilia Vatafov')
    expect(requestsLinks.at(3).text()).toContain('Contact')
  })

  it('renders breadcrumbs', () => {})

  it('renders login button when isLoggedIn true', () => {
    wrapper = mount(TheHeader, {
      stubs: {
        'nuxt-link': RouterLinkStub,
      },
      computed: {
        coaches: () => [
          {
            areas: ['frontend', 'backend'],
            description: 'Lorem ispusm dolor',
            firstName: 'Ilia',
            lastName: 'Vatafov',
            hourlyRate: 10,
            id: 'nPupjajmTnRj6r04UmwRljpMcjh1',
          },
        ],
        isLoggedIn: () => false,
        getBreadcrumbs: () => [
          {
            text: 'All Coaches',
            to: {
              path: '/coaches',
            },
          },
        ],
      },
      mocks: {
        $store: {
          getters: {
            isAuthenticated: false,
          },
          dispatch: jest.fn(),
        },
        $router: {
          currentRoute: { path: '/coaches' },
          replace: jest.fn(),
        },
      },
    })
    const loginLink = wrapper.findAllComponents(RouterLinkStub).at(2)
    expect(loginLink.text()).toBe('Login')
  })
})
