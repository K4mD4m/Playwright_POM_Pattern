import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
    readonly welcomeMessage: Locator;
    readonly userMenu: Locator;
    readonly logoutButton: Locator;
    readonly navigationMenu: Locator;
    readonly notificationBell: Locator;
    readonly notificationCount: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        super(page);

        this.welcomeMessage = page.getByTestId('welcome-message');
        this.userMenu = page.getByTestId('user-menu');
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
        this.navigationMenu = page.getByTestId('navigation');
        this.notificationBell = page.getByTestId('notification-bell');
        this.notificationCount = page.getByTestId('notification-count');
        this.searchInput = page.getByPlaceholder('Search...');
    }

    async goto(): Promise<void> {
        await this.navigate('/dashboard');
        await this.waitForPageLoad();
    }

    // Get the welcome message text
    async getWelcomeText(): Promise<string> {
        return this.welcomeMessage.innerText() ?? '';
    }

    // Open user dropdown menu
    async openUserMenu(): Promise<void> {
        await this.userMenu.click();
        // Wait for menu animation
        await this.page.waitForTimeout(500);
    }

    // Perform logout
    async logout(): Promise<void> {
        await this.openUserMenu();
        await this.logoutButton.click();
        await expect(this.page).toHaveURL('/login');
    }

    // Navigate using sidebar menu
    async navigateTo(menuItem: string): Promise<void> {
        await this.navigationMenu.getByRole('link', { name: menuItem }).click();
        await this.waitForPageLoad();
    }

    // Get notification count
    async getNotificationCount(): Promise<number> {
        const text = await this.notificationCount.innerText();
        return parseInt(text ?? '0', 10);
    }

    // Perform search
    async search(query: string): Promise<void> {
        await this.searchInput.fill(query);
        await this.searchInput.press('Enter');
        await this.waitForPageLoad();
    }

    // Verify dashboard is loaded
    async expectLoaded(): Promise<void> {
        await expect(this.welcomeMessage).toBeVisible();
        await expect(this.navigationMenu).toBeVisible();
    }
}