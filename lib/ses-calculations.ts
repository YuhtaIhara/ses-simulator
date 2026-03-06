import {
  CompanySocialBreakdown,
  GradeBand,
  Prefecture,
  SesInput,
  SesResult,
} from "./ses-types"

const HEALTH_GRADE_TABLE: GradeBand[] = [
  { grade: 1, standardMonthly: 58_000, salaryLower: 0, salaryUpper: 63_000 },
  { grade: 2, standardMonthly: 68_000, salaryLower: 63_000, salaryUpper: 73_000 },
  { grade: 3, standardMonthly: 78_000, salaryLower: 73_000, salaryUpper: 83_000 },
  { grade: 4, standardMonthly: 88_000, salaryLower: 83_000, salaryUpper: 93_000 },
  { grade: 5, standardMonthly: 98_000, salaryLower: 93_000, salaryUpper: 101_000 },
  { grade: 6, standardMonthly: 104_000, salaryLower: 101_000, salaryUpper: 107_000 },
  { grade: 7, standardMonthly: 110_000, salaryLower: 107_000, salaryUpper: 114_000 },
  { grade: 8, standardMonthly: 118_000, salaryLower: 114_000, salaryUpper: 122_000 },
  { grade: 9, standardMonthly: 126_000, salaryLower: 122_000, salaryUpper: 130_000 },
  { grade: 10, standardMonthly: 134_000, salaryLower: 130_000, salaryUpper: 138_000 },
  { grade: 11, standardMonthly: 142_000, salaryLower: 138_000, salaryUpper: 146_000 },
  { grade: 12, standardMonthly: 150_000, salaryLower: 146_000, salaryUpper: 155_000 },
  { grade: 13, standardMonthly: 160_000, salaryLower: 155_000, salaryUpper: 165_000 },
  { grade: 14, standardMonthly: 170_000, salaryLower: 165_000, salaryUpper: 175_000 },
  { grade: 15, standardMonthly: 180_000, salaryLower: 175_000, salaryUpper: 185_000 },
  { grade: 16, standardMonthly: 190_000, salaryLower: 185_000, salaryUpper: 195_000 },
  { grade: 17, standardMonthly: 200_000, salaryLower: 195_000, salaryUpper: 210_000 },
  { grade: 18, standardMonthly: 220_000, salaryLower: 210_000, salaryUpper: 230_000 },
  { grade: 19, standardMonthly: 240_000, salaryLower: 230_000, salaryUpper: 250_000 },
  { grade: 20, standardMonthly: 260_000, salaryLower: 250_000, salaryUpper: 270_000 },
  { grade: 21, standardMonthly: 280_000, salaryLower: 270_000, salaryUpper: 290_000 },
  { grade: 22, standardMonthly: 300_000, salaryLower: 290_000, salaryUpper: 310_000 },
  { grade: 23, standardMonthly: 320_000, salaryLower: 310_000, salaryUpper: 330_000 },
  { grade: 24, standardMonthly: 340_000, salaryLower: 330_000, salaryUpper: 350_000 },
  { grade: 25, standardMonthly: 360_000, salaryLower: 350_000, salaryUpper: 370_000 },
  { grade: 26, standardMonthly: 380_000, salaryLower: 370_000, salaryUpper: 395_000 },
  { grade: 27, standardMonthly: 410_000, salaryLower: 395_000, salaryUpper: 425_000 },
  { grade: 28, standardMonthly: 440_000, salaryLower: 425_000, salaryUpper: 455_000 },
  { grade: 29, standardMonthly: 470_000, salaryLower: 455_000, salaryUpper: 485_000 },
  { grade: 30, standardMonthly: 500_000, salaryLower: 485_000, salaryUpper: 515_000 },
  { grade: 31, standardMonthly: 530_000, salaryLower: 515_000, salaryUpper: 545_000 },
  { grade: 32, standardMonthly: 560_000, salaryLower: 545_000, salaryUpper: 575_000 },
  { grade: 33, standardMonthly: 590_000, salaryLower: 575_000, salaryUpper: 605_000 },
  { grade: 34, standardMonthly: 620_000, salaryLower: 605_000, salaryUpper: 635_000 },
  { grade: 35, standardMonthly: 650_000, salaryLower: 635_000, salaryUpper: 665_000 },
  { grade: 36, standardMonthly: 680_000, salaryLower: 665_000, salaryUpper: 695_000 },
  { grade: 37, standardMonthly: 710_000, salaryLower: 695_000, salaryUpper: 730_000 },
  { grade: 38, standardMonthly: 750_000, salaryLower: 730_000, salaryUpper: 770_000 },
  { grade: 39, standardMonthly: 790_000, salaryLower: 770_000, salaryUpper: 810_000 },
  { grade: 40, standardMonthly: 830_000, salaryLower: 810_000, salaryUpper: 855_000 },
  { grade: 41, standardMonthly: 880_000, salaryLower: 855_000, salaryUpper: 905_000 },
  { grade: 42, standardMonthly: 930_000, salaryLower: 905_000, salaryUpper: 955_000 },
  { grade: 43, standardMonthly: 980_000, salaryLower: 955_000, salaryUpper: 1_005_000 },
  { grade: 44, standardMonthly: 1_030_000, salaryLower: 1_005_000, salaryUpper: 1_060_000 },
  { grade: 45, standardMonthly: 1_090_000, salaryLower: 1_060_000, salaryUpper: 1_120_000 },
  { grade: 46, standardMonthly: 1_150_000, salaryLower: 1_120_000, salaryUpper: 1_180_000 },
  { grade: 47, standardMonthly: 1_210_000, salaryLower: 1_180_000, salaryUpper: 1_240_000 },
  { grade: 48, standardMonthly: 1_270_000, salaryLower: 1_240_000, salaryUpper: 1_300_000 },
  { grade: 49, standardMonthly: 1_330_000, salaryLower: 1_300_000, salaryUpper: 1_360_000 },
  { grade: 50, standardMonthly: 1_390_000, salaryLower: 1_360_000, salaryUpper: Number.POSITIVE_INFINITY },
]

