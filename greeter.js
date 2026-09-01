const clients = { acme: "Acme Law LLP", "smith-co": "Smith & Co" };

function lookupClientName(clientId) {
  return clients[clientId] || "Valued Client";
}

function logGreeting(name) {
  console.log(`[LegalCo] Greeted ${name} at ${new Date().toISOString()}`);
}

function greet(name, title, clientId) {
  const prefix = title ? title + " " : "";
  const clientName = clientId ? lookupClientName(clientId) : null;
  const message = clientName
    ? "Hello, " + prefix + name + "! On behalf of " + clientName + "."
    : "Hello, " + prefix + name + "! Welcome to LegalCo.";
  logGreeting(name);
  return message;
}

module.exports = { greet, lookupClientName };
