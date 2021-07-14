const _ = require('lodash')
const { fromGeoJSON } = require('terraformer-arcgis-parser')

module.exports = function convert (geometry = {}) {
  if (!geometry || !geometry.type) return null

  const result = fromGeoJSON(_.clone(geometry))

  if (_.isEmpty(result)) return null

  return _.omit(result, 'spatialReference')
}
