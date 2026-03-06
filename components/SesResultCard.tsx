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
  highlight = false,
  muted = false,
  indent = false,
}: {
  label: string
  amount: number
  highlight?: boolean
  muted?: boolean
  indent?: boolean
}) {
  return (
    <div className={`flex items-center justify-between py-1.5 ${indent ? "pl-4" : ""}`}>
      <span className={`text-sm ${muted ? "text-muted-foreground" : ""} ${highlight ? "font-semibold" : ""}`}>
        {label}
      </span>
      <span className={`tabular-nums text-sm ${highlight ? "text-base font-bold" : ""} ${muted ? "text-muted-foreground" : ""}`}>
        {formatManYen(amount)}
      </span>
    </div>
  )
}

function DeductionRow({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex items-center justify-between py-1.5 pl-4">
      <span className="text-sm text-muted-foreground">− {label}</span>
      <span className="tabular-nums text-sm text-rose-500">▼ {formatManYen(amount)}</span>
    </div>
  )
}

export function SesResultCard({ result }: Props) {
  const s = result.socialBreakdown
  const hasAssets = result.future.nisaFuture3 > 0 || result.future.idecoFuture3 > 0

  return (
    <div className="space-y-4">
      {/* ヒーロー */}
      <Card className="border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950">
        <CardContent className="pt-5 pb-4">
          <p className="mb-1 text-sm text-emerald-700 dark:text-emerald-300">手取り年収（概算）</p>
          <p className="text-4xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{formatManYen(result.netAnnual)}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            月額 {formatManYen(result.netMonthlyAvg)} ／ 実効負担率 {(result.effectiveBurdenRate * 100).toFixed(1)}%
          </p>
        </CardContent>
      </Card>

      {/* 収支内訳 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">収支内訳</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Row label="年収総額（賞与込み）" amount={result.grossAnnualTotal} highlight />
          <Row label="推定月給" amount={result.monthlyGrossEstimated} muted />

          <Separator className="my-2" />
          <p className="text-xs text-muted-foreground mb-1">社会保険（本人負担）</p>
          <DeductionRow label="健康保険" amount={s.healthInsuranceEmployee * 12} />
          {s.nursingInsuranceEmployee > 0 && (
            <DeductionRow label="介護保険" amount={s.nursingInsuranceEmployee * 12} />
          )}
          <DeductionRow label="厚生年金" amount={s.pensionEmployee * 12} />
          <DeductionRow label="雇用保険" amount={s.employmentInsuranceEmployee * 12} />

          <Separator className="my-2" />
          <p className="text-xs text-muted-foreground mb-1">税金</p>
          <Row label="課税所得" amount={result.taxableIncome} muted />
          <DeductionRow label="所得税（復興税込）" amount={result.incomeTax} />
          <DeductionRow label="住民税" amount={result.residentTax} />

          <Separator className="my-2" />
          <p className="text-xs font-medium">合計負担（社保+税）</p>
          <Row label="" amount={result.taxAndSocialTotal} highlight />

          {(result.annualIdeco > 0 || result.annualNisa > 0) && (
            <>
              <Separator className="my-2" />
              <p className="text-xs text-muted-foreground mb-1">積立（将来受取）</p>
              {result.annualIdeco > 0 && <DeductionRow label="iDeCo" amount={result.annualIdeco} />}
              {result.annualNisa > 0 && <DeductionRow label="新NISA" amount={result.annualNisa} />}
            </>
          )}

          <Separator className="my-3" />
          <Row label="手取り年収" amount={result.netAnnual} highlight />
          <Row label="月額平均" amount={result.netMonthlyAvg} muted />
          {result.benefitAnnualTotal > 0 && (
            <>
              <Separator className="my-2" />
              <p className="text-xs text-muted-foreground mb-1">福利厚生（非課税）</p>
              <Row label="福利厚生合計" amount={result.benefitAnnualTotal} />
              <Row label="実質受取総額" amount={result.adjustedNetAnnual} highlight />
            </>
          )}
        </CardContent>
      </Card>

      {/* 将来受取額・年金 */}
      <Card className="border-violet-300 bg-violet-50 dark:bg-violet-950">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-violet-700 dark:text-violet-300">将来受取額（年金・積立）</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          <div className="flex justify-between items-start text-sm">
            <div>
              <span>老齢年金（基礎＋厚生）</span>
              <div className="text-xs text-muted-foreground mt-0.5">{result.pensionYears}年加入ベースの概算・月額 {formatManYen(Math.round(result.estimatedAnnualPension / 12))}</div>
            </div>
            <span className="tabular-nums font-semibold text-violet-700 dark:text-violet-300">
              {formatManYen(result.estimatedAnnualPension)}<span className="text-xs font-normal text-muted-foreground">/年</span>
            </span>
          </div>

          {hasAssets && (
            <>
              <Separator />
              {result.future.nisaFuture3 > 0 && (
                <div className="flex justify-between items-start text-sm">
                  <span>新NISA（運用益非課税）</span>
                  <div className="text-right tabular-nums">
                    <div className="font-semibold text-violet-700 dark:text-violet-300">
                      {formatManYen(result.future.nisaFuture3)}<span className="text-xs font-normal text-muted-foreground ml-1">（年利3%）</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatManYen(result.future.nisaFuture5)}<span className="ml-1">（年利5%）</span>
                    </div>
                  </div>
                </div>
              )}
              {result.future.idecoFuture3 > 0 && (
                <div className="flex justify-between items-start text-sm">
                  <span>iDeCo</span>
                  <div className="text-right tabular-nums">
                    <div className="font-semibold text-violet-700 dark:text-violet-300">
                      {formatManYen(result.future.idecoFuture3)}<span className="text-xs font-normal text-muted-foreground ml-1">（年利3%）</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatManYen(result.future.idecoFuture5)}<span className="ml-1">（年利5%）</span>
                    </div>
                  </div>
                </div>
              )}
              <Separator className="my-1" />
              <div className="flex justify-between items-start text-sm font-semibold">
                <span>積立合計</span>
                <div className="text-right tabular-nums">
                  <div className="text-violet-700 dark:text-violet-300">
                    {formatManYen(result.future.totalFuture3)}<span className="text-xs font-normal text-muted-foreground ml-1">（年利3%）</span>
                  </div>
                  <div className="text-xs font-normal text-muted-foreground">
                    {formatManYen(result.future.totalFuture5)}<span className="ml-1">（年利5%）</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground pt-1 border-t">
                ※iDeCo・新NISAは想定利回り。実際の運用益は変動します。
              </p>
            </>
          )}
          <p className="text-xs text-muted-foreground pt-2 border-t">年金は令和7年度額・運用年数を加入年数として概算。実際の受取額は加入履歴・物価スライドにより変動します。</p>
        </CardContent>
      </Card>

      {/* ふるさと納税 目安 */}
      {result.furusatoMax > 2_000 && (
        <Card className="border-slate-200 bg-slate-50 dark:bg-slate-900">
          <CardContent className="pt-4 pb-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">参考: ふるさと納税</p>
            <div className="flex justify-between items-baseline">
              <span className="text-sm">目安上限額</span>
              <span className="tabular-nums font-bold text-base">{formatManYen(result.furusatoMax)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              返礼品換算で約 {formatManYen(Math.floor(result.furusatoMax * 0.3 / 10_000) * 10_000)} 相当（30%目安）。
              2,000円の自己負担を除く全額が控除対象。
            </p>
          </CardContent>
        </Card>
      )}

      {/* 免責 */}
      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        令和7年度（2025年度）の税率・保険料率に基づく概算です。<br />
        実際の保険料は状況により異なります。税務の判断は税理士にご相談ください。
      </p>
    </div>
  )
}
