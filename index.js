const { Builder, By, until } = require('selenium-webdriver');
const driver = new Builder().forBrowser('chrome').build();

const credentials = {
    email: 'selenium_test_email_3@mail.com',
    password: 'SeleniumTestPassword3',
    signUp:{
        name: 'Selenium Test Name 3',
        surname: 'Selenium Test SurName 3',
        phone: '+38063123123124'
    },
    shop: {
        name: 'seleniumTestShopName3',
        domain: 'seleniumtestshopDomain3',
        about: 'Selenium Test Shop Description 3',
        city: 'Rapture',
        street: 'Sander Cohen St.',
        house: '0451',
        facebook: 'facebook.com',
        instagram: 'instagram.com',
        youtube: 'youtube.com'
    }
};

async function clickSignUpButton() {
    driver.manage().window().maximize() ;
    await driver.get('https://wstore.pro');
    const signUpButtonPromise = driver.wait(until.elementLocated(By.css(`.header-links a[href='/signup']`))).then(element => driver.wait(until.elementIsVisible(element)));
    signUpButtonPromise.then(element => {
        element.click();
        driver.wait(until.urlContains('signup')).then(() => fillAndSubmitSignupForm());
    });
    
}
// clickSignUpButton();
async function fillAndSubmitSignupForm() {
    driver.findElement(By.id('signup-name')).sendKeys(credentials.signUp.name);
    driver.findElement(By.id('signup-surname')).sendKeys(credentials.signUp.surname);
    driver.findElement(By.id('signup-phone')).sendKeys(credentials.signUp.phone);
    driver.findElement(By.id('signup-email')).sendKeys(credentials.email);
    driver.findElement(By.id('signup-password')).sendKeys(credentials.password);
    driver.findElement(By.css('.signup-form-button')).click();
}

async function signIn() {
    await driver.manage().window().maximize();
    await driver.get('https://wstore.pro');
    const signInButtonPromise = driver.wait(until.elementLocated(By.css(`.header-links a[href='/signin']`))).then(element => driver.wait(until.elementIsVisible(element)));
    signInButtonPromise.then(element => {
        element.click();
        driver.wait(until.urlContains('signin')).then(() => fillAndSubmitSigninForm());
    });
    driver.wait(until.titleIs());

}
signIn();

async function fillAndSubmitSigninForm() {
    driver.findElement(By.id('signin-email')).sendKeys(credentials.email);
    driver.findElement(By.id('signin-password')).sendKeys(credentials.password);
    driver.findElement(By.css('.signin-form-button')).click();
    driver.wait(until.urlContains('dashboard')).then(() => navigateToShopCreationWizard());

}

async function navigateToShopCreationWizard() {
    findShadowDomElement('dash-board', '.shop-name', driver).then(element => {
        element.click();
        driver.wait(until.urlContains('wizard')).then(() => fillAndSubmitWizardForm(driver));
    });
}

async function getExtShadowRoot(selector) {
    await (shadowHost = driver.findElement(By.css(selector)));
    return driver.executeScript('return arguments[0].shadowRoot', shadowHost);
}

async function findShadowDomElement(shadowHost, shadowDomElement) {
    await (shadowRoot = getExtShadowRoot(shadowHost));
    await shadowRoot.then(async result => await (element = result.findElement(By.css(shadowDomElement)))
    );

    return element;
}

async function fillAndSubmitWizardForm() {
    driver.findElement(By.id('store-name')).sendKeys(credentials.shop.name);
    driver.findElement(By.id('store-domain')).sendKeys(credentials.shop.domain);
    driver.findElement(By.id('store-about')).sendKeys(credentials.shop.about);
    driver.findElement(By.css('.next-step-button')).click();

    driver.findElement(By.id('store-city')).sendKeys(credentials.shop.city);
    driver.findElement(By.id('store-street')).sendKeys(credentials.shop.street);
    driver.findElement(By.id('store-house')).sendKeys(credentials.shop.house);
    driver.findElement(By.css('.next-step-button')).click();

    driver.findElements(By.css('input[type="checkbox"]')).then(elements => elements.forEach(element => element.click()));
    driver.findElement(By.id('store-facebook')).sendKeys(credentials.shop.facebook);
    driver.findElement(By.id('store-instagram')).sendKeys(credentials.shop.instagram);
    driver.findElement(By.id('store-youtube')).sendKeys(credentials.shop.youtube);
    driver.findElement(By.css('.next-step-button')).click();

    driver.wait(until.urlContains('dashboard')).then(() => navigateToCreatedShop());
}

async function navigateToCreatedShop(driver) {
    const createdShop = findShadowDomElement('dash-board', 'shop-tile', driver).then(element => {
        element.click();
    });
    driver.wait(until.titleIs());
}

