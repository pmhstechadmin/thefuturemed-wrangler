
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

const CommunityAdsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample ads data - you can replace this with actual data from your backend
  const ads: Ad[] = [
    {
      id: '1',
      title: 'Medical Conference 2024',
      description: 'Join the biggest medical conference of the year. Register now!',
      image: '/placeholder.svg',
      buttonText: 'Register Now',
      buttonLink: '#',
      backgroundColor: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      id: '2',
      title: 'New Medical Equipment',
      description: 'Discover the latest medical equipment and technology.',
      image: '/placeholder.svg',
      buttonText: 'Learn More',
      buttonLink: '#',
      backgroundColor: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      id: '3',
      title: 'Clinical Research Opportunities',
      description: 'Participate in groundbreaking clinical research studies.',
      image: '/placeholder.svg',
      buttonText: 'Apply Now',
      buttonLink: '#',
      backgroundColor: 'bg-gradient-to-r from-purple-500 to-purple-600'
    },
    {
      id: '4',
      title: 'Medical Journal Subscription',
      description: 'Stay updated with the latest medical research and publications.',
      image: '/placeholder.svg',
      buttonText: 'Subscribe',
      buttonLink: '#',
      backgroundColor: 'bg-gradient-to-r from-red-500 to-red-600'
    }
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ads.length]);

  return (
    <div className="mb-8">
      <Carousel className="w-full max-w-full">
        <CarouselContent>
          {ads.map((ad, index) => (
            <CarouselItem key={ad.id}>
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className={`${ad.backgroundColor} text-white p-0`}>
                  <div className="flex items-center h-48 md:h-32">
                    <div className="flex-1 p-6">
                      <h3 className="text-xl font-bold mb-2">{ad.title}</h3>
                      <p className="text-white/90 mb-4 text-sm">{ad.description}</p>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => window.open(ad.buttonLink, '_blank')}
                        className="bg-white text-gray-900 hover:bg-gray-100"
                      >
                        {ad.buttonText}
                      </Button>
                    </div>
                    <div className="hidden md:block w-32 h-32 flex-shrink-0 mr-6">
                      <img 
                        src={ad.image} 
                        alt={ad.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      
      {/* Carousel indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityAdsCarousel;
