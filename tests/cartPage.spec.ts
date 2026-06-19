import { test, expect } from "@playwright/test";
import { BASE_URL, PASSWORD, USERNAME } from "../utils/envConfig";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { productsToCart } from "../test-data/products";

test.describe('Product Page Validation', () => {

    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    });

    test('Validate Cart Page Elements', async ({ page }) => {
        await productPage.addProductToCart();
        await productPage.clickOnCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        const uiElements = await cartPage.getCartPageElements();
        await expect((await uiElements).cartTitle).toBeVisible();
        await expect((await uiElements).shoppingCart).toBeVisible();
        await expect((await uiElements).checkoutButton).toBeVisible();
    });

    test('validate Continue Shopping Button', async ({ page }) => {
        await productPage.addProductToCart();
        await productPage.clickOnCart();
        await cartPage.clickContinueShopping();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })

    test('Valide Single Product is Added to Cart', async ({ page }) => {
        const firstProduct = await productPage.getFirstProductDetails();
        await productPage.addProductToCart();
        await productPage.clickOnCart();
        const cartProducts = await cartPage.getCartProducts();
        await expect(cartProducts).toEqual([firstProduct]);
    })

    test('Validate All Products are Added to Cart', async ({ page }) => {
        const allProducts = await productPage.getAllProductDetails();
        await productPage.addAllProductsToCart();
        await productPage.clickOnCart();
        const cartProducts = await cartPage.getCartProducts();
        await expect(cartProducts).toEqual(allProducts);
    });

    test.only('Validate Specific Products are Added to Cart', async ({ page }) => {
        const specificProducts = await productPage.getSpecificProductDetails(productsToCart);
        await productPage.addSpecificProductsToCart(productsToCart);
        await productPage.clickOnCart();
        const cartProducts = await cartPage.getCartProducts();
        await expect(cartProducts).toEqual(specificProducts);
    })


    test('Validate Remove Product from Cart', async ({ page }) => {
        const allProducts = await productPage.getAllProductDetails();
        await productPage.addProductToCart();
        await productPage.clickOnCart();

        const initialCartProducts = await cartPage.getCartProducts();
        await expect(initialCartProducts).toBeGreaterThan(0);
        await cartPage.removeFirstProduct();

        const updatedCartProducts = await cartPage.getCartProducts();
        await expect(updatedCartProducts).toBe(initialCartProducts.length - 1);
    });

})