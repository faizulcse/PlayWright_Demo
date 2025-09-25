import {expect, test} from "@playwright/test";

test.describe('Visual Tests', () => {
    test("login page test", async ({page, baseURL}) => {
        await page.goto(baseURL!)
        await expect(page.getByRole('heading', {name: 'Welcome!'})).toBeVisible();
        await expect(page).toHaveScreenshot(["login", "screen1.png"], {fullPage: true, maxDiffPixels: 100});
        await page.getByRole('button', {name: 'flag'}).click();
        await expect(page.locator("#overlay_menu")).toHaveScreenshot(["login", "languages.png"]);
    })
        ;

        test("forgot password", async ({page, baseURL}) => {
            await page.goto(baseURL!)
            await page.getByText('Forgot your password?').click();
            await expect(page.getByRole('heading', {name: 'Forgot your password?'})).toBeVisible();
            await expect(page).toHaveScreenshot(["forgot_pass", "screen1.png"], {fullPage: true});
            await page.getByRole('textbox', {name: 'Enter your email address'}).click();
            await page.getByRole('textbox', {name: 'Enter your email address'}).fill(process.env.USER_EMAIL!);
            await page.waitForTimeout(10_000)
            await page.getByRole('button', {name: 'Reset password '}).click();
            await expect(page.getByRole('heading', {name: 'Check your e-mail'})).toBeVisible();
            page.getByText('A one-time code has been sent')
            await expect(page).toHaveScreenshot(["forgot_pass", "screen2.png"], {
                fullPage: true,
                mask: [page.getByText('A one-time code has been sent')]
            });
        });
    });