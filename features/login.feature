Feature: Login
  As a user of SauceDemo
  I want to log in with valid and invalid credentials
  So that access control behaves as expected

  Background:
    Given I am on the SauceDemo login page

  Scenario: Successful login with a standard user
    When I log in as "standard_user" with password "secret_sauce"
    Then I should see the products inventory page

  Scenario: Login fails for a locked out user
    When I log in as "locked_out_user" with password "secret_sauce"
    Then I should see an error message containing "locked out"

  Scenario Outline: Login fails with invalid credentials
    When I log in as "<username>" with password "<password>"
    Then I should see an error message containing "Username and password do not match"

    Examples:
      | username      | password       |
      | invalid_user  | wrong_password |
      | standard_user | wrong_password |
