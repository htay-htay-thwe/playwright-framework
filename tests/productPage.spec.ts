import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { BASE_URL, PASSWORD, USERNAME } from "../utils/envConfig";
import { LoginLocators } from "../locators/LoginLocators";
import { ProductLocators } from "../locators/ProductLocators";
import { productsToCart } from "../test-data/products";


test.describe('Product Page Validation', () => {

    let loginPage: LoginPage;
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    });

    test('Validate Logout Functionality', async ({ page }) => {
        await productPage.logout();
        await expect(page.locator(LoginLocators.loginButton)).toBeVisible();
    });

    test('Validate About Page and back Navigation', async ({ page }) => {
        await productPage.openAboutPage();
        await expect(page.locator(ProductLocators.bookDemo)).toBeVisible();
        await expect(page.locator(ProductLocators.tryItFree)).toBeVisible();
        await page.goBack();
        await expect(page.locator(ProductLocators.settingButton)).toBeVisible();
    });


    test('Validate All Products Displayed', async ({ page }) => {
        await productPage.validateAllProductsDisplayed();
        await productPage.addProductToCart();
        await productPage.addAllProductsToCart();
        // expect(productNames.length).toBeGreaterThan(0);
        // expect(productDescriptions.length).toBeGreaterThan(0);
        // expect(productPrices.length).toBeGreaterThan(0);
        // expect(addToCartButtons).toBeGreaterThan(0);
    });

    test('Validate Adding Specific Products to Cart', async ({ page }) => {
        await productPage.addSpecificProductsToCart(productsToCart);
    });

    test('Filter Products by Name A-Z', async ({ page }) => {
        await productPage.filterByNameAZ();
        const names = productPage.getProductNames();
        const sortedNames = [...(await names)].sort();
        expect(await names).toEqual(sortedNames);
    });

    test('Filter Products by Name Z-A', async ({ page }) => {
        await productPage.filterByNameZA();
        const names = productPage.getProductNames();
        const sortedNames = [...(await names)].sort().reverse();
        expect(await names).toEqual(sortedNames);
    });

    test('Filter Products by Price Low-High', async ({ page }) => {
        await productPage.filterByPriceLowHigh();
        const prices = productPage.getProductPrices();
        const sortedPrices = [...(await prices)].sort((a, b) => a - b);
        expect(await prices).toEqual(sortedPrices);
    });

    test.only('Filter Products by Price High-Low', async ({ page }) => {
        await productPage.filterByPriceHighLow();
        const prices = productPage.getProductPrices();
        const sortedPrices = [...(await prices)].sort((a, b) => b - a);
        expect(await prices).toEqual(sortedPrices);
    });
});