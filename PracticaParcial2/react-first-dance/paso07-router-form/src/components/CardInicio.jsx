import React from "react";

const CardInicio = (props) => {
  return (
    <div className="col-md-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <div className="landing-icon mb-3">
            <i className="bi bi-geo-alt-fill"></i>
          </div>
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text text-muted">{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default CardInicio;
