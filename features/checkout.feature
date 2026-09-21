Feature: Checkout
  As a logged-in user
  I want to complete the checkout flow
  So that I can review and confirm my items

  Background:
    Given I am logged in as "standard_user"

  Scenario: User completes checkout with valid information
    When I add "Sauce Labs Backpack" to the cart
    And I click the cart
    And I proceed to checkout
    And I enter checkout information with first name "Sagar", last name "Tripathi", postal code "12345"
    Then I should see the checkout overview page
    And I should see "Sauce Labs Backpack" in the order summary
