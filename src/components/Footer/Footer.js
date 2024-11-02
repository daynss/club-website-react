import React from "react";
import { MdPhoneAndroid, MdLocationOn } from "react-icons/md";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const iconStyle = {
  verticalAlign: "text-bottom",
  paddingRight: "0.5em",
};

const Footer = () => (
  <div className="footer">
    <div className="contact-info-panel">
      <div className="contact-address">
        <MdLocationOn size={22} style={iconStyle} />
        Imaginarium Club, 55 Imaginary Road, 5213 Made Up but Cool City
        <br />
        <MdPhoneAndroid size={22} style={iconStyle} />
        +331 9990 0023 8812 6334 &nbsp;
      </div>
      <div className="contact-social-media">
        <FaFacebook size={20} /> &nbsp;
        <FaInstagram size={20} />
      </div>
    </div>
  </div>
);

export default Footer;
