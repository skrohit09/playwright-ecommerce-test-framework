const { test,expect } = require('@playwright/test');

class RegisterPage {
    constructor(page) {
        this.page = page;
        this.GenderMale = page.getByRole('radio', { name: 'Male', exact: true });
        this.FirstName = page.getByRole('textbox', { name: 'First name:' });
        this.LastName = page.getByRole('textbox', { name: 'Last name:' });
        this.Email = page.getByRole('textbox', { name: 'Email:' });
        this.Password = page.getByLabel('Password:').first();
        this.ConfirmPassword = page.getByLabel('Confirm password:');
        this.RegisterButton = page.locator("#register-button");
        this.WrongEmailText = page.getByText('Wrong email');
        this.RegistrationCompleteText = page.getByText('Your registration completed', { exact: true });
        this.ExistingUserMessage = page.getByText('The specified email already exists', { exact: true });
        this.fieldValidationError = page.locator('.field-validation-error');
    }
    async UserRegistrationValid(first,last,email,password) {
        await this.GenderMale.click();
        await this.FirstName.fill(first);
        await this.LastName.fill(last);
        await this.Email.fill(email);
        await this.Password.fill(password);
        await this.ConfirmPassword.fill(password);
        await this.RegisterButton.click();
        await expect(this.RegistrationCompleteText).toBeVisible();
    }
    async UserRegistrationInValidEmail(first,last,email,password) {
        await this.GenderMale.click();
        await this.FirstName.fill(first);
        await this.LastName.fill(last);
        await this.Email.fill(email);
        await this.Password.fill(password);
        await this.ConfirmPassword.fill(password);
        await this.RegisterButton.click();
        await expect(this.WrongEmailText).toBeVisible();
    }
    async UserRegistrationExistinguser(first,last,email,password) {
        await this.GenderMale.click();
        await this.FirstName.fill(first);
        await this.LastName.fill(last);
        await this.Email.fill(email);
        await this.Password.fill(password);
        await this.ConfirmPassword.fill(password);
        await this.RegisterButton.click();
        await expect(this.ExistingUserMessage).toBeVisible();
    }
    async UserRegistrationEmptyField(first,last,email,password) {
        await this.GenderMale.click();
        //await this.FirstName.fill(first);
        await this.LastName.fill(last);
        await this.Email.fill(email);
        await this.Password.fill(password);
        await this.ConfirmPassword.fill(password);
        await this.RegisterButton.click();
        await expect(this.fieldValidationError).toBeVisible();
    }
}

module.exports = RegisterPage;