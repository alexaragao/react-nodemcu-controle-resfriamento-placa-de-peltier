import React from 'react';

function Component(props) {
  function handleChange(e) {
    e.preventDefault();
    
    if (props.onChange !== null) {props.onChange(e.target.value)}
  }

  return (
    <div
      class="form-group mb-2"
    >
      <input
        style={{
          color: "#9A99A1!important"
        }}
        className="form-control border-black bg-light border-width-2 border-radius-3"
        type={props.type ? props.type : "text"}
        placeholder={props.placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default Component;