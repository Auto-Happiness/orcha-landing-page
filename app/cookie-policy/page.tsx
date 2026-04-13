import React from "react";
import Link from "next/link";

const CookiePolicy = () => {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#0E1016] via-[#111827] to-[#0B0D12] text-gray-200">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl" />
      </div>

      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24">
        
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-3">
            Cookie Policy
          </h1>
          <p className="text-sm text-gray-400">
            Last Updated: <span className="text-gray-300">April 13, 2026</span>
          </p>
        </header>

        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 md:p-12 space-y-10">

          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Orcha Solutions Inc.</strong> (“OrchaAI”, “we”, “us”) 
            uses cookies and similar technologies to provide, customize, evaluate, and improve our services. 
            This policy explains how we use these technologies and your choices.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. What are Cookies?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Cookies are small text files that are placed on your device by websites you visit. 
              They are widely used to make websites work properly, provide a better user experience, 
              and offer analytical data to the website owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. How We Use Cookies
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Essential Cookies</h3>
                <p className="text-gray-300 leading-relaxed">
                  These are necessary for the website to function. They enable core features like security, 
                  network management, and accessibility. You cannot opt out of these.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Performance & Analytics</h3>
                <p className="text-gray-300 leading-relaxed">
                  These help us understand how visitors interact with our website by collecting and 
                  reporting information anonymously. This helps us improve our user interface and content.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Functional Cookies</h3>
                <p className="text-gray-300 leading-relaxed">
                  These allow the website to remember choices you make (such as your username or language) 
                  to provide enhanced, more personal features.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Your Choices
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Delete all cookies from your browser</li>
              <li>Block all cookies</li>
              <li>Allow all cookies</li>
              <li>Open a 'private' or 'incognito' session</li>
            </ul>
            <p className="text-gray-300 mt-4 italic">
              Note: Blocking all cookies may impact your ability to use certain features of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Contact Us
            </h2>
            <p className="text-gray-300">
              If you have questions about our use of cookies, please contact usat:{" "}
              <a
                href="mailto:orcha.support@orcha-solutions.com"
                className="text-purple-400 hover:underline"
              >
                orcha.support@orcha-solutions.com
              </a>
            </p>
          </section>

          <div className="pt-8 border-t border-white/10">
            <Link href="/" className="text-purple-400 hover:text-purple-300 flex items-center gap-2 transition-colors">
              <span>← Back to Home</span>
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
};

export default CookiePolicy;
