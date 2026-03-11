import { Page, Locator } from '@playwright/test';

export class Modal {
    readonly page: Page;
    readonly container: Locator;
    readonly title: Locator;
    readonly closeButton: Locator;
    readonly confirmButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page, testId: string = 'modal') {
        this.page = page;
        this.container = page.getByTestId(testId);
        this.title = this.container.getByRole('heading');
        this.closeButton = this.container.getByRole('button', { name: 'Close' });
        this.confirmButton = this.container.getByRole('button', { name: 'Confirm' });
        this.cancelButton = this.container.getByRole('button', { name: 'Cancel' });
    }

    async waitForOpen(): Promise<void> {
        await this.container.waitFor({ state: 'visible' });
    }

    async waitForClose(): Promise<void> {
        await this.container.waitFor({ state: 'hidden' });
    }

    async close(): Promise<void> {
        await this.closeButton.click();
        await this.waitForClose();
    }

    async confirm(): Promise<void> {
        await this.confirmButton.click();
        await this.waitForClose();
    }

    async cancel(): Promise<void> {
        await this.cancelButton.click();
        await this.waitForClose();
    }

    async getTitle(): Promise<string> {
        return this.title.innerText() ?? '';
    }
}