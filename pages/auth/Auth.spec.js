import { mount } from '@vue/test-utils'

import Auth from '~/pages/auth/index.vue'

describe('Auth.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(Auth)
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('renders validation messages when input is not valid', async () => {
    const wrapper = mount(Auth)
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.findAll('p').at(1).text()).toBe(
      'Please enter valid email and password'
    )
  })

  it('pass correct data to the store when submit login', async () => {
    const wrapper = mount(Auth, {
      mocks: {
        $store: {
          dispatch: jest.fn(),
        },
      },
    })
    await wrapper.find('input#email').setValue('ilia@gmail.com')
    await wrapper.find('input#password').setValue('123456')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('login', {
      email: 'ilia@gmail.com',
      password: '123456',
    })
  })

  it('change view to "signup", pass correct data to the store when singup', async () => {
    const wrapper = mount(Auth, {
      mocks: {
        $store: {
          dispatch: jest.fn(),
        },
      },
    })
    await wrapper.findAll('button').at(1).trigger('click')

    await wrapper.find('input#email').setValue('ilia@gmail.com')
    await wrapper.find('input#password').setValue('123456')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('signup', {
      email: 'ilia@gmail.com',
      password: '123456',
    })
  })
})
