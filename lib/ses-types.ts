export interface SesBenefitsInput {
  commuteAllowanceAnnual: number
  learningSubsidyAnnual: number
  certAllowanceAnnual: number
  remoteWorkSubsidyAnnual: number
  healthCheckBenefitAnnual: number
  otherAnnual: number
}

export interface SesAssetInput {
  nisaAnnual: number
  idecoAnnual: number
  horizonYears: number
}

export interface SesInput {
  monthlyUnit: number
  marginRate: number
  prefectureCode: number
  age40plus: boolean
  bonusAnnual: number
  benefits: SesBenefitsInput
  asset: SesAssetInput
}

export interface GradeBand {
  grade: number
  standardMonthly: number
  salaryLower: number
  salaryUpper: number
}

export interface Prefecture {
  code: number
  name: string
}

export interface CompanySocialBreakdown {
  healthGrade: GradeBand
  pensionGrade: GradeBand
  healthInsuranceEmployer: number
  nursingInsuranceEmployer: number
  pensionEmployer: number
  employmentInsuranceEmployer: number
  accidentInsurance: number
  childcareContribution: number
  childcareSupportLevyEmployer: number
  employerTotal: number
  healthInsuranceEmployee: number
  nursingInsuranceEmployee: number
  pensionEmployee: number
  employmentInsuranceEmployee: number
  childcareSupportLevyEmployee: number
  employeeTotal: number
  totalCost: number
  effectiveRate: number
}

export interface AssetFuture {
  nisaFuture3: number
  nisaFuture5: number
  idecoFuture3: number
  idecoFuture5: number
  totalFuture3: number
  totalFuture5: number
}

export interface SesResult {
  monthlyPersonnelBudget: number
  monthlyGrossEstimated: number
  grossAnnualTotal: number
  socialBreakdown: CompanySocialBreakdown
  socialInsurance: number
  kyuyoShotoku: number
  taxableIncome: number
  incomeTax: number
  residentTax: number
  taxAndSocialTotal: number
  effectiveBurdenRate: number
  netAnnual: number
  netMonthlyAvg: number
  benefitAnnualTotal: number
  adjustedNetAnnual: number
  future: AssetFuture
  estimatedAnnualPension: number
  pensionYears: number
}
