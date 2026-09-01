function greet (name, title) {
  const prefix = title ? title + ' ' : ''
  return 'Hello, ' + prefix + name + '! Welcome to LegalCo.'
}

module.exports = { greet }
