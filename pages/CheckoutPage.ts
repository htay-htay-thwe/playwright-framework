
import type { Page } from '@playwright/test';
import { checkoutPageLocators } from '../locators/CheckoutLocators';


export class CheckoutPage {

    constructor(private page: Page) { }
    async getCheckoutPageElements() {
        return {
            pageInfo: this.page.locator(checkoutPageLocators.pageInfo),
            cancel: this.page.locator(checkoutPageLocators.cancelButton),
            continue: this.page.locator(checkoutPageLocators.continueButton)
        }
    }

    async fillcheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill(checkoutPageLocators.firstNameInput, firstName);
        await this.page.fill(checkoutPageLocators.lastNameInput, lastName);
        await this.page.fill(checkoutPageLocators.postalCodeInput, postalCode);
    }

    async clickCancel() {
        await this.page.click(checkoutPageLocators.cancelButton);
    }

    async clickContinue() {
        await this.page.click(checkoutPageLocators.continueButton);
    }

    async getErrorMessage() {
        return this.page.locator(checkoutPageLocators.errorMessage);
    }

    
}