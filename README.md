# 🎭 Playwright Automation Framework

A scalable End-to-End (E2E) test automation framework built with **Playwright** and **TypeScript**, following the **Page Object Model (POM)** design pattern.

## 🚀 Features

* ✅ Playwright with TypeScript
* ✅ Page Object Model (POM)
* ✅ Cross-browser testing (Chromium, Firefox, WebKit)
* ✅ Reusable locators and page methods
* ✅ Test data management
* ✅ HTML Reporting
* ✅ Screenshots on failure
* ✅ Trace Viewer support
* ✅ Easy CI/CD integration
* ✅ Clean and maintainable project structure

---

## 📂 Project Structure

```bash
playwright-framework/
│
├── pages/                # Page Object classes
├── tests/                # Test cases
├── fixtures/             # Custom fixtures
├── utils/                # Utility functions
├── test-data/            # Test data files
├── screenshots/          # Failure screenshots
├── playwright-report/    # HTML reports
├── test-results/         # Test execution results
├── playwright.config.ts  # Playwright configuration
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

* Playwright
* TypeScript
* Node.js
* Page Object Model (POM)

---

## 📋 Prerequisites

Before running the project, make sure you have:

* Node.js (v18 or higher)
* npm

Check installation:

```bash
node -v
npm -v
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/htay-htay-thwe/playwright-framework.git
```

### Navigate to Project

```bash
cd playwright-framework
```

### Install Dependencies

```bash
npm install
```

### Install Playwright Browsers

```bash
npx playwright install
```

---

## ▶️ Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Specific Test File

```bash
npx playwright test tests/login.spec.ts
```

### Run Tests in Headed Mode

```bash
npx playwright test --headed
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

### Run Tests on Specific Browser

```bash
npx playwright test --project=chromium
```

```bash
npx playwright test --project=firefox
```

```bash
npx playwright test --project=webkit
```

---

## 📊 Test Reports

After execution, generate and open the HTML report:

```bash
npx playwright show-report
```

---

## 📸 Screenshots

Screenshots are automatically captured when tests fail.

Location:

```bash
test-results/
```

---

## 🔍 Trace Viewer

Open trace files for debugging:

```bash
npx playwright show-trace trace.zip
```

---

## 🧪 Example Test

```typescript
import { test, expect } from '@playwright/test';

test('Verify Login Page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await expect(page).toHaveTitle(/Swag Labs/);
});
```

---

## 🏗️ Design Pattern

This framework follows the **Page Object Model (POM)** pattern.

Example:

```typescript
export class LoginPage {
  constructor(private page: Page) {}

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }
}
```

Benefits:

* Reusability
* Maintainability
* Cleaner test scripts
* Easy scalability

---

## 🔄 CI/CD Integration

This framework can be integrated with:

* Jenkins
* GitHub Actions
* GitLab CI/CD
* Azure DevOps

Example:

```bash
npx playwright test
```

---

## 👩‍💻 Author

**Htay Htay Thwe**

* Full Stack Developer
* Automation QA Engineer
* DevOps & Cloud Enthusiast

GitHub:
https://github.com/htay-htay-thwe

