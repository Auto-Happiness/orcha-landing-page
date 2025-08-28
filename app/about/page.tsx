import orchamobile from '@/assets/orcha-mobile.png'
export default function AboutPage() {
  return (
    <div className="bg-gray-950 text-white">
      {/* Hero/About Header */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">About Orcha Solutions</h1>
          <p className="text-lg text-gray-400 mb-8">
Founded in 2023, Orcha Solutions emerged to bridge the gap between complex IT systems and human-centric software. Leveraging the latest advancements in Artificial Intelligence, machine learning, and automation, we create intelligent systems that adapt, learn, and evolve with your business needs.
Our commitment is to design, develop, and deliver scalable software architectures that can seamlessly grow from startup prototypes to enterprise-level platforms. Whether it’s AI-powered decision engines, workflow automation, or high-performance cloud infrastructure, we focus on building solutions that streamline operations, boost efficiency, and enable rapid innovation without sacrificing reliability or security.
By blending technical expertise with a deep understanding of business challenges, we empower organizations to stay ahead in a data-driven, AI-enabled world.          </p>
        </div>
      </section>

      {/* Mission & Vision */}
   <section className="py-20 px-6 bg-gray-900">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    {/* Left Side Image */}
    <div className="flex justify-center">
      <img
        src={orchamobile.src}  
        alt="Mission and Vision"
        className="rounded-lg shadow-lg max-w-full h-auto"
      />
    </div>

    {/* Right Side: Mission & Vision */}
    <div className="space-y-8">
      {/* Mission */}
      <div>
        <h2 className="text-3xl font-bold mb-4 text-white">Our Mission</h2>
        <p className="text-lg text-gray-400">
          To empower businesses through high-performance software and intelligent systems that drive growth, innovation, and operational excellence.
        </p>
      </div>

      {/* Vision */}
      <div>
        <h2 className="text-3xl font-bold mb-4 text-white">Our Vision</h2>
        <p className="text-lg text-gray-400">
          To build a future where seamless, scalable, and adaptive software ecosystems enable organizations to thrive in a world driven by technological advancement.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Why Orcha? */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Orcha Solutions?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { title: "Fast & Reliable Delivery", desc: "Accelerated development cycles to launch your solutions on time and on budget." },
              { title: "Client-Centric Approach", desc: "We tailor each solution to your unique needs, ensuring maximum impact." },
              { title: "Future-Ready Design", desc: "We build solutions that scale, evolve, and stand the test of time." },
            ].map(item => (
              <div key={item.title} className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-purple-800 text-center">
        <h2 className="text-3xl font-bold mb-4">Partner with Orcha Solutions Today</h2>
        <p className="text-lg text-gray-100 mb-8">
          Ready to build something remarkable? Let’s explore how Orcha can help bring your vision to life.
        </p>
        <a href="/coming-soon" className="px-8 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition">
          Get in Touch
        </a>
      </section>
    </div>
  );
}
