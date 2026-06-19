import { test, expect } from '@playwright/test';
import { BASE_URL, PASSWORD, USERNAME } from '../utils/envConfig';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverview';
import { CheckoutPage } from '../pages/CheckoutPage';
import { checkoutData } from '../test-data/checkoutData';
import { productsToCart } from '../test-data/products';

test.describe('Product Page Validation', () => {

    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let checkoutOverviewPage: CheckoutOverviewPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutOverviewPage = new CheckoutOverviewPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        await productPage.addSpecificProductsToCart(productsToCart);
        await productPage.clickOnCart();
        await cartPage.clickCheckoutButton();
        await checkoutPage.fillcheckoutForm(checkoutData.validFirstName, checkoutData.validLastName, checkoutData.validPostalCode);
        await checkoutPage.clickContinue();

    });

    test('Validate Checkout Overview Page Elements', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        const elements = await checkoutOverviewPage.getCheckoutOverviewElements();
        await expect(elements.checkoutOverviewTitle).toBeVisible();
        await expect(elements.cancelButton).toBeVisible();
        await expect(elements.finishButton).toBeVisible();
    });


    test.skip('Validate cancel button functionality', async ({ page }) => {
        await checkoutOverviewPage.clickCancel();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })


    test.skip('Validate Item Total Calculation', async ({ page }) => {
        const overviewProducts = await checkoutOverviewPage.getOverviewProducts();
        const calculatedItemTotal = overviewProducts.reduce((total, product) => {
            const price = parseFloat(product.price.replace('$', ''));
            return total + price;
        }, 0);
        const UiItemTotal = await checkoutOverviewPage.getItemTotalPrice();
        expect(calculatedItemTotal).toBe(UiItemTotal);
    })

    test('Validate final total calculation', async ({ page }) => {
        const overviewProducts = await checkoutOverviewPage.getOverviewProducts();
        const calculatedItemTotal = overviewProducts.reduce((total, product) => {
            const price = parseFloat(product.price.replace('$', ''));
            return total + price;
        }, 0);
        const tax = await checkoutOverviewPage.getTax();
        const calculatedTotal = calculatedItemTotal + tax;
        const UiTotal = await checkoutOverviewPage.getTotal();
        expect(calculatedTotal).toBe(UiTotal);
    })

});
