import { mount } from '@vue/test-utils'

import ConfirmImportedCoaches from '~/components/coaches/ConfirmImportedCoaches.vue'

describe('ConfirmImportedCoaches.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ConfirmImportedCoaches, {
      propsData: {
        newCoaches: [
          {
            firstName: 'Bob',
            lastName: 'Scot',
            areas: ['frontend'],
            description: 'Some text',
            hourlyRate: 20,
          },
          {
            firstName: 'Martin',
            lastName: 'Peterson',
            areas: ['frontend', 'backend'],
            description: 'Another text',
            hourlyRate: 40,
          },
        ],
        confirmImport: jest.fn(),
        cancelImport: jest.fn(),
      },
    })
  })

  it('Render table with correct titles', () => {
    const tableHeadings = wrapper.findAll('th')

    expect(tableHeadings.at(0).text()).toBe('firstName')
    expect(tableHeadings.at(1).text()).toBe('lastName')
    expect(tableHeadings.at(2).text()).toBe('areas')
    expect(tableHeadings.at(3).text()).toBe('description')
    expect(tableHeadings.at(4).text()).toBe('hourlyRate')
  })

  it('Table rows are populated with correct data', () => {
    const tableCells = wrapper.findAll('td')

    //   Test first row
    expect(tableCells.at(0).text()).toBe('Bob')
    expect(tableCells.at(1).text()).toBe('Scot')
    expect(tableCells.at(2).text()).toBe('frontend')
    expect(tableCells.at(3).text()).toBe('Some text')
    expect(tableCells.at(4).text()).toBe('20')

    //   Test second row
    expect(tableCells.at(5).text()).toBe('Martin')
    expect(tableCells.at(6).text()).toBe('Peterson')
    expect(tableCells.at(7).text()).toBe('frontend, backend')
    expect(tableCells.at(8).text()).toBe('Another text')
    expect(tableCells.at(9).text()).toBe('40')
  })
})
