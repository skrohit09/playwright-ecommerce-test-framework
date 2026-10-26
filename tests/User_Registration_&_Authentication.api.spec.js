const { test, expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');
const RegisterApiPage = require('../pages/RegisterApiPage');

function createUser(overrides) {
  const id = randomUUID().replace(/-/g, '').slice(0, 10);

  return {
    Gender: 'M',
    FirstName: 'Test',
    LastName: `User${id.slice(0, 4)}`,
    Email: `playwright.${id}@example.com`,
    Password: 'Test123!',
    ConfirmPassword: 'Test123!',
    ...overrides,
  };
}

test.describe('User registration API', () => {
  test('registers a new user with a valid email', async ({ request }) => {
    const registration = new RegisterApiPage(request);
    const token = await registration.getRegistrationToken();
    const responseBody = await registration.submitRegistration(createUser(), token);

    expect(responseBody).toContain('Your registration completed');
  });

  test('rejects a user with an invalid email', async ({ request }) => {
    const registration = new RegisterApiPage(request);
    const token = await registration.getRegistrationToken();
    const payload = createUser({ Email: `invalid-${randomUUID().slice(0, 8)}` });
    const responseBody = await registration.submitRegistration(payload, token);

    expect(responseBody).toContain('Wrong email');
  });

  test('rejects an email that is already registered', async ({ request }) => {
    const registration = new RegisterApiPage(request);
    const payload = createUser();
    const token = await registration.getRegistrationToken();

    const initialResponseBody = await registration.submitRegistration(payload, token);
    expect(initialResponseBody).toContain('Your registration completed');

    // Fetch a new token before trying the same email again.
    const duplicateToken = await registration.getRegistrationToken();
    const duplicateResponseBody = await registration.submitRegistration(payload, duplicateToken);
    expect(duplicateResponseBody).toContain('The specified email already exists');
  });

  test('rejects registration when the first name is empty', async ({ request }) => {
    const registration = new RegisterApiPage(request);
    const token = await registration.getRegistrationToken();
    const payload = createUser({ FirstName: '' });
    const responseBody = await registration.submitRegistration(payload, token);

    expect(responseBody).toContain('First name is required.');
  });
});
