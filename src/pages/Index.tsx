import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import EducationSection from "@/components/EducationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <EducationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;