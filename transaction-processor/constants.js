const { _hash } = require('./lib')

const XO_FAMILY = 'hexchainiot'

exports.XO_FAMILY = XO_FAMILY
exports.XO_NAMESPACE = _hash(XO_FAMILY).substring(0, 6)
