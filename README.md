# Playwright BDD Automation — Spec-Driven, Runs Daily

A real spec-driven (Gherkin + Playwright) end-to-end test suite against
[saucedemo.com](https://www.saucedemo.com) (the standard practice site for
QA automation portfolios), wired to run automatically every day via GitHub
Actions and commit its own HTML report back to the repo.

This is genuine daily automation, not a placeholder — each run actually
launches a browser, executes the specs below, and archives a real report
under `reports/<date>/`.

## Why this structure
Specs (`features/*.feature`) are written in plain-English Gherkin — the
same BDD style referenced in your resume (Cucumber). `playwright-bdd`
compiles those specs against the step definitions in `steps/*.ts` into
real Playwright tests, so you get Playwright's speed and tooling with
Cucumber's spec-first structure.

```
playwright-bdd-automation/
├── features/
│   ├── login.feature        # Gherkin specs — plain English scenarios
│   └── inventory.feature
├── steps/
│   ├── login.steps.ts       # Step definitions — the actual Playwright code
│   └── inventory.steps.ts
├── playwright.config.ts     # Wires features + steps together
├── .github/workflows/daily-tests.yml   # Runs it every day, commits the report
└── package.json
```

## Run it locally
```
npm install
npx playwright install --with-deps chromium
npm test
```
This generates real Playwright test files from the Gherkin specs
(`npx bddgen`), runs them, and opens an HTML report at `playwright-report/`.

## What's covered
- **login.feature**: successful login, a locked-out account, and invalid
  credentials (as a Scenario Outline / data table).
- **inventory.feature**: sorting products by price, adding one product to
  the cart, adding multiple products to the cart.

## The daily automation
`.github/workflows/daily-tests.yml` runs on a schedule (03:30 UTC daily) and
on demand. Each run:
1. Installs dependencies and a real Chromium browser.
2. Generates and runs the spec suite.
3. Copies that day's actual HTML report into `reports/YYYY-MM-DD/`.
4. Commits and pushes it — so your GitHub history reflects real, working
   automation executing every day, not an empty placeholder change.

To turn it on: push this repo to GitHub as-is. No secrets or extra setup
needed — it targets a public demo site. Check the **Actions** tab the next
day (or trigger it manually via **Run workflow**) to see it work.

## Extending this
The natural next step for a real portfolio piece: swap `saucedemo.com` for
your own project (the CharakaMed+ landing page, once it's hosted, would be
a good target) and add specs that matter to it — form validation, nav
links, responsive breakpoints, whatever's real. The framework here doesn't
change, only what it points at.
