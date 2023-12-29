"use client";

import "./resultTableStyle.css";
import React from "react";
import { Steps } from 'primereact/steps';

const ResultTable = ({childState, setChildState}) => {
    if (childState == null || childState.data == null
        || childState.data.data == null) {
            console.log(childState);
            return null;
        } 
    let roadPlan = childState.data.data.road.roadPlan;
    let items = [];
    let stepId = 0;
    let arrayOfDes = roadPlan.split('/');
    arrayOfDes.forEach((element, i) => {
      items.push({
        label: element,
      });
      if (element == childState.data.data.road.locationPointId)
        stepId = i;
    }); 

    let status = childState.data.data.road.status;
    let statusMessage;
// wait
// move
// drive
// success
// fail
// return
    switch(status) {
      case 'wait':
        statusMessage = 'waiting ';
        break;
      case 'move':
        statusMessage = `Your commodity is moving from ${arrayOfDes[stepId]} to next point`
        break;
      case 'drive':
        statusMessage = 'Your commodity is drived to receiver';
        break;
      case 'success':
        statusMessage = 'Successfully delivered';
        break;
      case 'fail':
        statusMessage = 'Fail to deliver, it will be delivered again soon';
        break;
    }
  return (
    <>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Sender name</th>
            <th>Sender number</th>
            <th>Sender address</th>
            <th>Sender post code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{childState.data.data.inforOder.senderName}</td>
            <td>{childState.data.data.inforOder.senderNumber}</td>
            <td>{childState.data.data.inforOder.senderAddress}</td>
            <td>{childState.data.data.inforOder.senderPostCode}</td>
          </tr>
          {/* <tr>
            <td>{childState.data.data.inforOder.senderAddress}</td>
            <td>{childState.data.data.inforOder.senderNumber}</td>
            <td>{childState.data.data.inforOder.receiverAddress}</td>
            <td>{childState.data.data.inforOder.receiverNumber}</td>
            <td>{childState.data.data.road.locationPointId}</td>
            <td>{childState.data.data.road.status}</td>
          </tr> */}
        </tbody>
      </table>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Receiver name</th>
            <th>Receiver number</th>
            <th>Receiver address</th>
            <th>Receiver postcode</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>{childState.data.data.inforOder.receiverName}</td>
            <td>{childState.data.data.inforOder.receiverNumber}</td>
            <td>{childState.data.data.inforOder.receiverAddress}</td>
            <td>{childState.data.data.inforOder.receiverPostCode}</td>
          </tr>
        </tbody>
      </table>
      <div className="step_container">
        <Steps model={items} readOnly={true} activeIndex={stepId} />
      </div>
      <div className="status_message_container">
        <p>{statusMessage}</p>
      </div>
    </>
  );
};

export default ResultTable;
