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
  navigation: PropTypes.navigation.isRequired,
  children: PropTypes.children.isRequired
}

Provider.childContextTypes = {
  navigation: PropTypes.navigation.isRequired
}

export default Provider
