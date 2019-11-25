import React from "react"

function Component(props) {
    const { className } = props;
    return (
        <div className={`btn ${className}`}></div>
    );
}

export default Component;