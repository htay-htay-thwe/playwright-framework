import { test, expect, Page } from "@playwright/test";
import { CartLocators } from "../locators/CartLocators";


export class CartPage {

    constructor(private page: Page) { }


    async clickContinueShopping() {
        await this.page.click(CartLocators.continueShoppingButton);
    }

    async clickCheckoutButton() {
        await this.page.click(CartLocators.checkoutButton);
    }

    async getCartPageElements() {
        const cartTitle =  this.page.locator(CartLocators.cartTitle);
        const shoppingCart =  this.page.locator(CartLocators.continueShoppingButton);
        const checkoutButton =  this.page.locator(CartLocators.checkoutButton);
        return { cartTitle, shoppingCart, checkoutButton };
    }

    async getCartProducts() {
        const productNames = await this.page.locator(CartLocators.productNames).allTextContents();
        const productDescriptions = await this.page.locator(CartLocators.productDescriptions).allTextContents();
        const productPrices = await this.page.locator(CartLocators.productPrices).allTextContents();
        const allCartsProducts = [];
        for (let i = 0; i < productNames.length; i++) {
            allCartsProducts.push({
                name: productNames[i].trim(),
                description: productDescriptions[i].trim(),
                price: productPrices[i].trim()
            });
        }
        return allCartsProducts;
    }

    async removeFirstProduct() {
        await this.page.click(CartLocators.removeButtons);
    }

    
}
