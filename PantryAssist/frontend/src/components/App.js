import React, {Component} from "react";
import {render} from "react-dom";
import CaseView from "./CaseView";
import HomeView from "./HomeView";
import TimeTable from "./TimeTable";
import AllVolunteerView from "./AllVolunteerView";
import SimpleTable from "./Table";
import {
    BrowserRouter as Router,
    Routes,
    Route,
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
                <p>hi!!!!</p>
            <Router>
            <Routes>
                <Route exact path="/" element={<TimeTable/>}/>
                <Route path="/cases" element={<CaseView/>}/>
                <Route path="/volunteers" element={<AllVolunteerView/>}/>
                <Route path="/test" element={<SimpleTable/>}/>
            </Routes>
            </Router>
            </div>
            );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);