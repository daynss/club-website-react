import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";

const LinkButton = ({
  label,
  kind = "primary",
  href,
  iconRight = false,
  iconLeft = false,
}) => {
  const classNames = {
    primary: "link-button-primary",
    ghost: "link-button-ghost",
  };
  return (
    <Link
      to={href}
      className={`link-button ${classNames[kind]} ${
        iconRight ? "icon-right" : iconLeft ? "icon-left" : ""
      }`}
    >
      {iconLeft && <BsArrowLeft />}
      <span>{label}</span>
      {iconRight && <BsArrowRight />}
    </Link>
  );
};

export default LinkButton;
