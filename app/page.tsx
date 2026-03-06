"use client"

import { useMemo, useState } from "react"
import { SesSimulatorForm } from "@/components/SesSimulatorForm"
import { SesResultCard } from "@/components/SesResultCard"
import { calculateSes } from "@/lib/ses-calculations"
import { SesInput } from "@/lib/ses-types"

const DEFAULT_INPUT: SesInput = {
  monthlyUnit: 620_000,
  marginRate: 0.2,
  prefectureCode: 13,
  age40plus: false,
  dependents: 0,
  spouseDeduction: false,
  bonusAnnual: 0,
  benefits: {
    commuteAllowanceAnnual: 0,
    learningSubsidyAnnual: 0,
    certAllowanceAnnual: 0,
    remoteWorkSubsidyAnnual: 0,
    healthCheckBenefitAnnual: 0,
    otherAnnual: 0,
  },
  asset: {
    nisaAnnual: 0,
    idecoAnnual: 0,
    horizonYears: 20,
  },
}

export default function HomePage() {
  const [input, setInput] = useState<SesInput>(DEFAULT_INPUT)
  const result = useMemo(() => calculateSes(input), [input])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3">
          <h1 className="text-base font-bold">SES手取りシミュレーター</h1>
          <p className="text-xs text-muted-foreground">令和7年度（2025年度）版 · SES会社員向け</p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          <div className="rounded-lg border bg-card p-5">
            <SesSimulatorForm input={input} onChange={setInput} />
          </div>
          <div>
            <SesResultCard result={result} />
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-muted-foreground py-6 border-t mt-8">
        <p>© 2025 SES手取りシミュレーター · 計算結果はあくまで概算です</p>
      </footer>
    </div>
  )
}
