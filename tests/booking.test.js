const {
  selectDay,
  selectSession,
  selectAvailableSeat,
  bookTickets,
  getText,
  selectSeat,
  isDisabled,
} = require("../lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(async () => {
  await page.close();
});

describe("Booking tickets", () => {
  test("Successful booking of a regular seat for tomorrow", async () => {
    // Arrange
    const tomorrow = ".page-nav a:nth-child(2)";
    const stalkerSessionAt13_00 =
      '.movie-seances__time[data-seance-id="217"][data-seance-start="780"]';
    const standartSeatClass = "buying-scheme__chair_standart";
    const acceptButton = ".acceptin-button";
    const expectedButtonText = "Получить код бронирования";

    // Act
    await selectDay(page, tomorrow);
    await selectSession(page, stalkerSessionAt13_00);
    await selectAvailableSeat(page, standartSeatClass);
    await bookTickets(page);

    // Assert
    const actualButtonText = await getText(page, acceptButton);
    expect(actualButtonText).toContain(expectedButtonText);
  });

  test("Successful booking of three VIP seats for the last available date", async () => {
    // Arrange
    const lastAvailableDate = ".page-nav a:nth-child(7)";
    const witcherSessionAt17_00 =
      '.movie-seances__time[data-seance-id="225"][data-seance-start="1020"]';
    const vipSeatClass = "buying-scheme__chair_vip";
    const acceptButton = ".acceptin-button";
    const expectedButtonText = "Получить код бронирования";

    // Act
    await selectDay(page, lastAvailableDate);
    await selectSession(page, witcherSessionAt17_00);
    await selectAvailableSeat(page, vipSeatClass, 3);
    await bookTickets(page);

    // Assert
    const actualButtonText = await getText(page, acceptButton);
    expect(actualButtonText).toContain(expectedButtonText);
  });

  test("Disabled seat cannot be booked for tomorrow", async () => {
    // Arrange
    const tomorrow = ".page-nav a:nth-child(2)";
    const wadawdSessionAt20_00 =
      '.movie-seances__time[data-seance-id="239"][data-seance-start="1200"]';
    const disabledSeat =
      ".buying-scheme__row:nth-child(7) .buying-scheme__chair_disabled:nth-child(2)";
    const acceptButton = ".acceptin-button";

    // Act
    await selectDay(page, tomorrow);
    await selectSession(page, wadawdSessionAt20_00);
    await selectSeat(page, disabledSeat);

    // Assert
    const buttonIsDisabled = await isDisabled(page, acceptButton);
    expect(buttonIsDisabled).toBe(true);
  });
});
