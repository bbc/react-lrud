import { shape, func, string, bool, oneOf, element } from 'prop-types'
import { and } from 'airbnb-prop-types'

const withOrientation = (props, propName, componentName) => {
  if (props[propName] && !props.orientation && !props.vertical && !props.horizontal) {
    return new Error(`The prop \`${propName}\` must be used in conjunction with one of props \`orientation\`/\`vertical\`/\`horizontal\``)
  }
}

export default {
  string,
  element,
  bool,
  func,
  orientation: oneOf([
    'vertical',
    'horizontal'
  ]),
  navigationShape: shape({
    register: func.isRequired,
    unregister: func.isRequired
  }),
  boolAndOrientation: and([
    bool,
    withOrientation
  ])
}
