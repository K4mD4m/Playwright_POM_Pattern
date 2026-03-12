import { test, expect } from '../fixtures/pageFixtures';

test.describe('Dashboard with fixtures', () => {
    test('should load dashboard after login', async ({ loginPage, dashboardPage }) => {
        await loginPage.goto();
        await loginPage.login('user@example.com', 'password123');
        await dashboardPage.expectLoaded();
    });

    test('should show notifications', async ({ authenticatedPage }) => {
        // Already logged in via fixture
        const count = await authenticatedPage.getNotificationCount();
        expect(count).toBeGreaterThanOrEqual(0);
    });
});