const {test, expect} = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const RegisterPage = require('../pages/RegisterPage');
const password = `${Math.random().toString(36).replace(/[^a-z]/g, '').slice(0, 6)}test1`;
const firstName = `${Math.random().toString(36).replace(/[^a-z]/g, '').slice(0, 6)}`;
const lastName = `${Math.random().toString(36).replace(/[^a-z]/g, '').slice(0, 4)}`;
const newUser = `${Math.random().toString(36).replace(/[^a-z]/g, '').slice(0, 8)}@gmail.com`;

test("Register a new user with valid email",async ({page}) =>{

    
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    await homePage.open_webshop();
    await homePage.RegisterClick();
    await registerPage.UserRegistrationValid(firstName,lastName,newUser,password);

})
test("Register a new user with invalid user",async ({page}) =>{

    const newUser1 = `${Math.random().toString(36).replace(/[^a-z]/g, '').slice(0, 8)}`;
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    await homePage.open_webshop();
    await homePage.RegisterClick();
    await registerPage.UserRegistrationInValidEmail(firstName,lastName,newUser1,password);

})
test("Register a new user with existing user",async ({page}) =>{

    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    await homePage.open_webshop();
    await homePage.RegisterClick();
    await registerPage.UserRegistrationExistinguser(firstName,lastName,newUser,password);

})

test("Register a new user with one empty field",async ({page}) =>{

    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    await homePage.open_webshop();
    await homePage.RegisterClick();
    await registerPage.UserRegistrationEmptyField(firstName,lastName,newUser,password);

})