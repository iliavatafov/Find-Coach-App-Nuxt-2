import { mount, RouterLinkStub } from '@vue/test-utils'

import NotFound from '~/components/NotFound.vue'
import BaseCard from '~/components/ui/BaseCard.vue'

describe('NotFound.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(NotFound, {
      stubs: {
        'base-card': BaseCard,
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
