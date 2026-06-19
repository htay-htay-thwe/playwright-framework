import { Page } from '@playwright/test';
import { CheckoutOverviewLocators } from '../locators/CheckoutOverviewLocators';
import { ProductLocators } from '../locators/ProductLocators';





export class CheckoutOverviewPage {

    constructor(private page: Page) { }

    async getCheckoutOverviewElements() {
        const checkoutOverviewTitle = this.page.locator(CheckoutOverviewLocators.checkoutOverviewTitle);
        const cancelButton = this.page.locator(CheckoutOverviewLocators.cancelButton);
        const finishButton = this.page.locator(CheckoutOverviewLocators.finishButton);
        return { checkoutOverviewTitle, cancelButton, finishButton };
    }

    async getOverviewProducts() {
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


    async getItemTotalPrice() {
        const itemTotalText = await this.page.locator(CheckoutOverviewLocators.itemTotal).textContent();
        return parseFloat(itemTotalText?.replace('Item total: $', '') || '0');
    }

    async getTax() {
        const taxText = await this.page.locator(CheckoutOverviewLocators.tax).textContent();
        return parseFloat(taxText?.replace('Tax: $', '') || '0');
    }

    async getTotal() {
        const totalText = await this.page.locator(CheckoutOverviewLocators.totalPrice).textContent();
        return parseFloat(totalText?.replace('Total: $', '') || '0');
    }


    async clickCancel() {
        await this.page.click(CheckoutOverviewLocators.cancelButton);
    }

    async clickFinish() {
        await this.page.click(CheckoutOverviewLocators.finishButton);
    }


}
