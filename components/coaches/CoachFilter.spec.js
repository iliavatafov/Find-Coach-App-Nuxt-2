import { mount } from '@vue/test-utils'

import CoachFilter from '~/components/coaches/CoachFilter.vue'

describe('CoachFilter.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CoachFilter, {
      mocks: {
        $store: {
          getters: {
            'coaches/getFilters': {
              frontend: false,
              backend: false,
              career: false,
            },
          },
          dispatch: jest.fn(),
        },
      },
      stubs: {
        'base-card': true,
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the correct filter labels', () => {
    const frontendLabel = wrapper.find('label[for="frontend"]')
    const backendLabel = wrapper.find('label[for="backend"]')
    const careerLabel = wrapper.find('label[for="career"]')

    expect(frontendLabel.text()).toBe('Frontend')
    expect(backendLabel.text()).toBe('Backend')
    expect(careerLabel.text()).toBe('Career')
  })

  it('updates the filter state when a checkbox is checked', async () => {
    const frontendCheckbox = wrapper.find('#frontend')
    const backendCheckbox = wrapper.find('#backend')
    const careerCheckbox = wrapper.find('#career')

    await frontendCheckbox.setChecked(true)
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith(
      'coaches/setFilter',
      {
        frontend: true,
        backend: false,
        career: false,
      }
    )

    await backendCheckbox.setChecked(true)
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith(
      'coaches/setFilter',
      {
        frontend: false,
        backend: true,
        career: false,
      }
    )

    await careerCheckbox.setChecked(true)

    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith(
      'coaches/setFilter',
      {
        frontend: false,
        backend: false,
        career: true,
      }
    )
  })
})
