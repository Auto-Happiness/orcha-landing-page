"use client" // This component uses client-side features like Link and Button

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-darkBackground text-white">
      {/* Header */}
      <header className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2" href="#">
          {/* Placeholder for your company logo/image */}
          <Image
            src="/placeholder.svg?height=32&width=32"
            width={32}
            height={32}
            alt="Company Logo"
            className="rounded-full"
          />
          <span className="text-lg font-semibold">Your Company</span>
        </Link>
        <nav className="hidden space-x-4 md:flex">
          <Link className="font-medium hover:text-gray-300" href="#">
            Features
          </Link>
          <Link className="font-medium hover:text-gray-300" href="#">
            Deployment
          </Link>
          <Link className="font-medium hover:text-gray-300" href="#">
            Pricing
          </Link>
          <Link className="font-medium hover:text-gray-300" href="#">
            Company
          </Link>
        </nav>
        <Button className="md:hidden bg-transparent" variant="outline">
          Menu
        </Button>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-4 py-12 md:py-24 lg:py-32">
        <section className="grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Unlock Your Potential with Our Platform
            </h1>
            <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
              Experience seamless deployment, powerful features, and flexible pricing designed to help your business
              thrive.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button className="bg-white text-darkBackground hover:bg-gray-200">Get Started</Button>
              <Button variant="outline" className="border-white text-white hover:bg-gray-800 bg-transparent">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            {/* Placeholder for image or video/gif */}
            <Image
              src="/placeholder.svg?height=400&width=600"
              width={600}
              height={400}
              alt="Hero Image"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
            />
          </div>
        </section>
      </main>
    </div>
  )
}
