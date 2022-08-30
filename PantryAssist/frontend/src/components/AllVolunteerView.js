import React, {Component} from "react";
import { render } from "react-dom";
import TimeTable from "./TimeTable";
import SimpleTable from "./Table";
//import Button from "material-ui/core/Button"

// let csrf;
// fetch('/api/get_csrf')
// .then((response) => response.json())
// .then((data) => {
//     csrf = data.csrfmiddlewaretoken;
// });


export default class AllVolunteerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volunteer_data:[],
            hidden_data:[]
        };
    }

    getVolunteers() {
        fetch('/api/all_volunteers')
            .then((response) => response.json())
            .then((data) => {
            let volunteer_data = [];
            let hidden_data = [];
            for (let i = 0; i < data.length; i++) {
                let volunteer = data[i];
                volunteer_data.push({
                    'name': volunteer.first_name + ' ' + volunteer.last_name + ' (' + volunteer.preferred_name + ')',
                    'email': volunteer.email
                });
                hidden_data.push({
                    'name': volunteer.first_name + ' ' + volunteer.last_name + ' (' + volunteer.preferred_name + ')',
                    'id': volunteer.id
                })
            }
            this.setState({
                volunteer_data: volunteer_data,
                hidden_data: hidden_data
            });
        });
    }

    createVolunteer() {
        let data = {
            'first_name': "api_test",
            'last_name': "apitest",
            'preferred_name': "apitest",
            'email': "apitest@apitest.com",
        }
        fetch('/api/volunteer', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
        render()
    }
    render() {
        this.getVolunteers();
        return (<div>
            <h1>This is the Volunteer View! kljdlfkjsdfldsjflsdfjsdflkjsdfkldsjfsdlfjsldflsd</h1>
            <hr
        style={{
          background: 'lime',
          color: 'lime',
          borderColor: 'lime',
          height: '3px',
        }}
      />      
            <SimpleTable object_name='volunteer' data={this.state.volunteer_data} edit={true} delete={true} hidden_data={this.state.hidden_data}/>
            <div id='hey'>
                <TimeTable />
            </div>
            
            <button onClick={this.createVolunteer}>Create Volunteer</button>
            </div>);
    }
}