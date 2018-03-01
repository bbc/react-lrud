import { shape, func, string, bool, element } from 'prop-types'
import { and } from 'airbnb-prop-types'

const withOrientation = (props, propName, componentName) => {
  if (props[propName] && !props.vertical && !props.horizontal) {
    return new Error(`The prop \`${propName}\` must be used in conjunction with one of props \`vertical\`/\`horizontal\``)
  }
}

export default {
  navigation: shape({
    register: func.isRequired,
    unregister: func.isRequired
  }),
  id: string,
  parent: string,
  children: element,
  vertical: bool,
  horizontal: bool,
  wrapping: and([
    bool,
    withOrientation
  ]),
  grid: and([
    bool,
    withOrientation
  ])
}
