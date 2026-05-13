Feature: Ticket booking

    Scenario: Successful booking of a regular seat for tomorrow
        Given user is on the booking page
        When user selects tomorrow's date
        And user selects the session of the movie Stalker at 13:00
        And user selects one available regular seat
        And user clicks the book button
        Then the booking confirmation button should be displayed


    Scenario: Successful booking of three VIP seats for the last available date
        Given user is on the booking page
        When user selects the last available date
        And user selects the session of the movie Witcher at 17:00
        And user selects three available VIP seats
        And user clicks the book button
        Then the booking confirmation button should be displayed


    Scenario: Disabled seat cannot be booked
        Given user is on the booking page
        When user selects tomorrow's date
        And user selects the session of the movie wadawd at 20:00
        And user selects one available disabled seat
        Then the booking button should be disabled