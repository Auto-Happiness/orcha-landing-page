import testingIcon from '@/assets/testing.png'

export default function SoftwareDevelopmentPage() {
  return (
    <div className="bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Custom Software Development
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            We design and build modern, scalable, and secure applications tailored to your business goals.
            From concept to deployment, we deliver solutions that perform, engage, and grow with your needs.
          </p>
          <a
            href="/contact"
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg shadow-lg font-semibold hover:opacity-90 transition"
          >
            Start Your Project
          </a>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How We Work</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Plan & Discover",
                desc: "We begin with deep research to fully understand your goals and challenges.",
                icon: "@/assets/testing.png",
              },
              {
                title: "Design & Architect",
                desc: "We craft a solid blueprint for your solution with a focus on scalability and UX.",
                icon: "/icons/design.svg",
              },
              {
                title: "Develop & Integrate",
                desc: "We build robust, high-performance applications with seamless integrations.",
                icon: "/icons/code.svg",
              },
              {
                title: "Test & Launch",
                desc: "We rigorously test and deploy your solution for optimal performance.",
                icon: "/icons/launch.svg",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800"
              >
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 p-3"
                />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {/* <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Work</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Analytics",
                image: "/images/project1.jpg",
              },
              {
                title: "Enterprise ERP Integration",
                image: "/images/project2.jpg",
              },
              {
                title: "Custom E-Commerce Platform",
                image: "/images/project3.jpg",
              },
            ].map((project) => (
              <div
                key={project.title}
                className="relative rounded-lg overflow-hidden shadow-lg group"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <span className="px-6 py-2 bg-purple-600 rounded-lg font-semibold">
                    View Project
                  </span>
                </div>
                <div className="absolute bottom-0 bg-black bg-opacity-70 w-full p-4">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      {/* <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah L.",
                company: "TechCorp",
                quote:
                  "Orcha’s team transformed our outdated systems into a seamless, high-performance platform.",
                avatar: "/images/avatar1.jpg",
              },
              {
                name: "Mark T.",
                company: "GlobalSoft",
                quote:
                  "They delivered our project ahead of schedule without compromising quality.",
                avatar: "/images/avatar2.jpg",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800 text-left"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <span className="text-sm text-gray-400">
                      {testimonial.company}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-purple-800 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Let’s Build Something Exceptional Together
        </h2>
        <p className="text-lg text-gray-100 mb-8">
          Partner with us to create high-performance, secure, and scalable
          software solutions.
        </p>
        <a
          href="/contact"
          className="px-8 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Start Your Project Today
        </a>
      </section>
    </div>
  );
}
