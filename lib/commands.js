//перейти на главную страницу
//выбрать дату
//выбрать сеанс
//выбрать место
//выбрать несколько мест
//нажать кнопку бронирования
//получить текст кнопки
//проверить состояние места

const clickElement = async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      //const element = await page.$(selector);
      //await page.evaluate(
         //el => el.scrollIntoView(), element
    await page.click(selector);   
    //await element.click();
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  };
const getText = async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  };
const getAttribute = async function (page, selector, attribute) {
    try {
      await page.waitForSelector(selector);
      const element = await page.$(selector);
      return await page.evaluate((el, attr) => el.getAttribute(attr), element, attribute);
    } catch (error) {
      throw new Error(`Attribute is not available for selector: ${selector}`);
    }
  };
const hasClass = async function (page, selector, className) {
    try {
      await page.waitForSelector(selector);
      const element = await page.$(selector);
      return await page.evaluate((el, cn) => el.classList.contains(cn), element, className);
    } catch (error) {
      throw new Error(`Failed to check if selector has class: ${selector}`);
    }
  };
const isDisabled = async function (page, selector) {
        try {
            await page.waitForSelector(selector);
            const element = await page.$(selector);
            return await page.evaluate((el) => el.hasAttribute('disabled'), element);
        } catch (error) {
            throw new Error(`Failed to check if selector is disabled: ${selector}`);
        }
    };

const selectDay  = async function (page, selector) {
    await clickElement(page, selector);
};

const selectSession = async function (page, selector) {
  await page.waitForSelector(selector);
  const element = await page.$(selector);
  await element.scrollIntoViewIfNeeded();
  await element.click();
  await page.waitForSelector(".buying-scheme__wrapper");
};

const selectAvailableSeat = async function (page, seatTypeClass, seatCount = 1) {
   
    let selectedCount = 0;
    while (selectedCount < seatCount) {
        const availableSeat = await findAvailableSeat(page, seatTypeClass);
        await availableSeat.click();
        selectedCount++;
    }
};
const selectSeats = async function (page, selectors) {
    for (const selector of selectors) {
  await clickElement(page, selector);
};
    };
const bookTickets = async function (page) {
    await clickElement(page, ".acceptin-button");
};


const findAvailableSeat = async function (page, seatTypeClass) {
    const seatElements = await page.$$(`.buying-scheme__chair.${seatTypeClass}`);
    for (const seatElement of seatElements) {
        const isTaken = await page.evaluate((el) => el.classList.contains("buying-scheme__chair_taken"), seatElement);
        const isDisabled = await page.evaluate((el) => el.classList.contains("buying-scheme__chair_disabled"), seatElement);
        const isSelected = await page.evaluate((el) => el.classList.contains("buying-scheme__chair_selected"), seatElement);
        if (!isTaken && !isDisabled && !isSelected) {
            return seatElement;
        }
    }
    throw new Error(`No available ${seatTypeClass} seats found`);
};


module.exports = {
  clickElement,
  getText,
  getAttribute,
  hasClass,
  isDisabled,
  selectDay,
  selectSession,
  selectAvailableSeat,
  findAvailableSeat,
  selectSeats,
  bookTickets,
};