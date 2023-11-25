const puppeteer = require('puppeteer');

const product_url = "https://www.finishline.com/store/product/mens-nike-air-max-97-casual-shoes/prod2770629?styleId=921826&colorId=101";



async function givePage(){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    return page;
}

//walmart
async function addToCart(page){
    await page.goto(product_url);

    await page.waitForSelector(sizeOptions button hollow button--grid expanded );

    await page.waitForSelector("button[class='button spin-button prod-ProductCTA--primary button--primary']");
    await page.click("button[class='button spin-button prod-ProductCTA--primary button--primary']", elem => elem.click());

    await page.waitForNavigation();
    await page.click("button[class='button ios-primary-btn-touch-fix hide-content-max-m checkoutBtn button--primary']", elem => elem.click());

    await page.waitForNavigation();
    await page.waitForSelector("button[data-automation-id='new-guest-continue-button']");
    await page.click("button[data-automation-id='new-guest-continue-button']", elem => elem.click());

    await page.waitForNavigation();
    await page.waitFor(1000);
    await page.click("button[data-automation-id='fulfillment-continue']", elem => elem.click());
}

async function fillBilling(page){
    await page.waitFor(1000);
    await page.type("input[id='firstName']", 'John');
    await page.waitFor(100);
    await page.type("input[id='lastName']", 'Doe');
    await page.waitFor(100);
    await page.type("input[id='addressLineOne']", '501 Jackson St.');
    await page.waitFor(100);
    await page.type('#phone', '8045236859');
    await page.waitFor(100);
    await page.type('#email', 'john.doe@gmail.com');
    await page.waitFor(100);
    const input = await page.$("input[id='city']");
    await input.click({clickCount: 3});
    await input.type('Richmond');
    const input2 = await page.$("input[id='postalCode']");
    await input2.click({clickCount: 3});
    await input2.type('23219');
    await page.waitFor(1000);
    await page.$eval("button[class='button button--primary']", elem => elem.click());
    await page.waitFor(1000);
    await page.$eval("button[class='button button--link']", elem => elem.click());

}

async function fillPayment(page){
    await page.waitFor(2000);
    await page.type('#creditCard', '4024007103939509');
    await page.waitFor(100);
    await page.select('#month-chooser', '02');
    await page.waitFor(100);
    await page.select('#year-chooser', '2024');
    await page.waitFor(100);
    await page.type('#cvv', '221');
    await page.click("button[class='button spin-button button--primary']", elem => elem.click());
}

async function submitOrder(page){
    await page.waitFor(2000);
    await page.evaluate(() => document.getElementsByClassName('button auto-submit-place-order no-margin set-full-width-button pull-right-m place-order-btn btn-block-s button--primary')[0].click());
}


async function checkout(){
    var page = await givePage();
    await addToCart(page);
    await fillBilling(page);
    await fillPayment(page);
    await submitOrder(page);
    
}

checkout()