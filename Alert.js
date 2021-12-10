import React, { useEffect } from "react";

const Alert = ({ message, type, removeAlert, list }) => {

  useEffect(() => {
    let interval = setInterval(() => {
      removeAlert();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [list]);

  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;
