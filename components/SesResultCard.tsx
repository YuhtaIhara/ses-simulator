"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatManYen } from "@/lib/ses-calculations"
import { SesResult } from "@/lib/ses-types"

interface Props {
  result: SesResult
}

function Row({
  label,
  amount,
  strong = false,
  negative = false,
  indent = false,
  muted = false,
}: {
  label: string
  amount: number
  strong?: boolean
  negative?: boolean
  indent?: boolean
  muted?: boolean
}) {
  return (
    <div className={`flex items-center justify-between py-1.5 ${indent ? "pl-3" : ""}`}>
      <span className={`text-sm ${strong ? "font-semibold" : muted ? "text-muted-foreground/70" : "text-muted-foreground"}`}>
        {label}
      </span>
      <span className={`tabular-nums ${strong ? "text-base font-semibold" : "text-sm"} ${negative ? "text-rose-500" : ""} ${muted ? "text-muted-foreground/70" : ""}`}>
        {negative ? "▲ " : ""}{formatManYen(amount)}
      </span>
    </div>
  )
}

export function SesResultCard({ result }: Props) {
  const s = result.socialBreakdown
  const hasAssets = result.future.nisaFuture3 > 0 || result.future.idecoFuture3 > 0

  return (
    <div className="space-y-4">
      {/* ヒーローカード */}
      <Card className="border-2 border-emerald-500 bg-emerald-50">
        <CardContent className="pt-5">
          <p className="mb-1 text-sm text-emerald-700">手取り年収（概算）</p>
          <p className="text-4xl font-bold tabular-nums text-emerald-700">{formatManYen(result.netAnnual)}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            月額 {formatManYen(result.netMonthlyAvg)} / 実効負担率 {(result.effectiveBurdenRate * 100).toFixed(1)}%
          </p>
        </CardContent>
      </Card>

      {/* 収支内訳 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">収支内訳</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Row label="年収総額（賞与込み）" amount={result.grossAnnualTotal} strong />
          <Row label="推定月給" amount={result.monthlyGrossEstimated} />
          <Separator className="my-2" />
          <Row label="社会保険（本人負担）" amount={result.socialInsurance} negative />
          <Row label="　健康保険" amount={s.healthInsuranceEmployee * 12} negative indent muted />
          {s.nursingInsuranceEmployee > 0 && (
            <Row label="　介護保険" amount={s.nursingInsuranceEmployee * 12} negative indent muted />
          )}
          <Row label="　厚生年金" amount={s.pensionEmployee * 12} negative indent muted />
          <Row label="　雇用保険" amount={s.employmentInsuranceEmployee * 12} negative indent muted />
          <Row label="所得税" amount={result.incomeTax} negative />
          <Row label="住民税" amount={result.residentTax} negative />
          <Row label="税社保合計" amount={result.taxAndSocialTotal} strong negative />
          <Separator className="my-2" />
          <Row label="手取り年収" amount={result.netAnnual} strong />
          <Row label="月額平均" amount={result.netMonthlyAvg} />
          {result.benefitAnnualTotal > 0 && (
            <>
              <Separator className="my-2" />
              <Row label="福利厚生（非課税）" amount={result.benefitAnnualTotal} />
              <Row label="実質受取総額" amount={result.adjustedNetAnnual} strong />
            </>
          )}
        </CardContent>
      </Card>

      {/* 将来資産・年金 */}
      <Card className="border-violet-200 bg-violet-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-violet-700">将来受取額（年金・積立）</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 text-sm">
          <div className="flex justify-between py-1.5">
            <div>
              <span className="text-muted-foreground">老齢年金（基礎＋厚生）</span>
              <p className="text-xs text-muted-foreground/70">{result.pensionYears}年加入ベースの概算・月額 {formatManYen(Math.round(result.estimatedAnnualPension / 12))}</p>
            </div>
            <span className="tabular-nums font-semibold text-violet-700">{formatManYen(result.estimatedAnnualPension)}<span className="text-xs font-normal text-muted-foreground">/年</span></span>
          </div>
          {hasAssets && (
            <>
              <Separator className="my-2" />
              {result.future.nisaFuture3 > 0 && (
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">新NISA（運用益非課税）</span>
                  <span className="tabular-nums">
                    {formatManYen(result.future.nisaFuture3)}
                    <span className="text-muted-foreground"> / {formatManYen(result.future.nisaFuture5)}</span>
                  </span>
                </div>
              )}
              {result.future.idecoFuture3 > 0 && (
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">iDeCo</span>
                  <span className="tabular-nums">
                    {formatManYen(result.future.idecoFuture3)}
                    <span className="text-muted-foreground"> / {formatManYen(result.future.idecoFuture5)}</span>
                  </span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between py-1.5 font-semibold">
                <span>積立合計</span>
                <span className="tabular-nums">
                  {formatManYen(result.future.totalFuture3)}
                  <span className="text-muted-foreground font-normal"> / {formatManYen(result.future.totalFuture5)}</span>
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">積立: 年利3% / 5%で運用した場合の概算</p>
            </>
          )}
          <p className="text-xs text-muted-foreground mt-2 pt-2 border-t">年金は令和7年度額・運用年数を加入年数として概算。実際の受取額は加入履歴・物価スライドにより変動します。</p>
        </CardContent>
      </Card>

      <p className="text-xs text-center text-muted-foreground">計算結果はあくまで概算です</p>
    </div>
  )
}
