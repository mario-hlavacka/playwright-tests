import { test as base } from '@playwright/test';
import { ContributionPage } from '../pages/ContributionPage';
import { Contribution } from '../types/contribution';

const test = base.extend<{ contributionPage: ContributionPage }>({
  contributionPage: async ({ page }, use) => {
    const contributionPage = new ContributionPage(page);
    await contributionPage.goto();
    await use(contributionPage);
  },
});

test('should create new contribution', async ({ contributionPage }) => {
  const contribution: Contribution = {
      firstName: 'Štefan',
      lastName: 'Novák',
      email: 's.novak@gmail.com',
      phone: '915851257',
      amount: 10,
      customAmount: false,
  }

  await contributionPage.goto();
  await contributionPage.makeContribution(contribution);
});