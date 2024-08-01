import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-[#8000FF] poppins text-[30px]">
        Coming Soon<span className="animate-blink">.</span>
        <span className="animate-blink animation-delay-200">.</span>
        <span className="animate-blink animation-delay-400">.</span>
      </h1>
      {/* Social Icons */}
      <div className=" flex flex-row gap-1  items-center py-5">
        <p className="poppins text-[20px]">Get in touch:</p>
        <div className="flex items-center ">
          <Link href="https://www.instagram.com/praveen_prasaad/">
            <FaInstagram className="text-[45px] rounded-[50px] p-2 hover:bg-[#8000ff]" />
          </Link>
          <Link href="https://x.com/uglymallu">
            <FaXTwitter className="text-[45px] rounded-[50px] p-2 hover:bg-[#8000ff]" />
          </Link>
          <Link href="https://www.linkedin.com/in/praveen-prasad-14764b231/">
            <FaLinkedin className="text-[45px] rounded-[50px] p-2 hover:bg-[#8000ff]" />
          </Link>
          <Link href="https://github.com/praveen-prasad2">
            <FaGithub className="text-[45px] rounded-[50px] p-2 hover:bg-[#8000ff]" />
          </Link> 
          <Link href="https://wa.me/917306573563">
            <FaWhatsapp className="text-[45px] rounded-[50px] p-2 hover:bg-[#8000ff]" /> 
          </Link>
        </div>
      </div>
    </div>
  );
}
