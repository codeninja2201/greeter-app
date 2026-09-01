function greet (name, title) {
  const prefix = title ? title + ' ' : ''
  return 'Hello, ' + prefix + name + '!'
}

module.exports = { greet }
