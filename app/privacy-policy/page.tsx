import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#0E1016] via-[#111827] to-[#0B0D12] text-gray-200">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl" />
      </div>

      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24">
        
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400">
            Effective Date: <span className="text-gray-300">August 22, 2025</span>
          </p>
        </header>

        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 md:p-12 space-y-10">

          <p className="text-gray-300 leading-relaxed">
            <strong className="text-white">Orcha Solutions Inc.</strong> (“
            <strong className="text-white">OrchaAI</strong>”, “we”, “us” and “our”)
            values your privacy and is committed to protecting personal
            information. This Privacy Policy explains what data we collect, how we
            use it, and your rights.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Basic details such as name, email address, mobile number, and organization</li>
              <li>Account information including login credentials and preferences</li>
              <li>Transaction details such as billing information and payment history</li>
              <li>Technical data such as IP address, browser type, device information, and site activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Purpose of Collection
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Deliver and maintain our services</li>
              <li>Process transactions and provide customer support</li>
              <li>Improve our products, website, and user experience</li>
              <li>Send service-related updates or marketing communications (with consent)</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Data Sharing and Disclosure
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>We do not sell your data</li>
              <li>Authorized service providers bound by confidentiality obligations</li>
              <li>Regulatory bodies or law enforcement when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Data Retention and Security
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We store personal information only for as long as necessary to
              fulfill the purposes outlined above or as required by law. We use
              organizational, physical, and technical safeguards to protect your
              data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Your Rights as a Data Subject
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Access, correct, or update your personal information</li>
              <li>Withdraw consent or object to processing</li>
              <li>Request deletion of your data, subject to legal requirements</li>
              <li>Lodge a complaint with the National Privacy Commission (NPC)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Children’s Privacy
            </h2>
            <p className="text-gray-300">
              Our services are not intended for individuals under the age of 13.
              We do not knowingly collect personal data from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Changes to This Policy
            </h2>
            <p className="text-gray-300">
              We may update this Privacy Policy from time to time. Changes will be
              posted on this page with the updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. Contact Us
            </h2>
            <p className="text-gray-300">
              Email:{" "}
              <a
                href="mailto:orcha.support@orcha-solutions.com"
                className="text-purple-400 hover:underline"
              >
                orcha.support@orcha-solutions.com
              </a>
            </p>
            <p className="text-gray-300 mt-2">
              Address: 4954-A 2/F JKSA Bldg., Antonio Arnaiz Avenue cor. Mayor,
              Makati City, 1230 Metro Manila
            </p>
          </section>

        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
