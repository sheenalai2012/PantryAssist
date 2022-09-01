import React, {Component} from "react";
import { useParams } from 'react-router-dom';
import { useState } from "react";

import TimeTable from "./TimeTable";
import DialogForm from "./DialogForm"


export default class VolunteerView extends Component {
    constructor (props) {
        super(props);

        const {id} = this.props.match.params;
        this.state = {
            shifts: [],
            first_name: "",
            last_name: "",
            preferred_name: "",
            email: "",
            found: false,
            
        }
        this.addShift = this.addShift.bind(this)

        this.getVolunteerInfo(id);
    }
 
    
    getVolunteerInfo(id) {
        fetch('/api/volunteer/' + id)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.shifts);
                let shifts = []
                for (let i = 0; i < data.shifts.length; i++) {
                    let shift = data.shifts[i];
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
                    shifts: shifts,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    preferred_name: data.preferred_name,
                    email: data.email,
                    found: true
                });
        });
    }

    addShift(first_name) {
        this.setState({
            first_name: first_name
         });
    }

    
    render() {
        return (
            <div>
                {this.state.found && (<div> 
                    <h1>{this.state.first_name} {this.state.last_name}sdfsd ({this.state.preferred_name})</h1> 
                    <p>Email: {this.state.email}</p> 
                    <TimeTable shifts={this.state.shifts}/> 
                    <DialogForm submit={this.addShift}/>
                    </div>
                )}
                {!this.state.found &&
                    <div>Volunteer does not exist.</div>
                }
            </div>
        );
    }

}

