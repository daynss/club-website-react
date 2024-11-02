import React from "react";

const Button = ({
  label,
  type = "button",
  renderIcon = false,
  onClick,
  kind = "primary",
  disabled = false,
}) => {
  const classNames = {
    primary: "button-primary",
    danger: "button-danger",
    ghost: "button-ghost",
  };
  return (
    <button
      className={`button ${classNames[kind]}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{label} </span>
      {renderIcon}
    </button>
  );
};

export default Button;
