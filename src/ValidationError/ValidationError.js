import React from 'react';

export default function ValidationError(props) {
  if(props.message) {
    return (
      <div className="error-message">{props.message}</div>
    );
  }
  return <></>
}