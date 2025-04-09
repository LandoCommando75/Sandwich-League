import React from 'react';
import { Alert } from 'react-bootstrap';

function AlertList({ alerts }) {
  return (
    <div className="alert-container">
      {alerts.map((alert, index) => (
        <Alert key={index} variant={alert.type}>
          {alert.title}
        </Alert>
      ))}
    </div>
  );
}

export default AlertList;
