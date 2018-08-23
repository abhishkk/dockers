var fs = require('fs');
var webdriver = require('selenium-webdriver'),
{describe, it, after, before} = require('selenium-webdriver/testing');

By = webdriver.By,
until = webdriver.until;
var driver;

describe('node js sample test scenarios', function(){
  this.timeout(10000);
  afterEach(() => driver.quit());

  it('Content should match - firefox', function() {
    driver = new webdriver.Builder().usingServer('http://172.19.0.2:4444/wd/hub').forBrowser('firefox').build();
    // driver.get('http://127.0.0.1:3000');
    driver.get('http://172.19.0.5:80');

    var element = driver.findElement(By.tagName('body'));
    driver.wait(function(){
      return element.getText().then(function(content){
        return content === 'Hello Node.js Sample!';
      });
    }, 5000);

    //take a screenshot of the page as is and save as yellow.png
    driver.takeScreenshot().then(function(data) {
      writeScreenshot(data, 'screenshot-firefox.png');
    });

  });

  it('Content should match - chrome', function() {
    //.usingServer('http://127.0.0.1:4444/wd/hub')
    driver = new webdriver.Builder().usingServer('http://172.19.0.2:4444/wd/hub').forBrowser('chrome').build();
    //driver.get('http://127.0.0.1:3000');
    driver.get('http://172.19.0.5:80');

    var element = driver.findElement(By.tagName('body'));
    driver.wait(function(){
      return element.getText().then(function(content){
        return content === 'Hello Node.js Sample!';
      });
    }, 5000);

    //take a screenshot of the page as is and save as yellow.png
    driver.takeScreenshot().then(function(data) {
      writeScreenshot(data, 'screenshot-chrome.png');
    });

    // For querying wwww.google.com
    //var query = driver.wait(until.elementLocated(By.name('q')));
    //query.sendKeys('webdriver\n');
    //driver.wait(until.titleIs('webdriver - Google Search'));
  });

  function writeScreenshot(data, name) {
    name = name || 'screenshot.png';
    var screenshotPath = '/usr/src/app/'; // Pick it from some env var
    try {
      fs.writeFileSync(screenshotPath + name, data, 'base64');
    }
    catch (e) {
      console.log(e);
    }
  };

});