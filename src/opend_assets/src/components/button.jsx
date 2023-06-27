import React  from "react";
function Buttion(props){
    return (
        <div className="Chip-root makeStyles-chipBlue-108 Chip-clickable">
            <span
              onClick={props.handleClick}
              className="form-Chip-label"
            >
              {props.text}
            </span>
            </div>
    )
}

export default Buttion;