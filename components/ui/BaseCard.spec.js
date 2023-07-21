import { mount } from '@vue/test-utils'

import BaseCard from '~/components/ui/BaseCard.vue'

describe('Test that BaseCard assign right tailwind classes', () => {
  it('Check the class', () => {
    const wrapper = mount(BaseCard)
    const div = wrapper.find('div')

    expect(div.classes().join(' ')).toContain(
      'p-4 my-8 mx-auto max-w-2xl rounded-xl default-shadow'
    )
  })
})
