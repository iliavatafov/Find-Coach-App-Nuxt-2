import { RouterLinkStub, mount } from '@vue/test-utils'

import BaseButton from '~/components/ui/BaseButton.vue'

describe('BaseButton.vue', () => {
  describe('Set class based of recived mode prop', () => {
    it('When accept mode with value flat, the class is set to flat', () => {
      const wrapper = mount(BaseButton, {
        propsData: {
          mode: 'flat',
        },
        stubs: {
          'nuxt-link': RouterLinkStub,
        },
      })
      const button = wrapper.find('button')

      expect(button.classes()).toContain('flat')
    })
    it('When accept mode with value outline, the class is set to outline', () => {
      const wrapper = mount(BaseButton, {
        propsData: {
          mode: 'outline',
        },
        stubs: {
          'nuxt-link': RouterLinkStub,
        },
      })
      const button = wrapper.find('button')

      expect(button.classes()).toContain('outline')
    })
    it('When accept mode with value flat, the class is set to green', () => {
      const wrapper = mount(BaseButton, {
        propsData: {
          mode: 'green',
        },
        stubs: {
          'nuxt-link': RouterLinkStub,
        },
      })
      const button = wrapper.find('button')

      expect(button.classes()).toContain('green')
    })
    it('When accept mode with value red, the class is set to red', () => {
      const wrapper = mount(BaseButton, {
        propsData: {
          mode: 'red',
        },
        stubs: {
          'nuxt-link': RouterLinkStub,
        },
      })
      const button = wrapper.find('button')

      expect(button.classes()).toContain('red')
    })
  })
  describe('When link prop is true, nuxt-link is rendered with correct path in "to" attribute', () => {
    it('renders a "NuxtLink" to "/coaches" with correct class', () => {
      const wrapper = mount(BaseButton, {
        propsData: {
          mode: 'outline',
          link: true,
          to: '/coaches',
        },
        stubs: {
          'nuxt-link': RouterLinkStub,
        },
      })
      const nuxtLink = wrapper.findComponent(RouterLinkStub)

      expect(nuxtLink.props('to')).toBe('/coaches')
      expect(nuxtLink.classes()).toContain('outline')
    })
  })
})
