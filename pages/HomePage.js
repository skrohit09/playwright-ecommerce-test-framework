const { test,expect } = require('@playwright/test');

class HomePage {
    constructor(page) {
        this.page = page;
        this.WebShopLogo = page.getByAltText('Tricentis Demo Web Shop');
        this.Register = page.getByRole('link', { name: 'Register' });
        this.LogIn =  page.getByRole('link', { name: 'Log in' });
        this.ShoppingCart = page.locator('span:has-text("Shopping cart")');
        this.WishList = page.locator('span').filter({ hasText: 'Wishlist' });
        this.Books = page.getByRole('link', { name: 'Books' }).first();
        this.Computers = page.getByRole('link', { name: 'Computers' }).first();
        this.Electronics = page.getByRole('link', { name: 'Electronics' }).first();
        this.Apparel_Shoes = page.getByRole('link', { name: 'Apparel & Shoes' }).first();
        this.Digital_downloads = page.getByRole('link', { name: 'Digital downloads' }).first();
        this.Jewelry = page.getByRole('link', { name: 'Jewelry' }).first();
        this.Gift_cards = page.getByRole('link', { name: 'Gift Cards' }).first();
        this.SearchBar = page.locator(".search-box-text");
        this.SearchButton = page.locator(".search-box-button");
    }
    async open_webshop(){
        await this.page.goto("https://demowebshop.tricentis.com/");
        await expect(this.WebShopLogo).toBeVisible();
    }
    async RegisterClick() {
        await this.Register.click();
    }
}

module.exports = HomePage;