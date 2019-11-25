import React from "react"
import "./styles.css"

function Component(props) {
    const { className, children } = props;
    return (
        <div className={`container ${className}`}>
            {children}
        </div>
    );
}

export default Component;