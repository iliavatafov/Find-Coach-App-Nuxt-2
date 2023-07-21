import { mount } from '@vue/test-utils'

import BaseDialog from '~/components/ui/BaseDialog.vue'

describe('BaseDialog.vue', () => {
  it('renders the dialog when "show" prop is true', () => {
    const wrapper = mount(BaseDialog, {
      propsData: {
        show: true,
      },
      stubs: {
        portal: true,
      },
    })

    const dialog = wrapper.find('dialog')
    expect(dialog.exists()).toBe(true)
  })

  it('does not render the dialog when "show" prop is false', () => {
    const wrapper = mount(BaseDialog, {
      propsData: {
        show: false,
      },
      stubs: {
        portal: true,
      },
    })

    const dialog = wrapper.find('dialog')
    expect(dialog.exists()).toBe(false)
  })

  it('emits "close" event when clicked on close button', async () => {
    const wrapper = mount(BaseDialog, {
      propsData: {
        show: true,
      },
      stubs: {
        portal: true,
      },
    })

    const closeButton = wrapper.find('button')
    await closeButton.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('button does not render when prop "fixed" is true', () => {
    const wrapper = mount(BaseDialog, {
      propsData: {
        show: true,
        fixed: true,
      },
      stubs: {
        portal: true,
      },
    })

    const closeButton = wrapper.find('button')

    expect(closeButton.exists()).toBe(false)
  })

  it('Renders the correct title based on the "title" prop', () => {
    const wrapper = mount(BaseDialog, {
      propsData: {
        show: true,
        title: 'Somthing',
      },
      stubs: {
        portal: true,
      },
    })

    const h2 = wrapper.find('h2')
    expect(h2.text()).toBe('Somthing')
  })
})
