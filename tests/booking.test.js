const {
  selectDay,
  selectSession,
  selectAvailableSeat,
  bookTickets,
  getText
} = require("../lib/commands.js");


let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(async () => {
  await page.close();
});


describe ("Booking tickets", () => {
    test ("Successful booking of a regular seat for tomorrow", async () => {
        // Arrange
        const tomorrow = ".page-nav a:nth-child(2)";
        const sessionAt13_00 = '.movie-seances__time[data-seance-id="217"][data-seance-start="780"]';
        const acceptButton = ".acceptin-button";
        const expectedButtonText = "Получить код бронирования";
        
        // Act
        await selectDay(page, tomorrow);
        await selectSession(page, sessionAt13_00);
        await selectAvailableSeat(page, "buying-scheme__chair_standart");
        await bookTickets(page);

        // Assert
        const actualButtonText = await getText(page, acceptButton);
        expect(actualButtonText).toContain(expectedButtonText);
  });

    test ("Successful booking of three VIP seats for the last available date", async () => {
              // Arrange
        const lastAvailableDate = ".page-nav a:nth-child(7)";
        const sessionAt17_00 = '.movie-seances__time[data-seance-id="225"][data-seance-start="1020"]';
        const acceptButton = ".acceptin-button";
        const expectedButtonText = "Получить код бронирования";
        
        // Act
        await selectDay(page, lastAvailableDate);
        await selectSession(page, sessionAt17_00);
        await selectAvailableSeat(page, "buying-scheme__chair_vip", 3);
        await bookTickets(page);

        // Assert
        const actualButtonText = await getText(page, acceptButton);
        expect(actualButtonText).toContain(expectedButtonText);
    });

    test ("Disabled seat cannot be booked", async () => {
        // Arrange: tomorrow, movie wadawd, 20:00 session, one disabled seat

        // Act: choose tomorrow, movie wadawd, 20:00 session, one disabled seat and try to book a ticket

        // Assert: booking button is unavailable, seat cannot be selected

    });
});
