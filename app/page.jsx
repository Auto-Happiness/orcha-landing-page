"use client"
import { HeroSection } from "@/components/ui/hero-section";
import { AppleCarousel } from "@/components/ui/aceternity/apple-carousel";
import Link from "next/link";
import city from "@/assets/orcas-working.png"
import Image from "next/image";
import embBg from "@/assets/emb.jpg";
import embLogo from "@/assets/emb-logo.png";
export default function Home() {
return (
<main className="bg-gray-900">
   <HeroSection />
   <section className="py-24 bg-gray-900 text-white px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
         <div className="flex justify-center">
            <img
               src={city.src}
               alt="About Orcha Solutions"
               className="rounded-lg shadow-lg max-w-full h-auto"
               />
         </div>
         <div>
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
               At Orcha Solutions, we specialize in designing and implementing
               custom software and IT systems tailored to streamline business workflows,
               boost efficiency, and foster innovation across enterprises.
            </p>
            <Link
               href="/about"
               className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white rounded-lg shadow-md hover:opacity-90 transition"
               >
            Learn More About Us
            </Link>
         </div>
      </div>
   </section>

  {/* case studies */}
  <section className="py-24 bg-gray-950 px-6">
    <div className="max-w-6xl mx-auto text-center">
      {/* removed mb-10 */}
      <h2 className="text-3xl font-bold text-white">
        Client Success Journeys
      </h2>
      <p className="text-lg text-gray-300 mt-2">
        See how businesses like yours are driving success with us.
      </p>
      <AppleCarousel
        items={[
          {
            id: 1,
            title: "Environmental Data in EIRS",
            category: "AI Automation",
            description:
              "We're creating a smart system that lets EMB staff and the public ask questions about environmental data in Tagalog or English. It gives clear, accurate answers using information from the EIRS, making data more accessible to our community.",
            image: embBg.src,
            logo: embLogo.src,
          },
         //  {
         //    id: 2,
         //    title: "Software Development",
         //    category: "Custom Solutions",
         //    description:
         //      "End-to-end software design and development from concept to deployment.",
         //    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8YN2m0dPdMlXyX4r74veeLMIHS1gRrIuFMg&s",
         //  },
         //  {
         //    id: 3,
         //    title: "Environmental Data in EIRS",
         //    category: "AI Automation",
         //    description:
         //      "We're creating a smart system that lets EMB staff and the public ask questions about environmental data in Tagalog or English. It gives clear, accurate answers using information from the EIRS, making data more accessible to our community.",
         //    image: embBg.src,
         //    logo: embLogo.src,
         //  },
         //  {
         //    id: 4,
         //    title: "Software Development",
         //    category: "Custom Solutions",
         //    description:
         //      "End-to-end software design and development from concept to deployment.",
         //    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8YN2m0dPdMlXyX4r74veeLMIHS1gRrIuFMg&s",
         //  },
        ]}
        renderCard={(item) => (
          <div className="relative flex-shrink-0 w-full" style={{ flex: '0 0 100%' }}>
            <div className="group relative h-[30rem] w-[70rem] overflow-hidden rounded-xl bg-neutral-200 cursor-pointer mx-auto flex flex-col justify-center items-center">
              {/* Blurred background image */}
              <Image
                src={item.image}
                alt={item.description}
                fill
                className="absolute inset-0 h-full w-full object-cover blur-sm scale-105 z-0"
                style={{ objectFit: 'cover' }}
                priority={item.id === 1}
              />
              {/* Overlay for darkening */}
              <div className="absolute inset-0 z-10 bg-black/40 transition-colors group-hover:bg-black/30" />
              {/* Card content for EMB card */}
              {item.id === 1 ? (
                <div className="relative z-20 flex flex-col items-center justify-center h-full w-full px-8">
                  {/* Logo at top center */}
                  <div className="mb-8 mt-8">
                    <Image src={item.logo} alt="EMB Logo" width={160} height={160} className="mx-auto rounded-xl bg-black/40 p-6" />
                  </div>
                  {/* Description large */}
                  <div className="flex-1 flex items-center justify-center w-full">
                    <p className="text-2xl md:text-3xl font-semibold text-white text-center leading-snug drop-shadow-lg">
                      {item.description}
                    </p>
                  </div>
                  {/* Title at bottom, small italic */}
                  <div className="mt-8 mb-4 w-full flex justify-center">
                    <span className="text-lg italic text-green-200 text-center drop-shadow-md">{item.title}</span>
                  </div>
                </div>
              ) : (
                // Default card layout for others
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20">
                  <p className="text-sm font-medium text-white mb-2">{item.category}</p>
                  <h3 className="mt-2 text-3xl font-semibold text-white">{item.title}</h3>
                  <p className="text-white/80 mt-2 line-clamp-2">{item.description}</p>
                </div>
              )}
            </div>
          </div>
        )}
      />
    </div>
  </section>
   
   <section className="py-24 bg-gray-950 px-6">
      <div className="max-w-6xl mx-auto text-center">
         <h2 className="text-3xl font-bold mb-12 text-white">
            What We Offer
         </h2>
         <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="relative rounded-lg overflow-hidden shadow-lg group">
               <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS80siuuB3YJAUlZUmYntQbhcdi0MAk_C2UlQ&s"
                  alt="Orcha AI"
                  className="w-full h-64 object-cover"
                  />
               {/* Dark overlay */}
               <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-70 transition"></div>
               {/* Content inside overlay */}
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h3 className="text-2xl font-semibold text-purple-400 mb-4">Orcha AI</h3>
                  <p className="text-gray-300 text-sm mb-6">
                     With the power of LangChain to streamline workflows, reduce manual effort, and improve decision-making without writing a single code.
                  </p>
                  {/* Icons inside card */}
                  <div className="flex gap-4">
                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBdcgkdcDy5z4PYGx_kDJB1AvvC_x1pCBbbQ&s" alt="Automation" className="w-12 h-12 rounded-full bg-gray-800 p-2" />
                     <img src="https://ollama.com/public/assets/c889cc0d-cb83-4c46-a98e-0d0e273151b9/42f6b28d-9117-48cd-ac0d-44baaf5c178e.png" alt="AI Brain" className="w-12 h-12 rounded-full bg-gray-800 p-2" />
                     <img src="https://images.prismic.io/sacra/5ca9181a-72f8-4318-a3a1-559909422df0_jkfgwrdiiofil1gzivih.webp?auto=compress,format" alt="Analytics" className="w-12 h-12 rounded-full bg-gray-800 p-2" />
                  </div>
               </div>
            </div>
            {/* Card 2 */}
            {/* 
            <div className="relative rounded-lg overflow-hidden shadow-lg group">
               <img
                  src="/images/sap-development.jpg"
                  alt="SAP Development"
                  className="w-full h-64 object-cover"
                  />
               <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-70 transition"></div>
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h3 className="text-2xl font-semibold text-purple-400 mb-4">SAP Development</h3>
                  <p className="text-gray-300 text-sm mb-6">
                     Custom SAP solutions tailored to integrate seamlessly with your existing enterprise systems.
                  </p>
                  <div className="flex gap-4">
                     <img src="https://www.svgrepo.com/show/331567/sap.svg" alt="Integration" className="w-12 h-12 rounded-full bg-gray-800 p-2" />
                     <img src="https://perigeon.com/wp-content/uploads/2025/04/sap_banner_image.webp" alt="Database" className="w-12 h-12 rounded-full bg-gray-800 p-2" />
                  </div>
               </div>
            </div>
            */}
            {/* Card 3 */}
            <div className="relative rounded-lg overflow-hidden shadow-lg group">
               <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8YN2m0dPdMlXyX4r74veeLMIHS1gRrIuFMg&s"
                  alt="Software Development"
                  className="w-full h-64 object-cover"
                  />
               <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-70 transition"></div>
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h3 className="text-2xl font-semibold text-purple-400 mb-4">Software Development</h3>
                  <p className="text-gray-300 text-sm mb-6">
                     End-to-end software design and development from concept to deployment.
                  </p>
                  <div className="flex gap-4">
                     <img src="https://img.icons8.com/?size=512&id=44442&format=png" alt="Integration" className="w-12 h-12 rounded-full bg-gray-800 p-2" />
                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKfxxgtvjoywpYYFjqCM2IByvFIxA6n40Wtw&s" alt="Database" className="w-12 h-12 rounded-full bg-gray-800 p-2" />
                     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png" alt="Cloud" className="w-12 h-12 rounded-full bg-gray-800 p-2" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
   {/* Contact Us Section */}
   <section className="py-24 bg-gray-900 px-6">
      <div className="max-w-4xl mx-auto text-center">
         <h2 className="text-3xl font-bold mb-4 text-white">
            Contact Us
         </h2>
         <p className="text-lg text-gray-400 mb-6">
            Have a project in mind? Let’s talk - our team is ready to bring your vision to life with Orcha's expertise.
         </p>
         <a
            href="/coming-soon" // contacts
            className="inline-block px-8 py-3 bg-gray-800 rounded-lg text-white font-medium border border-gray-700 hover:bg-gray-700 transition"
            >
         Get in Touch
         </a>
      </div>
   </section>
</main>
);
}