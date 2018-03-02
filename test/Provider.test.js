/* eslint-env jest */
/* eslint-disable react/self-closing-comp */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { shallow, mount } from 'enzyme'
import Lrud from 'lrud'
import { Provider } from '../src/index'

describe('Provider', () => {
  class Child extends Component {
    render () {
      return <div />
    }
  }

  Child.contextTypes = {
    navigation: PropTypes.object.isRequired
  }

  const propTypes = Provider.propTypes

  beforeEach(() => {
    Provider.propTypes = propTypes
  })

  it('should enforce a single child', () => {
    const navigation = new Lrud()

    Provider.propTypes = {}

    expect(() => {
      shallow(
        <Provider navigation={navigation}>
        </Provider>
      )
    }).toThrow(/a single React element child/)

    expect(() => {
      shallow(
        <Provider navigation={navigation}>
          <div />
          <div />
        </Provider>
      )
    }).toThrow(/a single React element child/)
  })

  it('should add navigation to the child context', () => {
    const navigation = new Lrud()

    const wrapper = mount(
      <Provider navigation={navigation}>
        <Child />
      </Provider>
    )

    expect(wrapper.find(Child).instance().context.navigation).toEqual(navigation)
  })
})
