import { Page, Locator } from '@playwright/test';

export class DataTable {
    readonly page: Page;
    readonly table: Locator
    readonly rows: Locator;
    readonly headers: Locator;
    readonly emptyState: Locator;
    readonly pagination: Locator;

    constructor(page: Page, tableTestId: string = 'data-table') {
        this.page = page;
        this.table = page.getByTestId(tableTestId);
        this.rows = this.table.locator('tbody tr');
        this.headers = this.table.locator('thead th');
        this.emptyState = this.table.getByTestId('empty-state');
        this.pagination = page.getByTestId('pagination');
    }

    async getRowCount(): Promise<number> {
        return this.rows.count();
    }

    async getRowByIndex(index: number): Promise<Locator> {
        return this.rows.nth(index);
    }

    async getCellValue(rowIndex: number, columnIndex: number): Promise<string> {
        const row = this.rows.nth(rowIndex);
        const cell = row.locator('td').nth(columnIndex);
        return cell.innerText() ?? '';
    }

    async clickRowAction(rowIndex: number, actionName: string): Promise<void> {
        const row = this.rows.nth(rowIndex);
        await row.getByRole('button', { name: actionName }).click();
    }

    async sortByColumn(columnName: string): Promise<void> {
        await this.headers.filter({ hasText: columnName }).click();
    }

    async goToPage(pageNumber: number): Promise<void> {
        await this.pagination.getByRole('button', { name: String(pageNumber) }).click();
    }

    async isEmpty(): Promise<boolean> {
        return this.emptyState.isVisible();
    }
}