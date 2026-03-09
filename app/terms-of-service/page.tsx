import React from "react";

const TermsOfService = () => {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#0E1016] via-[#111827] to-[#0B0D12] text-gray-200">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl" />
      </div>

      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24">

        <header className="mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-400">
            Effective Date: <span className="text-gray-300">August 22, 2025</span>
          </p>
        </header>

        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 md:p-12 space-y-10">

          <p className="text-gray-300 leading-relaxed">
            These Terms of Service (“<strong className="text-white">Terms</strong>”) govern your use of{" "}
            <strong className="text-white">Orcha Solutions Inc.</strong> platform, website, and related services (“
            <strong className="text-white">OrchaAI</strong>”). By accessing or using our Services, you agree to these Terms. If you do not agree, you must not use our Services.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Eligibility
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>You must be at least 18 years old to use our Services.</li>
              <li>If you are using the Services on behalf of a company or organization, you confirm that you have the authority to bind that entity to these Terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Accounts and Security
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>You may need to create an account to access certain Services.</li>
              <li>You agree to provide accurate and current information when registering.</li>
              <li>You are responsible for safeguarding your login credentials.</li>
              <li>Notify us immediately if you suspect unauthorized access to your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Subscriptions and Payments
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Some Services may require payment or a subscription.</li>
              <li>Fees and payment terms will be disclosed before you subscribe.</li>
              <li>You may upgrade, downgrade, or cancel your subscription in accordance with the applicable plan rules.</li>
              <li>Taxes, if applicable, are your responsibility.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Acceptable Use
            </h2>
            <p className="text-gray-300 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Use the Services for unlawful or harmful purposes.</li>
              <li>Copy, reverse-engineer, or attempt to access source code.</li>
              <li>Share or resell access to unauthorized third parties.</li>
              <li>Interfere with or attempt to bypass security or access controls.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. User Content
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>You retain ownership of the content you upload or create (“User Content”).</li>
              <li>By using the Services, you grant us a limited, non-exclusive license to process and host User Content solely for the purpose of providing the Services.</li>
              <li>You represent that your User Content does not violate any laws or third-party rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Intellectual Property
            </h2>
            <p className="text-gray-300 leading-relaxed">
              All rights, title, and interest in the Services, including software, designs, trademarks, and documentation, remain with{" "}
              <strong className="text-white">Orcha Solutions Inc.</strong> or our licensors. You may not use our intellectual property without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Suspension and Termination
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>We may suspend or terminate your access if you breach these Terms, fail to pay fees, or engage in unlawful activity.</li>
              <li>You may cancel your subscription or account at any time.</li>
              <li>Certain provisions (e.g., intellectual property, liability limits, indemnity) survive termination.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. Limitation of Liability
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages.</li>
              <li>Our total liability shall not exceed the fees paid by you in the three (3) months prior to the claim.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              9. Indemnification
            </h2>
            <p className="text-gray-300 leading-relaxed">
              You agree to indemnify and hold harmless <strong className="text-white">Orcha Solutions Inc.</strong>, its affiliates, and employees from claims, damages, or expenses arising out of your use or misuse of the Services, your violation of these Terms, or your infringement of third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              10. Governing Law
            </h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms will be governed by the laws of the jurisdiction where <strong className="text-white">Orcha Solutions Inc.</strong> is registered, unless otherwise required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              11. Changes to These Terms
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We may update these Terms from time to time. The “Effective Date” will indicate the latest version. Continued use of the Services means you accept the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              12. Contact Us
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
          </section>

        </div>
      </section>
    </main>
  );
};

export default TermsOfService;
