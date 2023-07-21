import { RouterLinkStub, mount } from '@vue/test-utils'

import CoachItem from '~/components/coaches/CoachItem.vue'

describe('CoachItem.vue', () => {
  it('renders the full name correctly', () => {
    const firstName = 'Peter'
    const lastName = 'Simson'
    const wrapper = mount(CoachItem, {
      propsData: {
        firstName,
        lastName,
      },
      mocks: {
        $route: {
          path: '/coaches',
        },
      },
      stubs: {
        'base-badge': {
          template: '<span></span>',
        },
        'nuxt-link': RouterLinkStub,
      },
    })

    expect(wrapper.find('h3').text()).toBe(`${firstName} ${lastName}`)
  })

  it('renders the rate per hour correctly', () => {
    const wrapper = mount(CoachItem, {
      propsData: {
        rate: 25,
      },
      mocks: {
        $route: {
          path: '/coaches',
        },
      },
      stubs: {
        'base-badge': {
          template: '<span></span>',
          'nuxt-link': RouterLinkStub,
        },
      },
    })

    expect(wrapper.find('h4').text()).toBe('$25/hour')
  })

  it('renders the areas as base badges', () => {
    const areas = ['Area 1', 'Area 2', 'Area 3']
    const wrapper = mount(CoachItem, {
      propsData: {
        areas,
      },
      mocks: {
        $route: {
          path: '/coaches',
        },
      },
      stubs: {
        'base-badge': {
          template: '<span></span>',
        },
        'nuxt-link': RouterLinkStub,
      },
    })

    const baseBadges = wrapper.findAll('.base-badge')

    expect(baseBadges.length).toBe(areas.length)
  })

  it('generates the correct contact link', () => {
    const id = '123'
    const routePath = '/coaches'
    const expectedLink = `${routePath}/${id}/contact`

    const wrapper = mount(CoachItem, {
      propsData: {
        id,
      },
      mocks: {
        $route: {
          path: routePath,
        },
      },
      stubs: {
        'base-badge': {
          template: '<span></span>',
        },
        'nuxt-link': RouterLinkStub,
      },
    })

    const contactButton = wrapper.findComponent(RouterLinkStub)

    expect(contactButton.props('to')).toBe(expectedLink)
  })

  it('generates the correct details link', () => {
    const id = '123'
    const routePath = '/coaches'
    const expectedLink = `${routePath}/${id}`
    const wrapper = mount(CoachItem, {
      propsData: {
        id,
      },
      mocks: {
        $route: {
          path: routePath,
        },
      },
      stubs: {
        'base-badge': {
          template: '<span></span>',
        },
      },
    })

    const detailsButton = wrapper.find('.details-link')

    expect(detailsButton.attributes('to')).toBe(expectedLink)
  })
})
