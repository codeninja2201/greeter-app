const clients = { acme: 'Acme Law LLP', 'smith-co': 'Smith & Co' }
const greetings = { en: 'Hello', es: 'Hola', fr: 'Bonjour' }
const farewells = { en: 'Goodbye', es: 'Adiós', fr: 'Au revoir' }

function lookupClientName (clientId) {
  return clients[clientId] || 'Valued Client'
}

function logGreeting (name) {
  console.log(`[LegalCo] Greeted ${name} at ${new Date().toISOString()}`)
}

class Greeter {
  constructor (locale = 'en') {
    this.locale = locale
  }

<<<<<<< HEAD
  greet (name, clientId) {
    const greeting = greetings[this.locale] || greetings.en
    const clientName = clientId ? lookupClientName(clientId) : null
    const message = clientName
      ? `${greeting}, ${name}! On behalf of ${clientName}.`
      : `${greeting}, ${name}! Welcome to LegalCo.`
    logGreeting(name)
    return message
  }

  farewell (name) {
    const farewell = farewells[this.locale] || farewells.en
    logGreeting(name)
    return `${farewell}, ${name}!`
=======
  greet (name) {
    const greetings = { en: 'Hello', es: 'Hola', fr: 'Bonjour', de: 'Hallo' }
    return `${greetings[this.locale] || greetings.en}, ${name}!`
  }

  farewell (name) {
    const farewells = {
      en: 'Goodbye',
      es: 'Adiós',
      fr: 'Au revoir',
      de: 'Auf Wiedersehen'
    }
    return `${farewells[this.locale] || farewells.en}, ${name}!`
>>>>>>> upstream/main
  }
}

module.exports = { Greeter, lookupClientName }