const PENSION_GRADE_TABLE: GradeBand[] = [
  { grade: 1, standardMonthly: 88_000, salaryLower: 0, salaryUpper: 93_000 },
  { grade: 2, standardMonthly: 98_000, salaryLower: 93_000, salaryUpper: 101_000 },
  { grade: 3, standardMonthly: 104_000, salaryLower: 101_000, salaryUpper: 107_000 },
  { grade: 4, standardMonthly: 110_000, salaryLower: 107_000, salaryUpper: 114_000 },
  { grade: 5, standardMonthly: 118_000, salaryLower: 114_000, salaryUpper: 122_000 },
  { grade: 6, standardMonthly: 126_000, salaryLower: 122_000, salaryUpper: 130_000 },
  { grade: 7, standardMonthly: 134_000, salaryLower: 130_000, salaryUpper: 138_000 },
  { grade: 8, standardMonthly: 142_000, salaryLower: 138_000, salaryUpper: 146_000 },
  { grade: 9, standardMonthly: 150_000, salaryLower: 146_000, salaryUpper: 155_000 },
  { grade: 10, standardMonthly: 160_000, salaryLower: 155_000, salaryUpper: 165_000 },
  { grade: 11, standardMonthly: 170_000, salaryLower: 165_000, salaryUpper: 175_000 },
  { grade: 12, standardMonthly: 180_000, salaryLower: 175_000, salaryUpper: 185_000 },
  { grade: 13, standardMonthly: 190_000, salaryLower: 185_000, salaryUpper: 195_000 },
  { grade: 14, standardMonthly: 200_000, salaryLower: 195_000, salaryUpper: 210_000 },
  { grade: 15, standardMonthly: 220_000, salaryLower: 210_000, salaryUpper: 230_000 },
  { grade: 16, standardMonthly: 240_000, salaryLower: 230_000, salaryUpper: 250_000 },
  { grade: 17, standardMonthly: 260_000, salaryLower: 250_000, salaryUpper: 270_000 },
  { grade: 18, standardMonthly: 280_000, salaryLower: 270_000, salaryUpper: 290_000 },
  { grade: 19, standardMonthly: 300_000, salaryLower: 290_000, salaryUpper: 310_000 },
  { grade: 20, standardMonthly: 320_000, salaryLower: 310_000, salaryUpper: 330_000 },
  { grade: 21, standardMonthly: 340_000, salaryLower: 330_000, salaryUpper: 350_000 },
  { grade: 22, standardMonthly: 360_000, salaryLower: 350_000, salaryUpper: 370_000 },
  { grade: 23, standardMonthly: 380_000, salaryLower: 370_000, salaryUpper: 395_000 },
  { grade: 24, standardMonthly: 410_000, salaryLower: 395_000, salaryUpper: 425_000 },
  { grade: 25, standardMonthly: 440_000, salaryLower: 425_000, salaryUpper: 455_000 },
  { grade: 26, standardMonthly: 470_000, salaryLower: 455_000, salaryUpper: 485_000 },
  { grade: 27, standardMonthly: 500_000, salaryLower: 485_000, salaryUpper: 515_000 },
  { grade: 28, standardMonthly: 530_000, salaryLower: 515_000, salaryUpper: 545_000 },
  { grade: 29, standardMonthly: 560_000, salaryLower: 545_000, salaryUpper: 575_000 },
  { grade: 30, standardMonthly: 590_000, salaryLower: 575_000, salaryUpper: 605_000 },
  { grade: 31, standardMonthly: 620_000, salaryLower: 605_000, salaryUpper: 635_000 },
  { grade: 32, standardMonthly: 650_000, salaryLower: 635_000, salaryUpper: Number.POSITIVE_INFINITY },
]

