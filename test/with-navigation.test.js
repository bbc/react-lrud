/* eslint-env jest */

import React, { Component } from 'react'
import { shallow, mount } from 'enzyme'
import { withNavigation } from '../src/index'

describe('withNavigation', () => {
  const windowConsole = window.console
  const noop = () => {}

  afterEach(() => {
    window.console = windowConsole
  })

  class Passthrough extends Component {
    render () {
      return <div {...this.props} />
    }
  }

  Passthrough.staticProps = {
    foo: true
  }

  it('should register using the id on props', () => {
    const Navigable = withNavigation(Passthrough)
    const navigation = { register: jest.fn(), unregister: () => {} }

    shallow(<Navigable id='foo' />, { context: { navigation } })

    expect(navigation.register).toHaveBeenCalledTimes(1)
    expect(navigation.register.mock.calls[0][0]).toBe('foo')
  })

  it('should register using a generated unique id', () => {
    const Navigable = withNavigation(Passthrough)
    const navigation = { register: jest.fn(), unregister: () => {} }

    shallow(<Navigable />, { context: { navigation } })
    shallow(<Navigable />, { context: { navigation } })

    const [ firstCall, secondCall ] = navigation.register.mock.calls

    expect(navigation.register).toHaveBeenCalledTimes(2)
    expect(firstCall[0]).toEqual(expect.stringMatching(/^Passthrough_\w+$/))
    expect(secondCall[0]).toEqual(expect.stringMatching(/^Passthrough_\w+$/))
    expect(firstCall).not.toEqual(secondCall)
  })

  it('should register a `vertical` item', () => {
    const Navigable = withNavigation(Passthrough)
    const navigation = { register: jest.fn(), unregister: () => {} }

    shallow(
      <Navigable
        id='foo'
        vertical
      />,
      { context: { navigation } }
    )

    expect(navigation.register).toHaveBeenCalledWith('foo', {
      orientation: 'vertical'
    })
  })

  it('should register a `horizontal` item', () => {
    const Navigable = withNavigation(Passthrough)
    const navigation = { register: jest.fn(), unregister: () => {} }

    shallow(
      <Navigable
        id='foo'
        horizontal
      />,
      { context: { navigation } }
    )

    expect(navigation.register).toHaveBeenCalledWith('foo', {
      orientation: 'horizontal'
    })
  })

  it('should register a `vertical` item via the `orientation` prop', () => {
    const Navigable = withNavigation(Passthrough)
    const navigation = { register: jest.fn(), unregister: () => {} }

    shallow(
      <Navigable
        id='foo'
        orientation='vertical'
      />,
      { context: { navigation } }
    )

    expect(navigation.register).toHaveBeenCalledWith('foo', {
      orientation: 'vertical'
    })
  })

  it('should register a `horizontal` item via the `orientation` prop', () => {
    const Navigable = withNavigation(Passthrough)
    const navigation = { register: jest.fn(), unregister: () => {} }

    shallow(
      <Navigable
        id='foo'
        orientation='horizontal'
      />,
      { context: { navigation } }
    )

    expect(navigation.register).toHaveBeenCalledWith('foo', {
      orientation: 'horizontal'
    })
  })

  it('should register a `wrapping` item', () => {
    const Navigable = withNavigation(Passthrough)
    const navigation = { register: jest.fn(), unregister: () => {} }

    shallow(
      <Navigable
        id='foo'
        vertical
        wrapping
      />,
      { context: { navigation } }
    )

    expect(navigation.register).toHaveBeenCalledWith('foo', {
      orientation: 'vertical',
      wrapping: true
    })
  })

  it('should warn when the `wrapping` prop is present without an orientation', () => {
    const Navigable = withNavigation(Passthrough)
    const navigation = { register: jest.fn(), unregister: () => {} }

    window.console = { error: jest.fn() }

    shallow(
      <Navigable
        id='foo'
        wrapping
      />,
      { context: { navigation } }
    )

    expect(window.console.error).toHaveBeenCalledWith(
      expect.stringMatching(/The prop `wrapping` must be used in conjunction with one of props \[ `orientation`, `vertical`, `horizontal` \]/)
    )
  })

  it('should register a `grid` item', () => {
    const Navigable = withNavigation(Passthrough)
    const navigation = { register: jest.fn(), unregister: () => {} }

    shallow(
      <Navigable
        id='foo'
        grid
        vertical
      />,
      { context: { navigation } }
    )

    expect(navigation.register).toHaveBeenCalledWith('foo', {
      grid: true,
      orientation: 'vertical'
    })
  })

  it('should warn when the `grid` prop is present without an orientation', () => {
    const Navigable = withNavigation(Passthrough)
    const navigation = { register: jest.fn(), unregister: () => {} }

    window.console = { error: jest.fn() }

    shallow(
      <Navigable
        id='foo'
        grid
      />,
      { context: { navigation } }
    )

    expect(window.console.error).toHaveBeenCalledWith(
      expect.stringMatching(/The prop `grid` must be used in conjunction with one of props \[ `orientation`, `vertical`, `horizontal` \]/)
    )
  })

  it('should register with `parent` from the child context', () => {
    const Navigable = withNavigation(Passthrough)
    const navigation = { register: jest.fn(), unregister: () => {} }

    const wrapper = mount(
      <Navigable id='foo'>
        <div>
          <Navigable id='bar' />
        </div>
      </Navigable>,
      { context: { navigation } }
    )

    expect(navigation.register).toHaveBeenCalledTimes(2)
    expect(navigation.register).toHaveBeenCalledWith('foo', { parent: undefined })
    expect(navigation.register).toHaveBeenLastCalledWith('bar', { parent: 'foo' })
    expect(wrapper.find(Navigable).last().instance().context.parent).toBe('foo')
  })

  it('should register Lrud event callbacks', () => {
    const Navigable = withNavigation(Passthrough)
    const navigation = { register: jest.fn(), unregister: () => {} }

    shallow(
      <Navigable
        id='foo'
        onFocus={noop}
        onBlur={noop}
        onSelect={noop}
      />,
      { context: { navigation } }
    )

    expect(navigation.register).toHaveBeenCalledWith('foo', {
      onFocus: noop,
      onBlur: noop,
      onSelect: noop
    })
  })

  it('should register the `onMove` Lrud event callback', () => {
    const Navigable = withNavigation(Passthrough)
    const navigation = { register: jest.fn(), unregister: () => {} }

    shallow(
      <Navigable
        id='foo'
        vertical
        onMove={noop}
      />,
      { context: { navigation } }
    )

    expect(navigation.register).toHaveBeenCalledWith('foo', {
      orientation: 'vertical',
      onMove: noop
    })
  })

  it('should warn when the `onMove` prop is present without an orientation', () => {
    const Navigable = withNavigation(Passthrough)
    const navigation = { register: jest.fn(), unregister: () => {} }

    window.console = { error: jest.fn() }

    shallow(
      <Navigable
        id='foo'
        onMove={noop}
      />,
      { context: { navigation } }
    )

    expect(window.console.error).toHaveBeenCalledWith(
      expect.stringMatching(/The prop `onMove` must be used in conjunction with one of props \[ `orientation`, `vertical`, `horizontal` \]/)
    )
  })

  it('should preserve static properties', () => {
    const Navigable = withNavigation(Passthrough)

    expect(Navigable.staticProps).toEqual(Passthrough.staticProps)
  })

  it('should register props defined in the `includeProps` option', () => {
    const Navigable = withNavigation(Passthrough, { includeProps: [ 'foo' ] })
    const navigation = { register: jest.fn(), unregister: () => {} }

    shallow(
      <Navigable
        id='foo'
        foo
        bar
      />,
      { context: { navigation } }
    )

    expect(navigation.register).toHaveBeenCalledWith('foo', {
      foo: true
    })
  })
})
