import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="relative bottom-0 my-14 items-center border-t-2 border-neutral-300 pb-10 lg:my-20 lg:pb-0 dark:border-neutral-700">
      <div className="mx-auto my-6 flex flex-col justify-evenly space-x-0 space-y-3 text-base font-bold lg:my-16 lg:flex-row lg:items-center lg:space-y-0 lg:text-lg">
        <p className="text-neutral-500">
          &copy; Event. {new Date().getFullYear()} All rights reserved.
        </p>
        <a href="">About</a>
        <a href="">Contact</a>
        <a href="">Privacy</a>
        <a href="">Terms</a>
        <div className="flex justify-center space-x-3">
          <a
            href="https://github.com/ErickRz21/saltillo-ad"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="icon"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/ericks_ruiz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="icon"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
