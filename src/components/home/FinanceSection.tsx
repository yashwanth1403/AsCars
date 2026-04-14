import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FinanceSection = () => {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Card className="bg-primary text-primary-foreground border-none">
          <CardContent className="p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
            <div className="flex-1 space-y-4 text-center sm:text-left">
              <h2 className="text-2xl font-bold sm:text-3xl text-white">
                Easy Car Loans & EMI Options
              </h2>
              <div className="inline-block border border-white/20 bg-white/10 rounded px-3 py-1.5 backdrop-blur-sm">
                <p className="text-sm font-semibold tracking-wide">
                  Flexible Financing Available
                </p>
              </div>
              <p className="text-primary-foreground/90 max-w-md text-base leading-relaxed">
                Drive your dream car home today with our general loan and
                flexible EMI options. We ensure you get approved quickly and
                hassle-free.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary-dark w-full sm:w-auto text-base px-8 shrink-0"
              onClick={() =>
                window.open(
                  `https://wa.me/919848015809?text=${encodeURIComponent("Hi, I want to check my EMI eligibility.")}`,
                  "_blank",
                )
              }
            >
              Check EMI Eligibility
            </Button>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
};

export default FinanceSection;
