const { Given, When, Then } = require("@cucumber/cucumber");
const puppeteer = require("puppeteer");
const assert = require("assert");
const {
  selectDay,
  selectSession,
  selectAvailableSeat,
  bookTickets,
  getText,
  selectSeat,
  isDisabled,
} = require("../../lib/commands.js");

Given("user is on the booking page", async function () {
  await this.page.goto("https://qamid.tmweb.ru/client/index.php");
});

//Dates
When("user selects tomorrow's date", async function () {
  await selectDay(this.page, ".page-nav a:nth-child(2)");
});
When("user selects the last available date", async function () {
  await selectDay(this.page, ".page-nav a:nth-child(7)");
});

//Seanses
When(
  "user selects the session of the movie Stalker at 13:00",
  async function () {
    await selectSession(
      this.page,
      '.movie-seances__time[data-seance-id="217"][data-seance-start="780"]',
    );
  },
);

When(
  "user selects the session of the movie Witcher at 17:00",
  async function () {
    await selectSession(
      this.page,
      '.movie-seances__time[data-seance-id="225"][data-seance-start="1020"]',
    );
  },
);

When(
  "user selects the session of the movie wadawd at 20:00",
  async function () {
    await selectSession(
      this.page,
      '.movie-seances__time[data-seance-id="239"][data-seance-start="1200"]',
    );
  },
);

//seats
When("user selects one available regular seat", async function () {
  await selectAvailableSeat(this.page, "buying-scheme__chair_standart");
});

When("user selects three available VIP seats", async function () {
  await selectAvailableSeat(this.page, "buying-scheme__chair_vip", 3);
});

When("user selects one available disabled seat", async function () {
  await selectSeat(
    this.page,
    ".buying-scheme__row:nth-child(7) .buying-scheme__chair_disabled:nth-child(2)",
  );
});

//Booking button
When("user clicks the book button", async function () {
  await bookTickets(this.page);
});

//Then
Then("the booking confirmation button should be displayed", async function () {
  const buttonText = await getText(this.page, ".acceptin-button");
  assert.strictEqual(buttonText, "Получить код бронирования");
});

Then("the booking button should be disabled", async function () {
  const buttonIsDisabled = await isDisabled(this.page, ".acceptin-button");
  assert.strictEqual(buttonIsDisabled, true);
});
