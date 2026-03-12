import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { UsersPage } from '../pages/UsersPage';

// Declare fixture types
type PageFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    usersPage: UsersPage;
    authenticatedPage: DashboardPage;
};

// Extend base test with page object fixtures
export const test = base.extend<PageFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },

    usersPage: async ({ page }, use) => {
        const usersPage = new UsersPage(page);
        await use(usersPage);
    },

    // Fixture that provides already authenticated state
    authenticatedPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await loginPage.goto();
        await loginPage.login('user@example.com', 'password123');
        await dashboardPage.expectLoaded();

        await use(dashboardPage);
    },
});

export { expect } from '@playwright/test';