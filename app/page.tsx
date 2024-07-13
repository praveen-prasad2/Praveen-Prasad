import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";


export default function Page() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-[#8000FF] poppins text-[30px]">Coming Soon</h1>
      {/* Social Icons */}
      <div className=" flex flex-row gap-2 items-center py-5">
        <p>Get in touch:</p>
        <FaInstagram />
        <FaXTwitter />
        <FaLinkedin />
        <FaGithub />
        <FaWhatsapp />

      </div>
    </div>
  );
}
