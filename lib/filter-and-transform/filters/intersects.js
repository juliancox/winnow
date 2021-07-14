const _ = require('lodash')
const { intersects, contains } = require('@terraformer/spatial')
const { toGeoJSON } = require('terraformer-arcgis-parser')

module.exports = function (featureGeometry = {}, filterGeometry = {}) {
  if (_.isEmpty(featureGeometry)) return false
  let geometry
  try {
    geometry = isGeoJsonGeometry(featureGeometry) ? featureGeometry : toGeoJSON(featureGeometry)
  } catch (err) {
    if (err.message === 'Unknown type: undefined') return false
    throw err
  }
  const { type, coordinates = [] } = geometry
  if (!type || !coordinates || coordinates.length === 0) return false
  if (type === 'Point') return contains(filterGeometry, geometry)
  return intersects(filterGeometry, geometry)
}

function isGeoJsonGeometry ({ type, coordinates }) {
  return type && coordinates
}
