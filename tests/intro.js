import { Builder, By, Key, until } from 'selenium-webdriver'
import { expect } from 'chai'

// Mocha test suite
describe('Selenium Test Example', function () {
  this.timeout(30000);  // Set the timeout for async operations (30 seconds)

  let driver;

  // Before each test, create a new browser instance
  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  // After each test, quit the browser instance
  afterEach(async function () {
    await driver.quit();
  });

  // Test to check the title of a webpage
  it('should load a webpage and check the title', async function () {
    await driver.get('https://www.example.com');

    // Wait until the title is displayed
    const title = await driver.getTitle();
    expect(title).to.equal('Example Domain');
  });

  // Test to interact with a search box
  it('should find the search input and perform a search', async function () {
    await driver.get('https://www.google.com');

    // Find the search box, type a query, and hit Enter
    let searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Selenium WebDriver', Key.RETURN);

    // Wait until results page is loaded and check the title contains the search term
    await driver.wait(until.titleContains('Selenium WebDriver'), 10000);

    const title = await driver.getTitle();
    expect(title).to.contain('Selenium WebDriver');
  });
});

