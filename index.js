const { Builder, By, until } = require('selenium-webdriver');
async function clickSignUpButton() {
    const driver = await new Builder().forBrowser('chrome').build();
    driver.manage().window().maximize() ;
    await driver.get('https://wstore.pro');
    const signUpButtonPromise = driver.wait(until.elementLocated(By.css(`.header-links a[href='/signup']`))).then(element => driver.wait(until.elementIsVisible(element)));
    signUpButtonPromise.then(element => {
        element.click();
        driver.wait(until.urlContains('signup')).then(() => fillAndSubmitSignupForm(driver));
    });
    
}
clickSignUpButton();
async function fillAndSubmitSignupForm(driver) {
    driver.findElement(By.id('signup-name')).sendKeys('Selenium Test Name 1');
    driver.findElement(By.id('signup-surname')).sendKeys('Selenium Test SurName 1');
    driver.findElement(By.id('signup-phone')).sendKeys('+38063123123123');
    driver.findElement(By.id('signup-email')).sendKeys('selenium_test_email_1@mailinator.com');
    driver.findElement(By.id('signup-password')).sendKeys('SeleniumTestPassword1');
    driver.findElement(By.css('.signup-form-button')).click();

    driver.wait(until.titleIs());

}