// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://gorest.co.in/', // <-- Tambahkan ini
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
