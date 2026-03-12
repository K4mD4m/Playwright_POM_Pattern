import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    // Define all selectors 
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly forgotPasswordLink: Locator;
    readonly rememberMeCheckbox: Locator;

    constructor(page: Page) {
        super(page);

        // Initialize all selectors
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Sign in' });
        this.errorMessage = page.getByTestId('login-error');
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
        this.rememberMeCheckbox = page.getByLabel('Remember me');
    }

    // Navigate to the login page
    async goto(): Promise<void> {
        await this.navigate('/login');
        await this.waitForPageLoad();
    }

    // Perform login with credentials
    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // Login with remember me option
    async loginWithRememberMe(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.rememberMeCheckbox.check();
        await this.loginButton.click();
    }

    // Get error message text
    async getErrorMessage(): Promise<string> {
        await this.errorMessage.waitFor({ state: 'visible' });
        return this.errorMessage.innerText() ?? '';
    }

    // Check if login form is visible
    async isVisible(): Promise<boolean> {
        return this.loginButton.isVisible();
    }
    // Verify successful login by checking redirect
    async expectSuccessfullLogin(): Promise<void> {
        await expect(this.page).toHaveURL('/dashboard');
    }
}