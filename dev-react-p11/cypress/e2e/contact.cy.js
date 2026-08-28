describe("Formulaire de contact", () => {
  it("permet d'envoyer un message", () => {
    cy.visit("/");

    cy.get("#contact").scrollIntoView();

    // Nom
    cy.get("#contact")
      .find('[data-testid="field-testid"]')
      .eq(0)
      .type("Dupont");

    // Prénom
    cy.get("#contact")
      .find('[data-testid="field-testid"]')
      .eq(1)
      .type("Jean");

    // Sélection Personnel / Entreprise
    cy.get("#contact")
      .find('[data-testid="collapse-button-testid"]')
      .click();

    cy.get("#contact").contains("Entreprise").click();

    // Email
    cy.get("#contact")
      .find('[data-testid="field-testid"]')
      .eq(2)
      .type("jean.dupont@example.com");

    // Message
    cy.get("#contact")
      .find('[data-testid="field-testid"]')
      .eq(3)
      .type("Bonjour, je souhaite obtenir plus d'informations.");

    // Envoi
    cy.get("#contact")
      .find('[data-testid="button-test-id"]')
      .click();

    // Le bouton doit indiquer que l'envoi est en cours
    cy.get("#contact")
      .find('[data-testid="button-test-id"]')
      .should("have.value", "En cours");

    // Attente de la réponse simulée
    cy.contains("Message envoyé !", { timeout: 2000 })
      .should("be.visible");
  });
});