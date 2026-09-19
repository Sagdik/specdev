Feature: Product inventory
  As a logged-in user
  I want to sort and add products
  So that I can find and buy what I want

  Background:
    Given I am logged in as "standard_user"

  Scenario: Sort products by price, low to high
    When I sort products by "Price (low to high)"
    Then the products should be listed in ascending price order

  Scenario: Add a product to the cart
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"

  Scenario: Add multiple products to the cart
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then the cart badge should show "2"

  Scenario: Remove a product from the cart
    When I add "Sauce Labs Backpack" to the cart
    And I remove "Sauce Labs Backpack" from the cart
    Then the cart badge should not be visible
