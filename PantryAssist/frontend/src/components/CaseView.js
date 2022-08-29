import React, {Component} from "react";
import { render } from "react-dom";
import TimeTable from "./TimeTable";

//import Button from "material-ui/core/Button"

// let csrf;
// fetch('/api/get_csrf')
// .then((response) => response.json())
// .then((data) => {
//     csrf = data.csrfmiddlewaretoken;
// });

export default class CaseView extends Component {
    constructor(props) {
        super(props);
    }

    getCases() {
        fetch('/api/all_cases')
        .then((response) => response.json())
        .then((data) => {
            const rows = [];
            // for (let i = 0; i < data.length; i++) {
            //     rows.push(<tr key={i}><td>{data[i].first_name}</td></tr>);
            // }
            return (<tbody>{rows}</tbody>);
        });
    }

    createCase() {
        let data = {
            'first_name': "api_test",
            'last_name': "apitest",
            'preferred_name': "apitest",
            'email': "apitest@apitest.com",
            'age': "20",
            // 'csrfmiddlewaretoken': csrf,
        }
        fetch('/api/post_case', {
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
        console.log(this.getCases());
        return (<div>
            <h1>This is the Case View! kljdlfkjsdfldsjflsdfjsdflkjsdfkldsjfsdlfjsldflsd</h1>
            <hr
        style={{
          background: 'lime',
          color: 'lime',
          borderColor: 'lime',
          height: '3px',
        }}
      />       <table></table>
            <div id='hey'>
                <TimeTable />
            </div>
            
            <button onClick={this.createCase}>Create Case</button>
            </div>);
    }
}