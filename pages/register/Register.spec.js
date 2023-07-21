import { mount } from '@vue/test-utils'

import RegisterAsACoach from '~/pages/register/index.vue'

describe('Register as coach', () => {
  it('Renders the component', () => {
    const wrapper = mount(RegisterAsACoach)

    expect(wrapper.find('h2').text()).toBe('Register as a coach now!')
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('Pass correct data to the store submit', async () => {
    const wrapper = mount(RegisterAsACoach, {
      mocks: {
        $store: {
          dispatch: jest.fn(),
        },
      },
    })
    await wrapper.find('input#firstname').setValue('Peter')
    await wrapper.find('input#lastname').setValue('Simpson')
    await wrapper.find('textarea#description').setValue('Some text')
    await wrapper.find('input#rate').setValue(50)
    await wrapper.find('input#frontend').setChecked()

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith(
      'coaches/registerCoach',
      {
        first: 'Peter',
        last: 'Simpson',
        desc: 'Some text',
        rate: 50,
        areas: ['frontend'],
      }
    )
  })
})
