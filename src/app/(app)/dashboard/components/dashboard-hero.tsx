// src/app/(app)/dashboard/components/dashboard-hero.tsx

import Link from 'next/link'
import {
  TrendingUp,
  Palette,
  Briefcase,
  Cpu,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

export function DashboardHero() {
  return (
    
<div className="relative overflow-hidden rounded-[28px] border border-[#ECEAF8] bg-gradient-to-r from-[#F5F1FF] via-[#F8F7FF] to-[#EEF5FF] px-8 py-10 lg:px-10 lg:py-12">
  <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

    {/* Left Content */}
    <div className="max-w-[420px] space-y-5">
      <h1 className="text-[44px] font-bold leading-[1.1] tracking-[-1.5px] text-[#111827]">
        Discover careers that
        <br />
        fit you best
      </h1>

      <p className="max-w-[360px] text-[17px] leading-7 text-[#6B7280]">
        Explore career options, learn key skills, and build
        your path to a successful future.
      </p>

      <Button
        asChild
        className="h-12 rounded-xl bg-violet-600 px-6 text-sm font-semibold hover:bg-violet-700"
      >
        <Link href="/careers">Explore Careers</Link>
      </Button>
    </div>

    {/* Right Visual */}
    <div className="relative hidden h-[320px] flex-1 lg:block">

      {/* Dotted connection lines */}
      <div className="absolute inset-0 opacity-40">
        <svg
          className="h-full w-full"
          viewBox="0 0 600 320"
          fill="none"
        >
          <path
            d="M140 80 C220 80, 260 160, 340 160"
            stroke="#C4B5FD"
            strokeDasharray="6 6"
            strokeWidth="2"
          />
          <path
            d="M140 220 C240 220, 280 120, 380 120"
            stroke="#C4B5FD"
            strokeDasharray="6 6"
            strokeWidth="2"
          />
          <path
            d="M340 160 C430 160, 470 220, 540 220"
            stroke="#C4B5FD"
            strokeDasharray="6 6"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Center Character Placeholder */}
      <img
        src="/illustrations/girl-career.png"
        alt="Career Illustration"
        className="absolute left-1/2 top-1/2 z-10 h-[290px] -translate-x-1/2 -translate-y-1/2 object-contain"
      />

      {/* Floating Cards */}
      <div className="absolute left-10 top-8 rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-md backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
            <TrendingUp className="h-5 w-5 text-violet-600" />
          </div>

          <span className="text-sm font-semibold text-slate-700">
            Data Analyst
          </span>
        </div>
      </div>

      <div className="absolute left-24 top-40 rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-md backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
            <Palette className="h-5 w-5 text-violet-600" />
          </div>

          <span className="text-sm font-semibold text-slate-700">
            UI/UX Designer
          </span>
        </div>
      </div>

      <div className="absolute right-16 top-14 rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-md backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
            <Briefcase className="h-5 w-5 text-violet-600" />
          </div>

          <span className="text-sm font-semibold text-slate-700">
            Product Basics
          </span>
        </div>
      </div>

      <div className="absolute right-0 top-32 rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-md backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
            <Cpu className="h-5 w-5 text-violet-600" />
          </div>

          <span className="text-sm font-semibold text-slate-700">
            Cybersecurity Analyst
          </span>
        </div>
      </div>

      <div className="absolute right-10 bottom-4 rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-md backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
            <TrendingUp className="h-5 w-5 text-violet-600" />
          </div>

          <span className="text-sm font-semibold text-slate-700">
            Marketing Specialist
          </span>
        </div>
      </div>
    </div>
  </div>
</div>


)
}