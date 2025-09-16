import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Shield, Leaf, Cpu } from "lucide-react";
import agriculturalSafety from "@/assets/agricultural-safety.jpg";
import organicAgriculture from "@/assets/organic-agriculture.jpg";
import agricultureTechnology from "@/assets/agriculture-technology.jpg";

const EducationSection = () => {
  const educationCards = [
    {
      id: 1,
      title: "Agricultural Safety",
      description: "Training farmers, ranchers, and tree farmers to operate machinery safely and use protective equipment correctly can help reduce the high number of accidents.",
      image: agriculturalSafety,
      icon: Shield,
      duration: "45 mins",
      level: "Beginner"
    },
    {
      id: 2,
      title: "Organic Agriculture",
      description: "Training farmers, ranchers, and tree farmers to operate machinery safely and use protective equipment correctly can help reduce the high number of accidents.",
      image: organicAgriculture,
      icon: Leaf,
      duration: "60 mins",
      level: "Intermediate"
    },
    {
      id: 3,
      title: "Agriculture Technology",
      description: "Training farmers, ranchers, and tree farmers to operate machinery safely and use protective equipment correctly can help reduce the high number of accidents.",
      image: agricultureTechnology,
      icon: Cpu,
      duration: "75 mins",
      level: "Advanced"
    }
  ];

  return (
    <section id="education" className="py-20 bg-agriculture-light/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-agriculture-dark mb-4">EDUCATION</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enhance your farming knowledge with our comprehensive training programs designed to improve productivity and sustainability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {educationCards.map((card) => (
            <Card key={card.id} className="overflow-hidden hover:shadow-elevated transition-all duration-300 group">
              <div className="relative">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="lg" className="bg-white/20 border-white/30 text-white backdrop-blur-sm hover:bg-white/30">
                    <Play className="h-5 w-5 mr-2" />
                    Watch Now
                  </Button>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-hero p-2 rounded-full">
                    <card.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-sm">
                  {card.duration}
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-agriculture-light rounded-full text-agriculture-dark">
                    {card.level}
                  </span>
                </div>
                <CardTitle className="text-xl text-agriculture-dark">{card.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full hover:bg-agriculture-light">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;