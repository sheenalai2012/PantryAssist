import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";

// If you use the default popups, use this.
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

// import "./styles.css";
var gapi = window.gapi;
var CLIENT_ID = "889612418739-ik8gohl2ilqs2npf9kib62ulisbafll6.apps.googleusercontent.com"
var API_KEY = "AIzaSyAWLGefhEUZ5IsITdufucdyFtM0ysPCJWg"
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
var SCOPES = "https://www.googleapis.com/auth/calendar.events"


const initialEvents = [
    {
      id: '1',
      calendarId: '0',
      title: 'Lunch',
      category: 'time',
      start: '2022-08-30T12:00:00',
      end: '2022-08-30T13:30:00',
    },
    {
      id: '2',
      calendarId: '0',
      title: 'Coffee Break',
      category: 'time',
      start: '2022-08-31T15:00:00',
      end: '2022-08-31T15:30:00',
    },
  ];

const weekOptions = {taskView: false, eventView: ['time']}

const handleClick = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
        plugin_name: "PantryAssist"
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'));

    //   gapi.load('client:auth2', start).then(() => {
        
        // var event = {
        //   'summary': 'Awesome Event!',
        //   'location': '800 Howard St., San Francisco, CA 94103',
        //   'description': 'Really great refreshments',
        //   'start': {
        //     'dateTime': '2020-06-28T09:00:00-07:00',
        //     'timeZone': 'America/Los_Angeles'
        //   },
        //   'end': {
        //     'dateTime': '2020-06-28T17:00:00-07:00',
        //     'timeZone': 'America/Los_Angeles'
        //   },
        //   'recurrence': [
        //     'RRULE:FREQ=DAILY;COUNT=2'
        //   ],
        //   'attendees': [
        //     {'email': 'lpage@example.com'},
        //     {'email': 'sbrin@example.com'}
        //   ],
        //   'reminders': {
        //     'useDefault': false,
        //     'overrides': [
        //       {'method': 'email', 'minutes': 24 * 60},
        //       {'method': 'popup', 'minutes': 10}
        //     ]
        //   }
        // }

        // var request = gapi.client.calendar.events.insert({
        //   'calendarId': 'primary',
        //   'resource': event,
        // })

        // request.execute(event => {
        //   console.log(event)
        //   window.open(event.htmlLink)
        // })
        

        /*
            Uncomment the following block to get events
        */
        
        // get events
        console.log(gapi.client.calendar);
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items
          console.log('EVENTS: ', events)
        })
        
    

      //})
    })
  }




export default class TimeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shifts:[]
        }
    }

    getShifts(id) {
        fetch('/api/shift/' + id, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            }
        })
            .then(response => {
                return response.json();
            }).then(data => {
                let shifts = []
                for (let i = 0; i < data.length; i++) {
                    let shift = data[i];
                    shifts.push(
                        {
                            id: i,
                            title: 'Shift',
                            category: 'time',
                            start: shift.start,
                            end: shift.end
    
                        }
                    );
                }
                this.setState({
                    shifts: shifts
                  });
             })
            .catch(err => {
                console.log(err)
            });  
    }

    render () {
       // this.getShifts(1);

        return (
            <div className="App">
            <button style={{width: 100, height: 50}} onClick={handleClick}>Add Event</button>
            <h1>Hellos!</h1>
            {/* <Calendar
                view="week"
                isReadOnly="true"
                // calendars={[
                //   {
                //     id: "0",
                //     name: "Private",
                //     bgColor: "#9e5fff",
                //     borderColor: "#9e5fff"
                //   },
                events={this.state.shifts}
                week= {weekOptions}
                
                // ]}
            /> */}
            </div>
        );
    }
}

