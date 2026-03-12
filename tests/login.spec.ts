import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Login functionality', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.goto();
    });

    test('should login successfully with valid credentials', async () => {
        await loginPage.login('user@example.com', 'password123');
        await loginPage.expectSuccessfullLogin();
        await dashboardPage.expectLoaded();

        const welcomeText = await dashboardPage.getWelcomeText();
        expect(welcomeText).toContain('Welcome');
    });

    test('should show error with invalid credentials', async () => {
        await loginPage.login('invalid@example.com', 'wrongpassword');

        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Invalid email or password');
    });

    test('should logout successfully', async () => {
        await loginPage.login('user@example.com', 'password123');
        await dashboardPage.expectLoaded();
        await dashboardPage.logout();

        expect(await loginPage.isVisible()).toBe(true);
    });
});