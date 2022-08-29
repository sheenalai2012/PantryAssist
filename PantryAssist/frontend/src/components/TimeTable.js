import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";

// If you use the default popups, use this.
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

// import "./styles.css";

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
        this.getShifts(1);

        return (
            <div className="App">
            <h1>Hello!</h1>
            <Calendar
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
            />
            </div>
        );
    }
}

