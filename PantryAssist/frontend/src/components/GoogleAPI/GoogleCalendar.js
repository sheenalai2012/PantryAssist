import React from "react";

function createMarkup2() {
    var events = ` [{
        'summary': 'Awesome Event!',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'Really great refreshments',
        'start': {
          'dateTime': '2020-06-28T09:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
        'end': {
          'dateTime': '2020-06-28T17:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
        'recurrence': [
          'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
          {'email': 'lpage@example.com'},
          {'email': 'sbrin@example.com'}
        ],
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10}
          ]
        }
      }]`
    return {
        __html: `
        <button id="showEventsBtn" style="visibility:hidden;" onload="checkBeforeStart();" onclick="showEvents(${events});">Add to Google Calendar</button>`
    };
}

export default function GoogleCalendar() {
    return (<div dangerouslySetInnerHTML={createMarkup2()} />);
}