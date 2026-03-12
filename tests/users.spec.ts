import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { UsersPage } from '../pages/UsersPage';

test.describe('User management', () => {
    let loginPage: LoginPage;
    let usersPage: UsersPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        usersPage = new UsersPage(page);

        //Login first
        await loginPage.goto();
        await loginPage.login('admin@example.com', 'admin123');
        await usersPage.goto();
    });

    test('should display users in table', async () => {
        const userCount = await usersPage.getUserCount();
        expect(userCount).toBeGreaterThan(0);
    });

    test('should search for users', async () => {
        await usersPage.searchUsers('john');
        await usersPage.expectUserInTable('john@example.com');
    });

    test('should delete a user', async () => {
        const initialCount = await usersPage.getUserCount();
        await usersPage.deleteUserByIndex(0);

        const newCount = await usersPage.getUserCount();
        expect(newCount).toBe(initialCount - 1);
    });
});