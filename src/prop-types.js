import { shape, func, string, bool, element } from 'prop-types'
import { and } from 'airbnb-prop-types'

const withOrientation = (props, propName, componentName) => {
  if (props[propName] && !props.vertical && !props.horizontal) {
    return new Error(`The prop \`${propName}\` must be used in conjunction with one of the \`vertical\`/\`horizontal\` props`)
  }
}

export default {
  navigation: shape({
    register: func.isRequired,
    unregister: func.isRequired
  }),
  wrapping: and([
    bool,
    withOrientation
  ]),
  children: element,
  id: string,
  parent: string,
  vertical: bool,
  horizontal: bool,
  grid: bool
}
