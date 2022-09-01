import React, {Component} from "react";
import { Link } from "react-router-dom";


import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { Button } from "@material-ui/core";

function getHeaders(json) {
    return Object.keys(json[0]);
}

function getRows(json, ){//hidden) { //) {
    let rows = [];
    for (let i = 0; i < json.length; i++) {
        rows.push(
            {'key' : i,
            'values': Object.values(json[i]),
            // 'hidden': hidden[i]
            });
    }

    return rows;
}

// function objectView() {
//     this.context.router.push({ //browserHistory.push should also work here
//         pathname: "/volunteer",
//         state: {id: 1}
//     }); 
// }
/*
Props: 
rows (list of objects)
headers
button values
edit option
delete option
object name
*/
export default class SimpleTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        if (data.length == 0) {
            return (<div></div>);
        }
        else {
        let rows = getRows(data);
        let headers = getHeaders(data);

        return (
            <TableContainer component={Paper}>
              <Table aria-label="simple table" component='div'>
                <TableHead component='div'>
                  <TableRow component='div'>
                  {headers.map((header) => (
                      <TableCell component='div' align="right">{header}</TableCell>
                  ))}
                  {this.props.edit && <TableCell component='div' align="right"></TableCell>}
                    {this.props.delete && <TableCell component='div' align="right"></TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody component='div'>
                  {rows.map((row) => (
                    <TableRow key={row.key} component='div'>
                      {/* <TableCell component="th" scope="row">
                        {row[0]}
                      </TableCell> */}
                      
                      {row.values.map((cell) => (
                        <TableCell align="right"  component={Link} to='/volunteer1'>{cell}</TableCell>
                      ))}
                      
                      {this.props.edit && <TableCell component='div' align="right" ><Button>Edit</Button></TableCell>}
                      {this.props.delete && <TableCell component='div' align="right"><Button>Delete</Button></TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>);
        }
    }
    
}

SimpleTable.defaultProps = {
    data: [],
  //  hidden_data: [],
    edit: false,
    delete: false,
    object_name: ''
}

