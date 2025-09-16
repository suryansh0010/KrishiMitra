import { Sprout, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const navigationLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "About Us", href: "#about" },
    { name: "Copyright Policy", href: "#copyright" },
    { name: "Terms & Conditions", href: "#terms" }
  ];

  return (
    <footer className="bg-agriculture-dark text-white">
      <div className="container px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-harvest-gold to-agriculture-green">
                <Sprout className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold">KrishiMitra</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Empowering farmers with technology-driven solutions for sustainable agriculture and better harvests.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white/80 hover:text-harvest-gold transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-harvest-gold mt-0.5 flex-shrink-0" />
                <div className="text-white/80 text-sm">
                  <p>Ajay Kumar Garg Engineering College,</p>
                  <p>Ghaziabad, Uttar Pradesh</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-harvest-gold" />
                <span className="text-white/80 text-sm">0123456789</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
              <p className="text-xs text-white/70">
                <strong>Note:</strong> For technical support related to KrishiMitra.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © 2025 KrishiMitra. All rights reserved. Built for empowering farmers across India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;