const PREFECTURE_HEALTH_RATE: Record<number, number> = {
  1: 102.8, 2: 98.5, 3: 95.1, 4: 101.0, 5: 100.1, 6: 97.5, 7: 95.0, 8: 95.2, 9: 98.2, 10: 96.8,
  11: 96.7, 12: 97.3, 13: 98.5, 14: 99.2, 15: 92.1, 16: 95.9, 17: 97.0, 18: 97.1, 19: 95.5, 20: 96.3,
  21: 98.0, 22: 96.1, 23: 99.3, 24: 97.7, 25: 98.8, 26: 98.9, 27: 101.3, 28: 101.2, 29: 99.1, 30: 100.6,
  31: 98.6, 32: 99.4, 33: 100.5, 34: 97.8, 35: 101.5, 36: 102.4, 37: 100.2, 38: 99.8, 39: 100.5, 40: 101.1,
  41: 105.5, 42: 100.6, 43: 100.8, 44: 100.8, 45: 97.7, 46: 101.3, 47: 94.4,
}

export const PREFECTURES: Prefecture[] = [
  { code: 1, name: "北海道" }, { code: 2, name: "青森" }, { code: 3, name: "岩手" }, { code: 4, name: "宮城" },
  { code: 5, name: "秋田" }, { code: 6, name: "山形" }, { code: 7, name: "福島" }, { code: 8, name: "茨城" },
  { code: 9, name: "栃木" }, { code: 10, name: "群馬" }, { code: 11, name: "埼玉" }, { code: 12, name: "千葉" },
  { code: 13, name: "東京" }, { code: 14, name: "神奈川" }, { code: 15, name: "新潟" }, { code: 16, name: "富山" },
  { code: 17, name: "石川" }, { code: 18, name: "福井" }, { code: 19, name: "山梨" }, { code: 20, name: "長野" },
  { code: 21, name: "岐阜" }, { code: 22, name: "静岡" }, { code: 23, name: "愛知" }, { code: 24, name: "三重" },
  { code: 25, name: "滋賀" }, { code: 26, name: "京都" }, { code: 27, name: "大阪" }, { code: 28, name: "兵庫" },
  { code: 29, name: "奈良" }, { code: 30, name: "和歌山" }, { code: 31, name: "鳥取" }, { code: 32, name: "島根" },
  { code: 33, name: "岡山" }, { code: 34, name: "広島" }, { code: 35, name: "山口" }, { code: 36, name: "徳島" },
  { code: 37, name: "香川" }, { code: 38, name: "愛媛" }, { code: 39, name: "高知" }, { code: 40, name: "福岡" },
  { code: 41, name: "佐賀" }, { code: 42, name: "長崎" }, { code: 43, name: "熊本" }, { code: 44, name: "大分" },
  { code: 45, name: "宮崎" }, { code: 46, name: "鹿児島" }, { code: 47, name: "沖縄" },
]

