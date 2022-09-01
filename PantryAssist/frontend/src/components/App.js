import React, {Component} from "react";
import {render} from "react-dom";
import CaseView from "./CaseView";
import HomeView from "./HomeView";
import TimeTable from "./TimeTable";
import AllVolunteerView from "./AllVolunteerView";
import VolunteerView from "./VolunteerView";
import SimpleTable from "./Table";
import GoogleCalendar from "./GoogleAPI/GoogleCalendar";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect,
} from "react-router-dom";



export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <p>h!!!!</p>
                {/* <GoogleCalendar/> */}

            <Router>
            <Switch>
                <Route exact path="/" element={<TimeTable/>}/>
                <Route path="/cases" element={<CaseView/>}/>
                <Route path="/volunteers" element={<AllVolunteerView/>}/>
                <Route path="/volunteer/:id" render={(matchProps) =>
                    <VolunteerView
                        {...matchProps}
                        {...this.props}
                        handleMatch={this.handleMatch}
                    />}
                />
                <Route path="/test" element={<SimpleTable/>}/>
            </Switch>
            </Router>
            </div>
            );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);