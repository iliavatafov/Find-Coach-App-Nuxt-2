import { RouterLinkStub, mount } from '@vue/test-utils'

import Error from '~/pages/errors/index.vue'

describe('Error page', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Error, {
      stubs: {
        'base-card': true,
        'nuxt-link': RouterLinkStub,
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('Renders h2 with text "Page not found"', () => {
    const h2 = wrapper.find('h2')
    expect(h2.text()).toBe('Page not found')
  })

  it('Set the coreect path in "to" prop "nuxt-link"', () => {
    const nuxtLink = wrapper.findComponent(RouterLinkStub)
    expect(nuxtLink.props('to')).toBe('/coaches')
  })
})
