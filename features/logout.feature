Feature: Logout
  As a logged-in user
  I want to log out from the app
  So that I can securely end my session

  Background:
    Given I am logged in as "standard_user"

  Scenario: User can log out from the inventory page
    When I open the menu and log out
    Then I should be redirected to the login page