const BASIC_DEDUCTION_ANNUAL = 480_000

function findBand(monthlySalary: number, table: GradeBand[]): GradeBand {
  for (const band of table) {
    if (monthlySalary < band.salaryUpper) return band
  }
  return table[table.length - 1]
}

function calculateCompanySocialBreakdown(
  monthlySalary: number,
  prefectureCode: number,
  isAge40OrOver: boolean
): CompanySocialBreakdown {
  const healthGrade = findBand(monthlySalary, HEALTH_GRADE_TABLE)
  const pensionGrade = findBand(monthlySalary, PENSION_GRADE_TABLE)
  const healthRate = PREFECTURE_HEALTH_RATE[prefectureCode] ?? PREFECTURE_HEALTH_RATE[13]

  const healthInsuranceEmployer = (healthGrade.standardMonthly * healthRate) / 1000 / 2
  const nursingInsuranceEmployer = isAge40OrOver ? (16.2 * healthGrade.standardMonthly) / 1000 / 2 : 0
  const pensionEmployer = (183 * pensionGrade.standardMonthly) / 1000 / 2
  const employmentInsuranceEmployer = (8.5 * monthlySalary) / 1000
  const employmentInsuranceEmployee = (5.0 * monthlySalary) / 1000
  const accidentInsurance = (3.0 * monthlySalary) / 1000
  const childcareContribution = (3.6 * pensionGrade.standardMonthly) / 1000
  const childcareSupportLevyEmployer = (2.3 * healthGrade.standardMonthly) / 1000 / 2

  const employerTotal =
    healthInsuranceEmployer +
    nursingInsuranceEmployer +
    pensionEmployer +
    employmentInsuranceEmployer +
    accidentInsurance +
    childcareContribution +
    childcareSupportLevyEmployer

  const employeeTotal =
    healthInsuranceEmployer +
    nursingInsuranceEmployer +
    pensionEmployer +
    employmentInsuranceEmployee +
    childcareSupportLevyEmployer

  const totalCost = monthlySalary + employerTotal
  const effectiveRate = monthlySalary > 0 ? totalCost / monthlySalary : 0

  return {
    healthGrade,
    pensionGrade,
    healthInsuranceEmployer,
    nursingInsuranceEmployer,
    pensionEmployer,
    employmentInsuranceEmployer,
    accidentInsurance,
    childcareContribution,
    childcareSupportLevyEmployer,
    employerTotal,
    healthInsuranceEmployee: healthInsuranceEmployer,
    nursingInsuranceEmployee: nursingInsuranceEmployer,
    pensionEmployee: pensionEmployer,
    employmentInsuranceEmployee,
    childcareSupportLevyEmployee: childcareSupportLevyEmployer,
    employeeTotal,
    totalCost,
    effectiveRate,
  }
}

function calculateTotalCost(monthlySalary: number, prefectureCode: number, age40plus: boolean): number {
  return calculateCompanySocialBreakdown(monthlySalary, prefectureCode, age40plus).totalCost
}

function calculateMonthlyGrossFromBudget(
  monthlyPersonnelBudget: number,
  prefectureCode: number,
  age40plus: boolean
): number {
  let low = 0
  let high = Math.max(0, Math.floor(monthlyPersonnelBudget))
  while (high - low > 1) {
    const mid = Math.floor((low + high) / 2)
    const totalCost = calculateTotalCost(mid, prefectureCode, age40plus)
    if (totalCost <= monthlyPersonnelBudget) {
      low = mid
    } else {
      high = mid
    }
  }
  return low
}

