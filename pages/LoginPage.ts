import { LoginLocators } from '../locators/LoginLocators';
import { Page } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) { }

    async login(username: string, password: string) {
        await this.page.goto('https://www.saucedemo.com/');
        await this.page.fill(LoginLocators.usernameInput, username);
        await this.page.fill(LoginLocators.passwordInput, password);
        await this.page.click(LoginLocators.loginButton);
    }
}