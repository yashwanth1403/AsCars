import { Link } from "react-router-dom";
import { BUSINESS_ADDRESS, BUSINESS_NAME, PHONE_DISPLAY } from "../config/business";
import Container from "./Container";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <Container className="py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <img 
              src="/logo.png" 
              alt={BUSINESS_NAME} 
              className="h-12 lg:h-16 w-auto object-contain bg-white rounded p-2" 
            />
            <p className="text-sm opacity-75">{BUSINESS_ADDRESS}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-60">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Browse Cars", to: "/cars" },
                { label: "Sell Your Car", to: "/sell-car" },
                { label: "About Us", to: "/about" },
                { label: "Testimonials", to: "/testimonials" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="opacity-75 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-60">
              Contact
            </h3>
            <ul className="space-y-2 text-sm opacity-75">
              <li>📞 {PHONE_DISPLAY}</li>
              <li>📍 {BUSINESS_ADDRESS}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-xs opacity-50">
          © {year} {BUSINESS_NAME}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
