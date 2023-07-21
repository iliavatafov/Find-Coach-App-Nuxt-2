import { mount } from '@vue/test-utils'

import CoachForm from '~/components/coaches/CoachForm'

describe('CoachForm', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CoachForm)
  })

  it('should render the form with all the required fields', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('label[for="firstname"]').text()).toBe('Firstname')
    expect(wrapper.find('input#firstname').exists()).toBe(true)
    expect(wrapper.find('label[for="lastname"]').text()).toBe('Lastname')
    expect(wrapper.find('input#lastname').exists()).toBe(true)
    expect(wrapper.find('label[for="description"]').text()).toBe('Description')
    expect(wrapper.find('textarea#description').exists()).toBe(true)
    expect(wrapper.find('label[for="rate"]').text()).toBe('Hourly Rate')
    expect(wrapper.find('input#rate').exists()).toBe(true)
  })

  it('should show validation messages when the form is submitted with empty fields', async () => {
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.findAll('p').at(0).text()).toContain(
      'Firstname must not be empty.'
    )
    expect(wrapper.findAll('p').at(1).text()).toContain(
      'Lastname must not be empty.'
    )
    expect(wrapper.findAll('p').at(2).text()).toContain(
      'Description must not be empty.'
    )
    expect(wrapper.findAll('p').at(3).text()).toContain(
      'Rate must not be empty.'
    )
    expect(wrapper.findAll('p').at(4).text()).toContain(
      'At least one experties must be selected.'
    )
  })

  it('should emit "save-data" event when the form is submitted with valid data', async () => {
    await wrapper.find('input#firstname').setValue('Peter')
    await wrapper.find('input#lastname').setValue('Simpson')
    await wrapper.find('textarea#description').setValue('Some text')
    await wrapper.find('input#rate').setValue(50)
    await wrapper.find('input#frontend').setChecked()

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('save-data')).toBeTruthy()
    expect(wrapper.emitted('save-data')[0][0]).toEqual({
      first: 'Peter',
      last: 'Simpson',
      desc: 'Some text',
      rate: 50,
      areas: ['frontend'],
    })
  })
})
