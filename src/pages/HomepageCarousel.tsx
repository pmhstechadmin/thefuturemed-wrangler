// import { useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client";

// interface CarouselItem {
//   id: string;
//   img_url: string;
//   redirect_url: string;
//   showorder?: number;
//   alt_text?: string;
// }

// const HomepageCarousel = () => {
//   const [items, setItems] = useState<CarouselItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCarouselItems = async () => {
//       try {
//           // Remove generic typing from .from() and use type assertion
//           console.log("calling fetchCarouselItems");
//           const { data, error } = await supabase
//           .from("ads")
//           .select("id,img_url, redirect_url")
//           .eq("location", "homepage")
//           .eq("status", true)
//           .order("showorder", { ascending: true });
          
//           console.log("llllllllll",data)
//           console.log("jjjjjjjjjjj",error)
//         if (error) throw error;

//         setItems((data as unknown as CarouselItem[]) || []);
//         setLoading(false);
        
//       } catch (err) {
//         const errorMessage =
//           err instanceof Error ? err.message : "Unknown error";
//         setError(errorMessage);
//         setLoading(false);
//         console.error("Error fetching carousel items:", err);
//       }
//     };

//     fetchCarouselItems();
//   }, []);

//   // ... rest of your component remains the same
//   if (loading) {
//     return <div className="text-center py-8">Loading carousel...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-8 text-red-500">Error: {error}</div>;
//   }

//   if (items.length === 0) {
//     return <div className="text-center py-8">No carousel items found</div>;
//   }

//   return (
//     <section className="container mx-auto px-4">
//       <div
//         id="homepageCarousel"
//         className="carousel slide"
//         data-bs-ride="carousel"
//       >
//         <div className="carousel-inner">
//           {items.map((item, index) => (
//             <div
//               key={item.id}
//               className={`carousel-item ${index === 0 ? "active" : ""}`}
//             >
//               <a
//                 href={item.redirect_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <img
//                   src={item.img_url}
//                   className="d-block w-100"
//                   alt={item.alt_text || `Carousel item ${index + 1}`}
//                   loading="lazy"
//                 />
//               </a>
//             </div>
//           ))}
//         </div>

//         {items.length > 1 && (
//           <>
//             <button
//               className="carousel-control-prev"
//               type="button"
//               data-bs-target="#homepageCarousel"
//               data-bs-slide="prev"
//             >
//               <span
//                 className="carousel-control-prev-icon"
//                 aria-hidden="true"
//               ></span>
//               <span className="visually-hidden">Previous</span>
//             </button>
//             <button
//               className="carousel-control-next"
//               type="button"
//               data-bs-target="#homepageCarousel"
//               data-bs-slide="next"
//             >
//               <span
//                 className="carousel-control-next-icon"
//                 aria-hidden="true"
//               ></span>
//               <span className="visually-hidden">Next</span>
//             </button>
//           </>
//         )}
//       </div>
//     </section>
// )};

// export default HomepageCarousel;

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import "bootstrap/dist/js/bootstrap.bundle.min"

interface CarouselItem {
  id: string;
  img_url: string;
  redirect_url: string;
  showorder?: number;
  alt_text?: string;
}

const HomepageCarousel = () => {
  const [items, setItems] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize carousel after items are loaded
     if (items.length > 0) {
        const carouselElement = document.getElementById('homepageCarousel');
        if (carouselElement && window.bootstrap) {
          new window.bootstrap.Carousel(carouselElement, {
            interval: 5000,
            ride: 'carousel'
          });
        }
    }
  }, [items]);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const { data, error } = await supabase
          .from("ads")
          .select("id, img_url, redirect_url, showorder")
          .eq("location", "homepage")
          .eq("status", true)
          .order("showorder", { ascending: true });

        if (error) throw error;

        setItems((data as unknown as CarouselItem[]) || []);
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        setLoading(false);
        console.error("Error fetching carousel items:", err);
      }
    };

    fetchCarouselItems();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading carousel...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (items.length === 0) {
    return <div className="text-center py-8">No carousel items found</div>;
  }

  return (
    <section className="container mx-auto px-4">
      <div
        id="homepageCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <a
                href={item.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={item.img_url}
                  className="d-block w-100"
                  alt={item.alt_text || `Carousel item ${index + 1}`}
                  loading="lazy"
                />
              </a>
            </div>
          ))}
        </div>

        {items.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#homepageCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#homepageCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default HomepageCarousel;