// 給与所得控除（令和7年度）
function kyuyoKojo(gross: number): number {
  if (gross <= 1_625_000) return 550_000
  if (gross <= 1_800_000) return Math.floor(gross * 0.4) - 100_000
  if (gross <= 3_600_000) return Math.floor(gross * 0.3) + 80_000
  if (gross <= 6_600_000) return Math.floor(gross * 0.2) + 440_000
  if (gross <= 8_500_000) return Math.floor(gross * 0.1) + 1_100_000
  return 1_950_000
}

function getIncomeTaxRate(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0
  const rates = [
    { limit: 1_950_000, rate: 0.05 },
    { limit: 3_300_000, rate: 0.10 },
    { limit: 6_950_000, rate: 0.20 },
    { limit: 9_000_000, rate: 0.23 },
    { limit: 18_000_000, rate: 0.33 },
    { limit: 40_000_000, rate: 0.40 },
    { limit: Infinity, rate: 0.45 },
  ]
  return rates.find(r => taxableIncome <= r.limit)!.rate
}

// 所得税（累進課税 × 復興特別所得税 1.021）
function calcIncomeTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0
  const brackets: { limit: number; rate: number; deduction: number }[] = [
    { limit: 1_950_000, rate: 0.05, deduction: 0 },
    { limit: 3_300_000, rate: 0.10, deduction: 97_500 },
    { limit: 6_950_000, rate: 0.20, deduction: 427_500 },
    { limit: 9_000_000, rate: 0.23, deduction: 636_000 },
    { limit: 18_000_000, rate: 0.33, deduction: 1_536_000 },
    { limit: 40_000_000, rate: 0.40, deduction: 2_796_000 },
    { limit: Infinity, rate: 0.45, deduction: 4_796_000 },
  ]
  const b = brackets.find((br) => taxableIncome <= br.limit)!
  return Math.floor((taxableIncome * b.rate - b.deduction) * 1.021)
}

// 将来受取額（年末複利）
function futureValue(annualPmt: number, rate: number, years: number): number {
  if (annualPmt <= 0 || years <= 0) return 0
  return Math.floor(annualPmt * ((Math.pow(1 + rate, years) - 1) / rate))
}

// 生涯上限キャップ付き将来受取額（新NISA用・上限1,800万）
function futureValueWithCap(annualPmt: number, rate: number, years: number, lifetimeCap: number): number {
  if (annualPmt <= 0 || years <= 0) return 0
  const contribYears = Math.min(years, Math.floor(lifetimeCap / annualPmt))
  const fvAtEnd = futureValue(annualPmt, rate, contribYears)
  const growthYears = years - contribYears
  if (growthYears <= 0) return fvAtEnd
  return Math.floor(fvAtEnd * Math.pow(1 + rate, growthYears))
}

export function formatYen(value: number): string {
  return `${Math.round(value).toLocaleString("ja-JP")}円`
}

export function formatManYen(value: number): string {
  return `${Math.round(value / 10_000).toLocaleString("ja-JP")}万円`
}

