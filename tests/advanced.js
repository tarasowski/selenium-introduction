import { Builder, By, Key, until } from 'selenium-webdriver'
import { expect } from 'chai'
import chrome from 'selenium-webdriver/chrome.js'

// Mocha Testsuite
describe('Erweiterte Selenium WebDriver Tests', function () {
  this.timeout(30000);  // Timeout für Browser-Interaktionen (30 Sekunden)

  let driver;

  // Vor jedem Test: Browser-Instanz erstellen
  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  });

  // Nach jedem Test: Browser-Instanz schließen
  afterEach(async function () {
    await driver.quit();
  });

  // Test 1: Überprüfung des Seitentitels
  it('sollte den Titel der Seite überprüfen', async function () {
    await driver.get('https://example.com');
    const title = await driver.getTitle();
    expect(title).to.equal('Example Domain');
  });

  // Test 2: Google-Suche durchführen
  it('sollte eine Google-Suche durchführen und das Ergebnis überprüfen', async function () {
    await driver.get('https://www.google.com');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Selenium WebDriver', Key.RETURN);

    await driver.wait(until.titleContains('Selenium WebDriver'), 10000);
    const title = await driver.getTitle();
    expect(title).to.contain('Selenium WebDriver');
  });

  // Test 3: Button-Interaktion
  it('sollte überprüfen, ob der Button klickbar ist', async function () {
    await driver.get('https://example.com');
    const moreInfoLink = await driver.findElement(By.css('a'));
    const isDisplayed = await moreInfoLink.isDisplayed();
    expect(isDisplayed).to.be.true;

    await moreInfoLink.click();
    await driver.wait(until.urlContains('iana.org'), 10000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.contain('iana.org');
  });

  // Test 4: Formular ausfüllen und absenden
  it('sollte ein Formular ausfüllen und absenden', async function () {
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

    const inputText = await driver.findElement(By.name('my-text'));
    await inputText.sendKeys('Test Automation');

    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    // Statt auf den Titel zu warten, warten wir auf die Bestätigungsmeldung
    const successMessage = await driver.wait(until.elementLocated(By.css('h1')), 10000);
    const successText = await successMessage.getText();
    expect(successText).to.equal('Form submitted');
  });

  // Test 5: Dropdown-Menü auswählen
  it('sollte einen Wert aus einem Dropdown-Menü auswählen', async function () {
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

    const dropdown = await driver.findElement(By.name('my-select'));
    await dropdown.sendKeys('Option 2');

    const selectedOption = await driver.findElement(By.css('option:checked')).getText();
    expect(selectedOption).to.equal('Option 2');
  });

  // Test 6: Fehlerbehandlung (Überprüfung auf Fehlermeldung)
  it('sollte eine Fehlermeldung auf der Seite überprüfen', async function () {
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

    const inputText = await driver.findElement(By.name('my-text'));
    await inputText.sendKeys('Test Automation');

    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    const errorMessage = await driver.findElement(By.id('error')).getText();
    expect(errorMessage).to.equal('Ein Fehler ist aufgetreten');
  });
});

