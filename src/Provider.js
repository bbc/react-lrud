import { Component, Children } from 'react'
import PropTypes from './prop-types'

class Provider extends Component {
  getChildContext () {
    return {
      navigation: this.props.navigation
    }
  }

  _onFocus (node) {
    if (node.onFocus) {
      node.onFocus(node)
    }
  }

  _onBlur (node) {
    if (node.onBlur) {
      node.onBlur(node)
    }
  }

  _onMove (node) {
    if (node.onMove) {
      node.onMove(node)
    }
  }

  _onSelect (node) {
    if (node.onSelect) {
      node.onSelect(node)
    }
  }

  componentWillMount () {
    this.props.navigation.on('focus', this._onFocus, this)
    this.props.navigation.on('blur', this._onBlur, this)
    this.props.navigation.on('move', this._onMove, this)
    this.props.navigation.on('select', this._onSelect, this)
  }

  componentWillUnmount () {
    this.props.navigation.off('focus', this._onFocus)
    this.props.navigation.off('blur', this._onBlur)
    this.props.navigation.off('move', this._onMove)
    this.props.navigation.off('select', this._onSelect)
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
