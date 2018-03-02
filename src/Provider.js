import { Component, Children } from 'react'
import PropTypes from './prop-types'

class Provider extends Component {
  getChildContext () {
    return {
      navigation: this.props.navigation
    }
  }

  _onFocus (id) {
    const node = this.props.navigation.nodes[id]
    if (node && node.onFocus) {
      node.onFocus(node)
    }
  }

  _onBlur (id) {
    const node = this.props.navigation.nodes[id]
    if (node && node.onBlur) {
      node.onBlur(node)
    }
  }

  _onMove (event) {
    const node = this.props.navigation.nodes[event.id]
    if (node && node.onMove) {
      node.onMove(Object.assign({}, node, event))
    }
  }

  _onSelect (id) {
    const node = this.props.navigation.nodes[id]
    if (node && node.onSelect) {
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
