import React, { Component } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { generateUniqComponentId, cleanObject } from './utils'
import PropTypes from './prop-types'

const withNavigation = (InnerComponent, { includeProps } = {}) => {
  class Navigable extends Component {
    constructor (props) {
      super(props)

      this.id = props.id || generateUniqComponentId(InnerComponent)
    }

    getChildContext () {
      return {
        parent: this.id
      }
    }

    componentWillUnmount () {
      this.context.navigation.unregister(this.id)
    }

    orientation () {
      const { orientation, vertical, horizontal } = this.props

      if (orientation) return orientation
      if (vertical) return 'vertical'
      if (horizontal) return 'horizontal'
    }

    render () {
      const { grid, wrapping, onFocus, onBlur, onMove, onSelect } = this.props
      const { navigation, parent } = this.context

      let options = {
        parent,
        orientation: this.orientation(),
        grid,
        wrapping,
        onFocus,
        onBlur,
        onMove,
        onSelect
      }

      if (Array.isArray(includeProps)) {
        options = includeProps.reduce((accum, prop) => ({
          ...accum,
          [prop]: this.props[prop]
        }), options)
      }

      navigation.register(this.id, cleanObject(options))

      return (
        <InnerComponent
          {...this.props}
          id={this.id}
        />
      )
    }
  }

  Navigable.propTypes = {
    id: PropTypes.string,
    orientation: PropTypes.orientation,
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool,
    grid: PropTypes.boolAndOrientation,
    wrapping: PropTypes.boolAndOrientation,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMove: PropTypes.funcAndOrientation,
    onSelect: PropTypes.func
  }

  Navigable.childContextTypes = {
    parent: PropTypes.string.isRequired
  }

  Navigable.contextTypes = {
    parent: PropTypes.string,
    navigation: PropTypes.navigationShape
  }

  hoistNonReactStatics(Navigable, InnerComponent)

  return Navigable
}

export default withNavigation
