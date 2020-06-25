const puppeteer = require('puppeteer');
let browser, page;

const socialLogin = async (testName, selector, testUrl) => {
  test(testName, async () => {
    await page.waitForSelector(selector, {
      visible: true,
    });
    await page.waitFor(2000);

    //save target of original page to know that this was the opener:
    const pageTarget = page.target();
    //execute click on first tab that triggers opening of new tab:
    await page.click(selector);
    //check that the first page opened this new page:
    const newTarget = await browser.waitForTarget(
      (target) => target.opener() === pageTarget
    );
    //get the new page object:
    const newPage = await newTarget.page();
    const url = await newPage.url();
    expect(url.includes(testUrl)).toBeTruthy();
  });
};

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });

  page = await browser.newPage();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await browser.close();
});

test('The header has the correct text', async () => {
  const text = await page.$eval(
    'div > div:first-of-type > ul:nth-child(2) >li:nth-child(2)',
    (el) => el.childNodes[1].textContent
  );
  expect(text).toEqual('Home');
});

describe('social login icons getting clicked and taking to right url', () => {
  beforeEach(async () => {
    await page.$eval('.nav-sign a', (el) => el.click());
  });
  test('github', async () => {
    await page.waitFor('.anticon.anticon-github');
    await page.click('.anticon.anticon-github');
    const url = await page.url();
    expect(url.includes('https://github.com/login?')).toBeTruthy();
  });
  socialLogin(
    'facebook',
    '.anticon.anticon-facebook',
    'https://www.facebook.com/login.php?'
  );
  socialLogin(
    'google',
    '.anticon-google-circle',
    'https://accounts.google.com/'
  );
});

// test('facebook', async () => {
//   await page.$eval('.nav-sign a', (el) => el.click());
//   await page.waitForSelector('.anticon-facebook', {
//     visible: true,
//   });
//   await page.waitFor(2000);
//   // await page.waitFor('*')
//   // await page.waitForFunction(
//   //   "document.querySelector('.anticon.anticon-facebook') &&  document.querySelector('.anticon.anticon-facebook').clientHeight != 0"
//   // );
//   // await page.waitFor('.anticon.anticon-facebook', { waitUntil: 'load' });
//   // await page.evaluate(() => {
//   //   document.querySelector('.anticon.anticon-facebook').click();
//   // });
//   // let url;
//   // await page.click('.anticon.anticon-facebook');
//   // await browser.on('targetcreated', async () => {
//   //   url = await page.url();
//   // });
//   // // const lauda = await page.click('.anticon.anticon-facebook');
//   // console.log('url: ', url);

//   //save target of original page to know that this was the opener:
//   const pageTarget = page.target();
//   //execute click on first tab that triggers opening of new tab:
//   await page.click('.anticon.anticon-facebook');

//   //check that the first page opened this new page:
//   const newTarget = await browser.waitForTarget(
//     (target) => target.opener() === pageTarget
//   );
//   //get the new page object:
//   const newPage = await newTarget.page();
//   const url = await newPage.url();
//   // console.log('url: ', url);
//   expect(url.includes('https://www.facebook.com/login.php?')).toBeTruthy();
// });
