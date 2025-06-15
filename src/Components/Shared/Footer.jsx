import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <img
              src="https://i.ibb.co/TxWwbdBL/book-logo.jpg"
              alt="Logo"
              className="h-12 mb-4 rounded-3xl"
            />
            <h2 className="text-2xl font-bold">Book Heaven</h2>
            <p className="mt-2 text-sm">Your gateway to endless stories</p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">Email: support@bookheaven.com</p>
            <p className="text-sm">Phone: +1 (800) 123-4567</p>
            <p className="text-sm">
              Address: 123 Story Lane, Book City, BC 12345
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="hover:underline text-sm">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm8.5 1.5a4.25 4.25 0 00-4.25 4.25 4.25 4.25 0 008.5 0 4.25 4.25 0 00-4.25-4.25zm0 6.82a2.57 2.57 0 110-5.14 2.57 2.57 0 010 5.14zM12 7.75a4.25 4.25 0 00-4.25 4.25 4.25 4.25 0 008.5 0A4.25 4.25 0 0012 7.75zm0 6.82a2.57 2.57 0 110-5.14 2.57 2.57 0 010 5.14z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/30 text-center">
          <p className="text-sm">© 2025 BookHaven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
