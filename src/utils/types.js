import PropTypes from 'prop-types'

export const navigationShape = PropTypes.shape({
  register: PropTypes.func.isRequired,
  unregister: PropTypes.func.isRequired
})
