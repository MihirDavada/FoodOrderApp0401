import React from "react";
import "./Input.css";

// {...props.input} = id:'amount' + props.id, type:'number', min:'1', max:'5', step:'1', defaultValue:'1'
const Input = React.forwardRef( (props, ref) => {
  return (
    <div className="input">
      <label> {props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
