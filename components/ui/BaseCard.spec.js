import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { Portal } from 'portal-vue'

import BaseCard from '~/components/ui/BaseCard.vue'

Vue.component('portal', Portal)

describe('Test that BaseCard assign right tailwind classes', () => {
  it('Check the class', () => {
    const wrapper = mount(BaseCard)
    const div = wrapper.find('div')

    expect(div.classes().join(' ')).toContain(
      'p-4 my-8 mx-auto max-w-2xl rounded-xl default-shadow'
    )
  })
})
