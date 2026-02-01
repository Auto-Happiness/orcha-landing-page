import React from "react";

const Contacts = () => {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#0E1016] via-[#111827] to-[#0B0D12] text-gray-200">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl" />
      </div>

      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24">
        
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-4">
            Contact Us
          </h1>
          <p className="text-gray-400 text-lg">
            Let’s connect and build something great together.
          </p>
        </header>

        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 md:p-12 space-y-8 text-center">

          <h2 className="text-3xl font-bold text-white">
            ORCHA SOLUTIONS
          </h2>

          <p className="text-gray-300 leading-relaxed">
            JKSA BLDG., Antonio Arnaiz Avenue,<br />
            Corner Mayor Pio Del Pilar,<br />
            City of Makati, Metro Manila
          </p>

          <div className="space-y-2">
            <p className="text-gray-300">
              <span className="font-semibold text-white">Contact:</span>{" "}
              0992 740 8020
            </p>

            <p className="text-gray-300">
              <span className="font-semibold text-white">Email:</span>{" "}
              <a
                href="mailto:orcha.support@orcha-solutions.com"
                className="text-purple-400 hover:underline"
              >
                orcha.support@orcha-solutions.com
              </a>
            </p>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Contacts;
