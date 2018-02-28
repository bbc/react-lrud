import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { navigationShape } from '../utils/types'

class Provider extends Component {
  getChildContext () {
    return {
      navigation: this.props.navigation
    }
  }

  render () {
    return Children.only(this.props.children)
  }
}

Provider.propTypes = {
  navigation: navigationShape.isRequired,
  children: PropTypes.element.isRequired
}

Provider.childContextTypes = {
  navigation: navigationShape.isRequired
}

export default Provider
