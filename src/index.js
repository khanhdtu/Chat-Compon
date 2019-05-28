import React from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import { ComponChart } from './Chart';
import './index.css';

const Author = styled.div`
  font-size: xx-small;
  padding: 5px;
  opacity: 0.4;
`
class App extends React.Component {
  render () {
    const data = {
      "ltr-data": [
        {
          "title": "Budget used",
          "subtitle": "$0.8M",
          "label": "Paid",
          "width": 0.2,
          "color": "#212529"
        },
        {
          "label": "Due soon (7 days or less)",
          "sublabel": "$280K",
          "width": 0.2,
          "color": "#7f7f7f"
        },
        {
          "label": "Overdue",
          "sublabel": "$89K",
          "width": 0.2,
          "color": "#f7ebde"
        },
        {
          "label": "New",
          "sublabel": "$400K",
          "width": 0.2,
          "color": "#b79c7f"
        },
        {
          "title": "Budget set",
          "subtitle": "$2.5M",
          "label": "Remains",
          "sublabel": "$931K",
          "width": 0.2,
          "color": "#c3c3c3"
        }
      ],
      "rtl-data": [
        {
          "label": "Potential Savings",
          "sublabel": "$381K",
          "width": 0.45678,
          "color": "#85cdff"
        }
      ]
    }
    return (
      <React.Fragment>
        <Author>Author: KhanhJS (khanhdtu1993@gmail.com)</Author>
        <ComponChart data={data}/>
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <App />
, document.getElementById('root'));
