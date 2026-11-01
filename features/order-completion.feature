Feature: Order completion
  As a shopper
  I want to complete an order
  So that I know my purchase was successful

  Background:
    Given I am logged in as "standard_user"

  Scenario: Complete an order from the cart
    When I add "Sauce Labs Backpack" to the cart
    And I click the cart
    And I proceed to checkout
    And I enter checkout information with first name "Taylor", last name "Morgan", postal code "90210"
    And I finish the purchase
    Then I should see the order confirmation