

export default function OrchaAiPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-black text-white text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Build AI Agents Visually with <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Orcha AI</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Orcha AI empowers you to create, connect, and deploy AI-powered workflows 
          without writing a single line of code powered by LangChain and LangGraph.
        </p>
        <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition">
          Get Started 
        </button>
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
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">See Orcha AI in Action</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-xl h-64 flex items-center justify-center text-gray-500">
              Screenshot / Demo 1
            </div>
            <div className="bg-gray-800 rounded-xl h-64 flex items-center justify-center text-gray-500">
              Screenshot / Demo 2
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-center px-6">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Start Building with Orcha AI Today</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Join developers, teams, and businesses creating the next generation of AI-powered applications.
        </p>
        <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition">
          Sign Up for a 14 day free tial
        </button>
      </section>
    </>
  );
}