export function calculateSes(input: SesInput): SesResult {
  const monthlyUnit = Math.max(0, input.monthlyUnit)
  const marginRate = Math.min(Math.max(input.marginRate, 0.1), 0.3)
  const bonusAnnual = Math.max(0, input.bonusAnnual)
  const prefectureCode = PREFECTURE_HEALTH_RATE[input.prefectureCode] ? input.prefectureCode : 13

  const monthlyPersonnelBudget = Math.max(0, monthlyUnit * (1 - marginRate))
  const monthlyGrossEstimated = calculateMonthlyGrossFromBudget(
    monthlyPersonnelBudget,
    prefectureCode,
    input.age40plus
  )
  const socialBreakdown = calculateCompanySocialBreakdown(monthlyGrossEstimated, prefectureCode, input.age40plus)
  const grossAnnualTotal = monthlyGrossEstimated * 12 + bonusAnnual

  // 社会保険（本人負担）: グレードテーブルから算出済みの employeeTotal × 12
  const socialInsurance = Math.floor(socialBreakdown.employeeTotal * 12)

  // 給与所得控除 → 給与所得
  const kyuyoShotoku = Math.max(0, grossAnnualTotal - kyuyoKojo(grossAnnualTotal))

  // 課税所得 = 給与所得 − 基礎控除 − 社会保険（本人）− iDeCo − 扶養控除 − 配偶者控除
  const idecoAnnual = Math.max(0, input.asset.idecoAnnual)
  const dependentsDeduction = Math.max(0, input.dependents) * 380_000
  const spouseKojo = input.spouseDeduction ? 380_000 : 0
  const taxableIncome = Math.max(0, kyuyoShotoku - BASIC_DEDUCTION_ANNUAL - socialInsurance - idecoAnnual - dependentsDeduction - spouseKojo)

  const incomeTax = calcIncomeTax(taxableIncome)
  const residentTax = Math.floor(taxableIncome * 0.1) + (taxableIncome > 0 ? 5_000 : 0)
  const taxAndSocialTotal = socialInsurance + incomeTax + residentTax
  const effectiveBurdenRate = grossAnnualTotal > 0 ? taxAndSocialTotal / grossAnnualTotal : 0

  const personalAssetContributions = input.asset.nisaAnnual + idecoAnnual
  const netAnnual = Math.max(0, grossAnnualTotal - taxAndSocialTotal - personalAssetContributions)
  const netMonthlyAvg = Math.floor(netAnnual / 12)

  const benefitAnnualTotal =
    input.benefits.commuteAllowanceAnnual +
    input.benefits.learningSubsidyAnnual +
    input.benefits.certAllowanceAnnual +
    input.benefits.remoteWorkSubsidyAnnual +
    input.benefits.healthCheckBenefitAnnual +
    input.benefits.otherAnnual
  const adjustedNetAnnual = netAnnual + benefitAnnualTotal

  const horizonYears = input.asset.horizonYears
  const NISA_CAP = 18_000_000
  const future = {
    nisaFuture3: futureValueWithCap(input.asset.nisaAnnual, 0.03, horizonYears, NISA_CAP),
    nisaFuture5: futureValueWithCap(input.asset.nisaAnnual, 0.05, horizonYears, NISA_CAP),
    idecoFuture3: futureValue(idecoAnnual, 0.03, horizonYears),
    idecoFuture5: futureValue(idecoAnnual, 0.05, horizonYears),
    totalFuture3: futureValueWithCap(input.asset.nisaAnnual, 0.03, horizonYears, NISA_CAP) + futureValue(idecoAnnual, 0.03, horizonYears),
    totalFuture5: futureValueWithCap(input.asset.nisaAnnual, 0.05, horizonYears, NISA_CAP) + futureValue(idecoAnnual, 0.05, horizonYears),
  }

  // ふるさと納税目安上限
  const residentTaxShotoku = taxableIncome * 0.1
  const itRate = getIncomeTaxRate(taxableIncome)
  const furusatoDenominator = 0.9 - itRate * 1.021 - 0.1
  const furusatoMax = furusatoDenominator > 0
    ? Math.floor(residentTaxShotoku * 0.2 / furusatoDenominator) + 2_000
    : 0

  // 年金見込み（horizonYearsを厚生年金加入年数として概算）
  const pensionYears = Math.min(horizonYears, 40)
  const kisoNenkin = Math.floor(816_000 * pensionYears / 40)
  const koseiNenkin = Math.floor(socialBreakdown.pensionGrade.standardMonthly * 5.481 / 1000 * 12 * pensionYears)
  const estimatedAnnualPension = kisoNenkin + koseiNenkin

  return {
    monthlyPersonnelBudget,
    monthlyGrossEstimated,
    grossAnnualTotal,
    socialBreakdown,
    socialInsurance,
    kyuyoShotoku,
    taxableIncome,
    incomeTax,
    residentTax,
    taxAndSocialTotal,
    effectiveBurdenRate,
    netAnnual,
    netMonthlyAvg,
    benefitAnnualTotal,
    adjustedNetAnnual,
    future,
    estimatedAnnualPension,
    pensionYears,
    furusatoMax,
  }
}
