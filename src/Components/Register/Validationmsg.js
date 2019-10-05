import React from "react";
import styles from "../register.module.scss";

const ValidationMsg = (props) => {
  return (
    <div className={styles[props.msgClassName]}>
      {props.msg}
    </div>
  )
}

export default ValidationMsg;