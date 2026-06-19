import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverview";
import { BASE_URL, PASSWORD, USERNAME } from "../utils/envConfig";
import { productsToCart } from "../test-data/products";
import { checkoutData } from "../test-data/checkoutData";
import { FinalPage } from "../pages/FinalPage";


test.describe('Product Page Validation', () => {

    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let checkoutOverviewPage: CheckoutOverviewPage;
    let finalPage: FinalPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutOverviewPage = new CheckoutOverviewPage(page);
        finalPage = new FinalPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        await productPage.addSpecificProductsToCart(productsToCart);
        await productPage.clickOnCart();
        await cartPage.clickCheckoutButton();
        await checkoutPage.fillcheckoutForm(checkoutData.validFirstName, checkoutData.validLastName, checkoutData.validPostalCode);
        await checkoutPage.clickContinue();
        await checkoutOverviewPage.clickFinish();

    });


    test('Validate Final Page Elements', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        const finalPageElements = await finalPage.getFinalPageElements();
        await expect(finalPageElements.checkoutCompleteTitle).toBeVisible();
        await expect(finalPageElements.checkoutCompleteText).toBeVisible();
        await expect(finalPageElements.backHomeButton).toBeVisible();
    })

    test.only('Validate Success Image Visibility', async ({ page }) => {
        const isImageVisible = await finalPage.isSuccessImageVisible();
        expect(isImageVisible).toBe("Thank you for your order!");
    })

    test('Validate Back Home Button Functionality', async ({ page }) => {
        await finalPage.clickOnBackHomeButton();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })

})