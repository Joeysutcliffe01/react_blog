import React from "react";
import footerBg from "../../Assets/Blobs/blob_4.svg";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <section className="footer_section">
      <img src={footerBg} alt="" className="footer_section_bg" />
    </section>
  );
};
