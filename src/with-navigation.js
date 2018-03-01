import React, { Component } from 'react'
import PropTypes from './prop-types'
import uniqid from 'uniqid'

const guid = (Component) => uniqid(`${Component.displayName || Component.name || 'Navigable'}_`)

const getOrientation = ({ vertical, horizontal }) => {
  if (vertical) return 'vertical'
  if (horizontal) return 'horizontal'
}

const withNavigation = (InnerComponent) => {
  class Navigable extends Component {
    constructor (props) {
      super(props)

      this.id = props.id || guid(InnerComponent)
    }

    getChildContext () {
      return {
        parent: this.id
      }
    }

    componentWillUnmount () {
      this.context.navigation.unregister(this.id)
    }

    render () {
      const { vertical, horizontal, grid, wrapping, onFocus, onBlur, onMove, onSelect } = this.props
      const { navigation, parent } = this.context
      const orientation = getOrientation({ vertical, horizontal })

      navigation.register(this.id, {
        parent,
        orientation,
        grid,
        wrapping,
        onFocus,
        onBlur,
        onMove,
        onSelect
      })

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
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool,
    grid: PropTypes.boolAndOrientation,
    wrapping: PropTypes.boolAndOrientation,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMove: PropTypes.func,
    onSelect: PropTypes.func
  }

  Navigable.childContextTypes = {
    parent: PropTypes.string.isRequired
  }

  Navigable.contextTypes = {
    parent: PropTypes.string,
    navigation: PropTypes.navigationShape
  }

  return Navigable
}

export default withNavigation
