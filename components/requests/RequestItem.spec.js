import RequestItem from '~/components/requests/RequestItem.vue'

const { mount } = require('@vue/test-utils')

describe('Request.vue', () => {
  it('Renders the correct data, based on the received props', () => {
    const wrapper = mount(RequestItem, {
      propsData: {
        email: 'iliyavatafov@gmail.com',
        message: 'Some text',
      },
    })

    expect(wrapper.find('a').text()).toBe('iliyavatafov@gmail.com')
    expect(wrapper.find('a').attributes('href')).toBe(
      'mailto:iliyavatafov@gmail.com'
    )
    expect(wrapper.find('p').text()).toBe('Some text')
  })
})
