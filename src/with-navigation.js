import React, { Component } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { generateUniqComponentId, cleanObject } from './utils'
import PropTypes from './prop-types'

const withNavigation = (InnerComponent) => {
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
      const orientation = this.orientation()

      navigation.register(this.id, cleanObject({
        parent,
        orientation,
        grid,
        wrapping,
        onFocus,
        onBlur,
        onMove,
        onSelect
      }))

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

  hoistNonReactStatics(Navigable, InnerComponent)

  return Navigable
}

export default withNavigation
