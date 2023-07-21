import { mount } from '@vue/test-utils'

import BaseBadge from '~/components/ui/BaseBadge.vue'

describe('BaseBadge.vue', () => {
  describe('Renders correct text in the badge, based on received title props', () => {
    it('When title is Frontend, renders FRONTEND', () => {
      const wrapper = mount(BaseBadge, {
        propsData: {
          type: 'frontend',
          title: 'Frontend',
        },
        computed: {
          text() {
            return this.title.toUpperCase()
          },
        },
      })

      expect(wrapper.vm.text).toBe('FRONTEND')
    })

    it('When title is Backend, renders BACKEND', () => {
      const wrapper = mount(BaseBadge, {
        propsData: {
          type: 'backend',
          title: 'Backend',
        },
        computed: {
          text() {
            return this.title.toUpperCase()
          },
        },
      })

      expect(wrapper.vm.text).toBe('BACKEND')
    })

    it('When title is Carrer, renders CAREER', () => {
      const wrapper = mount(BaseBadge, {
        propsData: {
          type: 'career',
          title: 'Career',
        },
        computed: {
          text() {
            return this.title.toUpperCase()
          },
        },
      })

      expect(wrapper.vm.text).toBe('CAREER')
    })
  })
  describe('Is class of the span element correctly received from props type', () => {
    it('When props type is frontend, the class of the span is "frontend"', () => {
      const wrapper = mount(BaseBadge, {
        propsData: {
          type: 'frontend',
          title: 'Frontend',
        },
      })

      const span = wrapper.find('span')

      const classes = span.classes()

      expect(classes).toContain('frontend')
    })
    it('When props type is backend, the class of the span is "backend"', () => {
      const wrapper = mount(BaseBadge, {
        propsData: {
          type: 'backend',
          title: 'Backend',
        },
      })

      const span = wrapper.find('span')

      const classes = span.classes()

      expect(classes).toContain('backend')
    })
    it('When props type is career, the class of the span is "career"', () => {
      const wrapper = mount(BaseBadge, {
        propsData: {
          type: 'career',
          title: 'Career',
        },
      })

      const span = wrapper.find('span')

      const classes = span.classes()

      expect(classes).toContain('career')
    })
  })
})
