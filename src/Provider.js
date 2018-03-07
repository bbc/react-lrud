import { Component, Children } from 'react'
import PropTypes from './prop-types'

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
  navigation: PropTypes.navigationShape.isRequired,
  children: PropTypes.element.isRequired
}

Provider.childContextTypes = {
  navigation: PropTypes.navigationShape.isRequired
}

export default Provider
