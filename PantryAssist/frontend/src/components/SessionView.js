import React, {Component} from "react";
import { render } from "react-dom";
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

    createPackage() {
        let data = {
            'type': "family",
            'session_id': "1",
            'client_id': "1",
        }
        fetch('/api/post_package', {
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
    }
    render() {
        console.log(this.getCases());
        return (<div>
            <h1>This is the Session View!</h1>
            <table></table>
            
            <button onClick={this.createPackage}>Create Package</button>
            </div>);
    }
}