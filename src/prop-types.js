import { shape, func, string, bool, oneOf, element, oneOfType } from 'prop-types'
import { and } from 'airbnb-prop-types'

const withOrientation = (props, propName) => {
  if (props[propName] && !props.orientation && !props.vertical && !props.horizontal) {
    return new Error(`The prop \`${propName}\` must be used in conjunction with one of props [ \`orientation\`, \`vertical\`, \`horizontal\` ]`)
  }
}

const boolOrString = oneOfType([
  bool,
  string
])

export default {
  string,
  element,
  bool,
  func,
  boolOrString,
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
  ]),
  funcAndOrientation: and([
    func,
    withOrientation
  ]),
  boolOrStringWithOrientation: and([
    boolOrString,
    withOrientation
  ])
}
