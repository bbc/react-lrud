import { shape, func, string, bool, element } from 'prop-types'
import { and } from 'airbnb-prop-types'

const withOrientation = (props, propName, componentName) => {
  if (props[propName] && !props.vertical && !props.horizontal) {
    return new Error(`The prop \`${propName}\` must be used in conjunction with one of props \`vertical\`/\`horizontal\``)
  }
}

export default {
  string,
  element,
  bool,
  func,
  navigationShape: shape({
    register: func.isRequired,
    unregister: func.isRequired
  }),
  boolAndOrientation: and([
    bool,
    withOrientation
  ])
}
