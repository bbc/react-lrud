import uniqid from 'uniqid'

export const generateUniqComponentId = (Component) =>
  uniqid(`${Component.displayName || Component.name || 'Component'}_`)

export const cleanObject = (o) => Object.keys(o).reduce((a, k) =>
  Object.assign(a, o[k] !== undefined ? { [k]: o[k] } : {}), {})
