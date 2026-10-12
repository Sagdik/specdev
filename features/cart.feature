Feature: Cart management
  As a logged-in shopper
  I want to manage my cart before checkout
  So that I can review my selections without losing them

  Background:
    Given I am logged in as "standard_user"

  Scenario: Continue shopping from the cart
    When I add "Sauce Labs Backpack" to the cart
    And I click the cart
    And I continue shopping
    Then I should see the products inventory page

  Scenario: Cancel checkout from the checkout form
    When I add "Sauce Labs Backpack" to the cart
    And I click the cart
    And I proceed to checkout
    And I cancel checkout
    Then I should see the cart page with "Sauce Labs Backpack"
