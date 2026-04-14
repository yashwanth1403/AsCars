import { Link } from "react-router-dom";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-primary py-20 sm:py-32">
      <Container className="flex flex-col items-center text-center space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl max-w-3xl leading-snug">
          A Multibrand Pre-owned Cars Outlet
        </h1>
        <p className="text-lg text-primary-foreground/75 max-w-2xl font-medium tracking-wide">
          Buy • Sell • Exchange • Finance • Insurance
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto text-base px-8 bg-secondary text-secondary-foreground hover:bg-secondary-dark"
          >
            <Link to="/cars">View Cars</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-base px-8 border-primary-foreground text-background hover:bg-primary-foreground hover:text-primary text-black"
          >
            <Link to="/sell-car">Sell Your Car</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
