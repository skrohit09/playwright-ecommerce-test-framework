const { expect } = require('@playwright/test');

class RegisterApiPage {
  constructor(request, baseURL = process.env.API_BASE_URL || 'https://demowebshop.tricentis.com') {
    this.request = request;
    this.baseURL = baseURL.replace(/\/+$/, '');
    this.registrationUrl = `${this.baseURL}/register`;
  }

  async getRegistrationToken() {
    const response = await this.request.get(this.registrationUrl);
    expect(response.status(), 'Registration form should load successfully').toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');

    const html = await response.text();
    const tokenInput = html.match(/<input\b(?=[^>]*\bname=["']__RequestVerificationToken["'])([^>]+)>/i);
    const tokenMatch = tokenInput?.[1].match(/\bvalue=["']([^"']+)["']/i);

    if (!tokenMatch) {
      throw new Error('Registration form did not contain an anti-forgery token.');
    }

    return tokenMatch[1];
  }

  async submitRegistration(payload, token) {
    const response = await this.request.post(this.registrationUrl, {
      form: { ...payload, __RequestVerificationToken: token },
    });

    expect(response.status(), 'Registration request should return HTTP 200').toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');

    return response.text();
  }
}

module.exports = RegisterApiPage;
