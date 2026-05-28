import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

/**
 * SiteLayout – wraps every public page.
 * - Sticky Navbar (transparent → solid on scroll)
 * - Footer
 * - Floating WhatsApp button
 * - pt-16 to offset fixed navbar height
 */
const SiteLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    setRouteLoading(true);
    const timer = window.setTimeout(() => setRouteLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {routeLoading && (
        <div className="fixed top-16 left-0 right-0 z-[60] h-1 overflow-hidden bg-primary/10">
          <div className="h-full w-1/3 bg-primary animate-[loadingbar_1s_ease-in-out_infinite]" />
        </div>
      )}
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default SiteLayout;
