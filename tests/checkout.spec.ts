import { test, expect } from '@playwright/test';
import { BASE_URL, PASSWORD, USERNAME } from '../utils/envConfig';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { checkoutData } from '../test-data/checkoutData';


test.describe('Product Page Validation', () => {

    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await productPage.addProductToCart();
        await productPage.clickOnCart();
    });


    test('Validate Checkout Page Elements', async ({ page }) => {
        await cartPage.clickCheckoutButton();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        const elements = await checkoutPage.getCheckoutPageElements();
        await expect(elements.pageInfo).toBeVisible();
        await expect(elements.cancel).toBeVisible();
        await expect(elements.continue).toBeVisible();

    })


    test('Validate Cancel button Functionality', async ({ page }) => {
        await cartPage.clickCheckoutButton();
        await checkoutPage.clickCancel();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    })

    test('Validate Continue button Functionality', async ({ page }) => {
        await cartPage.clickCheckoutButton();
        await checkoutPage.fillcheckoutForm(checkoutData.validFirstName, checkoutData.validLastName, checkoutData.validPostalCode);
        await checkoutPage.clickContinue();
    })


    test.only('Validate Error Message for Empty Form Submission', async ({ page }) => {
        await cartPage.clickCheckoutButton();
        await checkoutPage.clickContinue();
        const errorMessage = await checkoutPage.getErrorMessage();
        await expect(errorMessage).toBeVisible();
    })
    

});

