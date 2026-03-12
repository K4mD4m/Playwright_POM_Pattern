import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';

export class UsersPage extends BasePage {
    readonly addUserButton: Locator;
    readonly searchInput: Locator;
    readonly userTable: DataTable;
    readonly deleteModal: Modal;

    constructor(page: Page) {
        super(page);

        this.addUserButton = page.getByRole('button', { name: 'Add User' });
        this.searchInput = page.getByPlaceholder('Search users...');

        // Compose with reusable components
        this.userTable = new DataTable(page, 'user-table');
        this.deleteModal = new Modal(page, 'delete-confirmation');
    }

    async goto(): Promise<void> {
        await this.navigate('/users');
        await this.waitForPageLoad();
    }

    async searchUsers(query: string): Promise<void> {
        await this.searchInput.fill(query);
        await this.searchInput.press('Enter');
        await this.page.waitForLoadState('networkidle');
    }

    async deleteUserByIndex(index: number): Promise<void> {
        await this.userTable.clickRowAction(index, 'Delete');
        await this.deleteModal.waitForOpen();
        await this.deleteModal.confirm();
    }

    async getUserCount(): Promise<number> {
        return this.userTable.getRowCount();
    }

    async expectUserInTable(email: string): Promise<void> {
        const row = this.userTable.rows.filter({ hasText: email });
        await expect(row).toBeVisible();
    }
}