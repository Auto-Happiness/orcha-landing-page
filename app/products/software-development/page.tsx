import testingIcon from '@/assets/testing.png'

import golangIcon from '@/assets/golang.png'
import pythonIcon from '@/assets/python.png'
import jsIcon from '@/assets/js.png'
import tsIcon from '@/assets/ts.png'
import reactIcon from '@/assets/react.png'
import nextjsIcon from '@/assets/nextjs.png'
import mssqlIcon from '@/assets/mssql.png'
import postgresIcon from '@/assets/postgres.png'
import awsIcon from '@/assets/aws.png'
import azureIcon from '@/assets/azure.png'
import mongoIcon from '@/assets/mongo.png'
import redisIcon from '@/assets/redis.png'
import dockerIcon from '@/assets/docker.png'
import k8sIcon from '@/assets/k8.png'
import scyllaIcon from '@/assets/scylla.png'
import kafkaIcon from '@/assets/kafka.svg'
import rabbitmqIcon from '@/assets/rabbitmq.png'


// Custom SVG icon components for "How We Work"
const PlanDiscoverIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 p-3"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const DesignArchitectIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 p-3"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);

const DevelopIntegrateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 p-3"
    viewBox="0 0 24 24"
  >
    <path d="M16 18l6-6-6-6" />
    <path d="M8 6l-6 6 6 6" />
  </svg>
);

const TestLaunchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 p-3"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4l3 3" />
  </svg>
);

export default function SoftwareDevelopmentPage() {
  const tools = [
    { name: 'Golang', icon: golangIcon },
    { name: 'Python', icon: pythonIcon },
    { name: 'JavaScript', icon: jsIcon },
    { name: 'TypeScript', icon: tsIcon },
    { name: 'React', icon: reactIcon },
    { name: 'Next JS', icon: nextjsIcon },
    { name: 'MSSQL', icon: mssqlIcon },
    { name: 'Postgres', icon: postgresIcon },
    { name: 'AWS', icon: awsIcon },
    { name: 'Azure', icon: azureIcon },
    { name: 'Mongo', icon: mongoIcon },
    { name: 'Redis', icon: redisIcon },
    { name: 'Docker', icon: dockerIcon },
    { name: 'Kubernetes', icon: k8sIcon },
    { name: 'Scylla', icon: scyllaIcon },
    { name: 'Kafka', icon: kafkaIcon },
    { name: 'RabbitMQ', icon: rabbitmqIcon },
  ];

  return (
    <div className="bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Custom Software Development</h1>
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
                icon: <PlanDiscoverIcon />
              },
              {
                title: "Design & Architect",
                desc: "We craft a solid blueprint for your solution with a focus on scalability and UX.",
                icon: <DesignArchitectIcon />
              },
              {
                title: "Develop & Integrate",
                desc: "We build robust, high-performance applications with seamless integrations.",
                icon: <DevelopIntegrateIcon />
              },
              {
                title: "Test & Launch",
                desc: "We rigorously test and deploy your solution for optimal performance.",
                icon: <TestLaunchIcon />
              },
            ].map((step) => (
              <div
                key={step.title}
                className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800"
              >
                {step.icon}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* ToolChain Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-4">ToolChain</h2>
            <p className="mb-8 text-gray-300">
              We handpick the most powerful and user-friendly software tools to accelerate your success.
            </p>
            <div
              className="grid grid-cols-5 gap-x-6 gap-y-8 justify-center"
              style={{ justifyContent: 'center' }}
            >
              {tools.map(({ name, icon }) => (
                  <div key={name}
                    className="rounded-full bg-gray-900 border border-gray-800 w-20 h-20 flex items-center justify-center cursor-default shadow-lg"
                   >
                    <img
                      src={icon.src}
                      alt={name}
                      className="w-12 h-12 rounded-full object-contain"
                    />
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-purple-800 text-center">
        <h2 className="text-3xl font-bold mb-4">Let’s Build Something Exceptional Together</h2>
        <p className="text-lg text-gray-100 mb-8">
          Partner with us to create high-performance, secure, and scalable software solutions.
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
