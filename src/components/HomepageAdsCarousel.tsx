
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
}

const HomepageAdsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample ads data for homepage
  const ads: Ad[] = [
    {
      id: "1",
      title: "Welcome to TheFutureMed",
      // title: 'Welcome to MedPortal',
      description:
        "Your comprehensive platform for medical education and professional development.",
      image: "/placeholder.svg",
      buttonText: "Get Started",
      buttonLink: "/register",
      backgroundColor: "bg-gradient-to-r from-blue-600 to-blue-700",
    },
    {
      id: "2",
      title: "Medical Conference 2024",
      description:
        "Join the biggest medical conference of the year. Network with professionals worldwide.",
      image: "/placeholder.svg",
      buttonText: "Register Now",
      buttonLink: "/e-seminar",
      backgroundColor: "bg-gradient-to-r from-green-600 to-green-700",
    },
    {
      id: "3",
      title: "Advanced E-Learning Courses",
      description:
        "Enhance your medical knowledge with our certified online courses.",
      image: "/placeholder.svg",
      buttonText: "Explore Courses",
      buttonLink: "/e-learning",
      backgroundColor: "bg-gradient-to-r from-purple-600 to-purple-700",
    },
    {
      id: "4",
      title: "Latest Medical Equipment",
      description:
        "Discover cutting-edge medical equipment and pharmaceutical products.",
      image: "/placeholder.svg",
      buttonText: "Browse Products",
      buttonLink: "/dashboard",
      // buttonLink: "/products",
      backgroundColor: "bg-gradient-to-r from-orange-600 to-orange-700",
    },
    {
      id: "5",
      title: "Join Medical Communities",
      description:
        "Connect with healthcare professionals and join specialized medical communities.",
      image: "/placeholder.svg",
      buttonText: "Join Community",
      buttonLink: "/community",
      backgroundColor: "bg-gradient-to-r from-teal-600 to-teal-700",
    },
  ];

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [ads.length]);

  return (
    <div className="mb-16">
      <Carousel className="w-full max-w-full">
        <CarouselContent>
          {ads.map((ad, index) => (
            <CarouselItem key={ad.id}>
              <Card className="border-0 shadow-2xl overflow-hidden">
                <CardContent className={`${ad.backgroundColor} text-white p-0`}>
                  <div className="flex items-center min-h-[200px] md:h-40">
                    <div className="flex-1 p-8">
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">{ad.title}</h3>
                      <p className="text-white/90 mb-6 text-base md:text-lg leading-relaxed">{ad.description}</p>
                      <Button 
                        variant="secondary" 
                        size="lg"
                        onClick={() => window.location.href = ad.buttonLink}
                        className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        {ad.buttonText}
                      </Button>
                    </div>
                    <div className="hidden md:block w-40 h-40 flex-shrink-0 mr-8">
                      <img 
                        src={ad.image} 
                        alt={ad.title}
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
        <CarouselNext className="right-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
      </Carousel>
      
      {/* Carousel indicators */}
      <div className="flex justify-center mt-6 space-x-3">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-blue-600 scale-110' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomepageAdsCarousel;
