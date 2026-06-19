import type { Page } from "@playwright/test";
import { finalPageLocators } from "../locators/FinalPageLocators";

export class FinalPage {

    constructor(private page: Page) { }

    async getFinalPageElements() {
        const checkoutCompleteTitle = this.page.locator(finalPageLocators.checkoutCompleteTitle);
        const checkoutCompleteText = this.page.locator(finalPageLocators.checkoutCompleteText);
        const backHomeButton = this.page.locator(finalPageLocators.backHomeButton);
        return { checkoutCompleteTitle, checkoutCompleteText, backHomeButton };
    }

    async clickBackHome() {
        await this.page.click(finalPageLocators.backHomeButton);
    }

    async isSuccessImageVisible() {
        const text = await this.page.locator(finalPageLocators.successMessage).innerText();
        return (await text).trim();
    }

    async clickOnBackHomeButton() {
        await this.page.click(finalPageLocators.backHomeButton);
    }
}