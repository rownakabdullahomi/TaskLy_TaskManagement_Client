import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-center gap-4 px-4 lg:px-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="footer pt-10 footer-center   text-gray-400">
        <aside>
          <div className="font-semibold text-center">
            <div className="flex items-center justify-center gap-2">
              <p className="mt-[1px]">
                Copyright © {new Date().getFullYear()} - All rights reserved by
              </p>
              <Link to="/" className="text-lg font-bold tracking-tight">
                <div className=" text-gray-400">
                  <span className="text-warning">Task</span>
                  <span className="text-white">Ly</span>
                </div>
              </Link>
            </div>
          </div>
        </aside>
      </div>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-yellow-500"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-yellow-500"
          >
            <FaYoutube />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-yellow-500"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-yellow-500"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-yellow-500"
          >
            <FaLinkedin />
          </a>
        </div>
        <div className="divider divider-secondary m-0"></div>
        <p className=" pb-6">
          Powered by <span className="text-warning">Rownak</span>
        </p>
      </nav>
    </footer>
  );
};

export default Footer;
