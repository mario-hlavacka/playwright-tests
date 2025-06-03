import { type Locator, type Page } from '@playwright/test';
import { Contribution } from '../types/contribution';

export class ContributionPage {
  readonly page: Page;

  readonly amountBtns: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneNumberInput: Locator;

  readonly nextBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.amountBtns = page.locator('//html/body/app-root/app-donate-form/div/div[1]/app-donate-form-step1/form/div[2]/button')

    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.emailInput = page.locator('#email-address');
    this.phoneNumberInput = page.locator('#phone-number');

    this.nextBtn = page.locator('//html/body/app-root/app-donate-form/div/div[1]/app-donate-form-step1/form/div[3]/button');
  }

  /**
   * Goes to the contribution page
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Progresses over all of the contribution form steps
   * @param contribution 
   */
  async makeContribution(contribution: Contribution) {
    await this.selectContributionAmount(contribution.amount, contribution.customAmount);

    await this.nextBtn.click();

    await this.firstNameInput.fill(contribution.firstName);
    await this.lastNameInput.fill(contribution.lastName);
    await this.emailInput.fill(contribution.email);
    await this.phoneNumberInput.fill(contribution.phone);
  }

  /**
   * Selects the contribution amount if the customAmount is false otherwise it fills the amount into custom amount input
   * @param contributionAmount 
   * @param customAmount 
   */
  async selectContributionAmount(contributionAmount: number, customAmount: boolean) {
    if(customAmount) {
      const targetAmountBtn = this.amountBtns.filter({ has: this.page.locator('input') });

      await targetAmountBtn.click();
      await targetAmountBtn.locator('input').fill(contributionAmount.toString());
    }
    else {
      const expectedAmountText = new RegExp(`^${Math.floor(contributionAmount)} €$`);
      const targetAmountBtn = this.amountBtns.filter({ hasText: expectedAmountText });

      await targetAmountBtn.click();
    }
  }

}