"use client"
import { useState } from "react";
import Image from "next/image";
import embBg from "@/assets/emb.jpg";
import embLogo from "@/assets/emb-logo.png";

import ollamademo from "@/assets/ollamademo.png";
import openaidemo from "@/assets/openai demo.png";
import bgImage from '@/assets/orcha-bg.png';
import { PricingDrawer } from "@/components/ui/pricing-drawer";
import { AppleCarousel } from "@/components/ui/aceternity/apple-carousel";


export default function OrchaAiPage() {
    const [selectedImage, setSelectedImage] = useState('');

  return (
    <>
      {/* Hero Section */}
     <section
      className="py-20 text-white text-center px-6 bg-black bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content above overlay */}
      <div className="relative max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Build AI Agents Visually with{' '}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Orcha AI
          </span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Orcha AI empowers you to create, connect, and deploy AI-powered workflows
          without writing a single line of code powered by LangChain and LangGraph.
        </p>
        {/* <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition">
          Get Started
        </button> */}
        &nbsp;
        <PricingDrawer/>
      </div>
    </section>

    {/* Case Studies Section */}
    <section className="py-12 bg-gray-950 px-6">
      <div className="max-w-6xl mx-auto text-center">
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
              image: require('@/assets/emb.jpg').default.src,
              logo: require('@/assets/emb-logo.png').default.src,
            },
            {
              id: 2,
              title: "Software Development",
              category: "Custom Solutions",
              description:
                "End-to-end software design and development from concept to deployment.",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8YN2m0dPdMlXyX4r74veeLMIHS1gRrIuFMg&s",
            },
            {
              id: 3,
              title: "Environmental Data in EIRS",
              category: "AI Automation",
              description:
                "We're creating a smart system that lets EMB staff and the public ask questions about environmental data in Tagalog or English. It gives clear, accurate answers using information from the EIRS, making data more accessible to our community.",
              image: embBg.src,
              logo: embLogo.src,
            },
            {
              id: 4,
              title: "Software Development",
              category: "Custom Solutions",
              description:
                "End-to-end software design and development from concept to deployment.",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8YN2m0dPdMlXyX4r74veeLMIHS1gRrIuFMg&s",
            },
          ]}
        />
      </div>
    </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-900 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Why Choose Orcha AI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">Drag & Drop Builder</h3>
                <p className="text-green-100">
                    Design AI workflows visually with an intuitive interface no complex coding required.
                </p>
                </div>

           <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">LangChain & LangGraph</h3>
                <p className="text-orange-100">
                    Leverage the power of leading AI frameworks to build intelligent, connected agents.
                </p>
                </div>
           <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">One-Click Deployment</h3>
                <p className="text-blue-100">
                    Push your AI workflows live instantly to cloud or on-premise environments.
                </p>
                </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-black px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-16 h-16 flex items-center justify-center mx-auto rounded-full text-white font-bold text-2xl">1</div>
              <h3 className="mt-6 mb-2 text-xl font-semibold">Create</h3>
              <p className="text-gray-400">Start from scratch or use ready-made AI templates to build your flow.</p>
            </div>
            <div>
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-16 h-16 flex items-center justify-center mx-auto rounded-full text-white font-bold text-2xl">2</div>
              <h3 className="mt-6 mb-2 text-xl font-semibold">Connect</h3>
              <p className="text-gray-400">Link tools, APIs, and models together to form a complete AI pipeline.</p>
            </div>
            <div>
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-16 h-16 flex items-center justify-center mx-auto rounded-full text-white font-bold text-2xl">3</div>
              <h3 className="mt-6 mb-2 text-xl font-semibold">Deploy</h3>
              <p className="text-gray-400">Go live instantly and start interacting with your AI agents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots / Demo */}
       <section className="py-20 bg-gray-900 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
      See Orcha AI in Action
    </h2>
    <div className="grid md:grid-cols-2 gap-8">
      {/* First Image */}
      <div
        className="relative bg-gray-800 rounded-xl h-64 cursor-pointer overflow-hidden group"
        onClick={() => setSelectedImage(openaidemo.src)}
      >
        <Image
          src={openaidemo}
          alt="Orcha AI Demo 1"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <p className="text-white text-lg">
            Build a basic chatbot with Open AI and control its prompt.
          </p>
        </div>
      </div>

      {/* Second Image */}
      <div
        className="relative bg-gray-800 rounded-xl h-64 cursor-pointer overflow-hidden group"
        onClick={() => setSelectedImage(ollamademo.src)}
      >
        <Image
          src={ollamademo}
          alt="Orcha AI Demo 2"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <p className="text-white text-lg">
                        Build a chatbot that can communicate with your own private data with Ollama.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage('')}
        >
          <div className="max-w-4xl max-h-[90%]">
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="rounded-lg object-contain max-h-screen"
            />
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-black text-center px-6">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Start Building with Orcha AI Today</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Join developers, teams, and businesses creating the next generation of AI-powered applications.
        </p>
        <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition">
          Sign Up for a 14 day free trial
        </button>
      </section>
    </>
  );
}