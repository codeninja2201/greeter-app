class Greeter {
  constructor (locale = 'en') {
    this.locale = locale
  }

  greet (name) {
    const greetings = { en: 'Hello', es: 'Hola', fr: 'Bonjour' }
    return `${greetings[this.locale] || greetings.en}, ${name}!`
  }

  farewell (name) {
    const farewells = { en: 'Goodbye', es: 'Adiós', fr: 'Au revoir' }
    return `${farewells[this.locale] || farewells.en}, ${name}!`
  }
}

module.exports = { Greeter }
