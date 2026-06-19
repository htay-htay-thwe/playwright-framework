import type { Page } from "@playwright/test";
import { ProductLocators } from "../locators/ProductLocators";


export class ProductPage {

    constructor(private page: Page) { }

    async logout() {
        await this.page.click(ProductLocators.settingButton);
        await this.page.click(ProductLocators.logoutLink);
    }

    async openAboutPage() {
        await this.page.click(ProductLocators.settingButton);
        await this.page.click(ProductLocators.aboutLink);
    }

    async validateAllProductsDisplayed() {
        const productNames = await this.page.locator(ProductLocators.productNames).allTextContents();
        const productDescriptions = await this.page.locator(ProductLocators.productDescriptions).allTextContents();
        const productPrices = await this.page.locator(ProductLocators.productPrices).allTextContents();
        const addToCartButtons = await this.page.locator(ProductLocators.addToCartButtons).count();
        if (productNames.length === 0) {
            throw new Error('No products found on the product page.');
        }
        if (productNames.length !== productDescriptions.length || productNames.length !== productPrices.length) {
            throw new Error('Mismatch in the number of product names, descriptions, and prices.');
        }
        return { productNames, productDescriptions, productPrices, addToCartButtons };
    }

    async addProductToCart() {
        await this.page.locator(ProductLocators.addToCartButtons).first().click();
        // Implement logic to find the specific product by name and click the corresponding add to cart button
    }

    async addAllProductsToCart() {
        const buttons = this.page.locator(ProductLocators.addToCartButtons);
        const count = await buttons.count();
        for (let i = 0; i < count; i++) {
            await buttons.nth(i).click();
            await this.page.waitForTimeout(3000);
        }
    }

    async addSpecificProductsToCart(productNames: string[]) {
        const addProducts = this.page.locator(ProductLocators.productNames);
        const count = await addProducts.count();
        for (let i = 0; i < count; i++) {
            const name = await addProducts.nth(i).textContent();
            if (name && productNames.includes(name.trim())) {
                await this.page.locator(ProductLocators.addToCartButtons).nth(i).click();
                await this.page.waitForTimeout(3000);
            }
        }
    }

    async filterByNameAZ() {
        await this.page.selectOption(ProductLocators.filterDropdown, 'az');
    }

    async filterByNameZA() {
        await this.page.selectOption(ProductLocators.filterDropdown, 'za');
    }

    async filterByPriceLowHigh() {
        await this.page.selectOption(ProductLocators.filterDropdown, 'lohi');
    }

    async filterByPriceHighLow() {
        await this.page.selectOption(ProductLocators.filterDropdown, 'hilo');
    }

    async getProductNames() {
        return await this.page.locator(ProductLocators.productNames).allTextContents();
    }

    async getProductPrices() {
        const prices = await this.page.locator(ProductLocators.productPrices).allTextContents();
        return prices.map((price) => parseFloat(price.replace('$', '')));
    }

    async clickOnCart() {
        await this.page.click(ProductLocators.cartLink);
    }

    async getFirstProductDetails() {
        const name = await this.page.locator(ProductLocators.productNames).first().textContent();
        const description = await this.page.locator(ProductLocators.productDescriptions).first().textContent();
        const price = await this.page.locator(ProductLocators.productPrices).first().textContent();
        return {
            name: name?.trim(),
            description: description?.trim(),
            price: price?.trim()
        };
    }

    async getAllProductDetails() {
        const productNames = await this.page.locator(ProductLocators.productNames).allTextContents();
        const productDescriptions = await this.page.locator(ProductLocators.productDescriptions).allTextContents();
        const productPrices = await this.page.locator(ProductLocators.productPrices).allTextContents();
        const allProducts = [];
        for (let i = 0; i < productNames.length; i++) {
            allProducts.push({
                name: productNames[i].trim(),
                description: productDescriptions[i].trim(),
                price: productPrices[i].trim()
            });
        }
        return allProducts;
    }


    async getSpecificProductDetails(productName: string[]) {
        const productNames = await this.page.locator(ProductLocators.productNames).allTextContents();
        const productDescriptions = await this.page.locator(ProductLocators.productDescriptions).allTextContents();
        const productPrices = await this.page.locator(ProductLocators.productPrices).allTextContents();
        const allProducts = [];
        for (let i = 0; i < productNames.length; i++) {
            allProducts.push({
                name: productNames[i].trim(),
                description: productDescriptions[i].trim(),
                price: productPrices[i].trim()
            });
        }
        return allProducts.filter(product => productName.includes(product.name));
    }

}