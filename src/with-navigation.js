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
      const { vertical, horizontal, grid, wrapping } = this.props
      const { navigation, parent } = this.context
      const orientation = getOrientation({ vertical, horizontal })

      navigation.register(this.id, {
        parent,
        orientation,
        grid,
        wrapping
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
    id: PropTypes.id,
    vertical: PropTypes.vertical,
    horizontal: PropTypes.horizontal,
    grid: PropTypes.grid,
    wrapping: PropTypes.wrapping
  }

  Navigable.childContextTypes = {
    parent: PropTypes.parent.isRequired
  }

  Navigable.contextTypes = {
    parent: PropTypes.parent,
    navigation: PropTypes.navigation
  }

  return Navigable
}

export default withNavigation
