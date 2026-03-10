import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(path: string): Promise<void> {
        await this.page.goto(path);
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async screenshot(name: string): Promise<void> {
        await this.page.screenshot({ path: `screenshots/${name}.png` });
    }
}