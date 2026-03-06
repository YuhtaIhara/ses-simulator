"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { PREFECTURES } from "@/lib/ses-calculations"
import { SesInput } from "@/lib/ses-types"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Props {
  input: SesInput
  onChange: (next: SesInput) => void
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{children}</p>
}

function MoneySlider({
  label,
  value,
  min,
  max,
  step = 10_000,
  suffix = "万円",
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Label>{label}</Label>
        <span className="text-lg font-bold tabular-nums">{Math.round(value / 10_000)} {suffix}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={([v]) => onChange(v)} />
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>{Math.round(min / 10_000)}万円</span>
        <span>{Math.round(max / 10_000)}万円</span>
      </div>
    </div>
  )
}

function RateSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Label>{label}</Label>
        <span className="text-lg font-bold tabular-nums">{(value * 100).toFixed(0)}%</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={([v]) => onChange(v)} />
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>{(min * 100).toFixed(0)}%</span>
        <span>{(max * 100).toFixed(0)}%</span>
      </div>
    </div>
  )
}

function InfoTip({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="inline ml-1 h-3.5 w-3.5 text-muted-foreground cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-xs">{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function SesSimulatorForm({ input, onChange }: Props) {
  const setRoot = <K extends keyof SesInput>(key: K, value: SesInput[K]) => onChange({ ...input, [key]: value })
  const setBenefits = <K extends keyof SesInput["benefits"]>(key: K, value: SesInput["benefits"][K]) =>
    onChange({ ...input, benefits: { ...input.benefits, [key]: value } })
  const setAsset = <K extends keyof SesInput["asset"]>(key: K, value: SesInput["asset"][K]) =>
    onChange({ ...input, asset: { ...input.asset, [key]: value } })

  const hasAssets = input.asset.nisaAnnual > 0 || input.asset.idecoAnnual > 0

  return (
    <div className="space-y-6">
      <section>
        <SectionLabel>基本情報</SectionLabel>
        <div className="space-y-5">
          <MoneySlider
            label="月単価"
            value={input.monthlyUnit}
            min={300_000}
            max={2_000_000}
            onChange={(v) => setRoot("monthlyUnit", v)}
          />

          <RateSlider
            label="利益率"
            value={input.marginRate}
            min={0.1}
            max={0.3}
            step={0.01}
            onChange={(v) => setRoot("marginRate", v)}
          />

          <div>
            <Label className="mb-2 block">都道府県</Label>
            <Select
              value={String(input.prefectureCode)}
              onValueChange={(v) => setRoot("prefectureCode", Number(v))}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent className="max-h-60">
                {PREFECTURES.map((pref) => (
                  <SelectItem key={pref.code} value={String(pref.code)}>{pref.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label>
              40歳以上
              <InfoTip>40〜64歳は社会保険に介護保険分が加算されます。</InfoTip>
            </Label>
            <Switch checked={input.age40plus} onCheckedChange={(v) => setRoot("age40plus", v)} />
          </div>

          <div>
            <Label className="mb-2 block">
              扶養家族人数
              <InfoTip>扶養控除として1人あたり38万円が課税所得から控除されます。</InfoTip>
            </Label>
            <Select
              value={String(input.dependents)}
              onValueChange={(v) => setRoot("dependents", Number(v))}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent className="max-h-60">
                {[0, 1, 2, 3, 4].map((n) => (
                  <SelectItem key={n} value={String(n)}>{n}人</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label>
              配偶者控除
              <InfoTip>配偶者の年収が103万円以下の場合、課税所得から38万円が控除されます（本人の合計所得900万以下が条件）。</InfoTip>
            </Label>
            <Switch checked={input.spouseDeduction} onCheckedChange={(v) => setRoot("spouseDeduction", v)} />
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <SectionLabel>賞与・福利厚生</SectionLabel>
        <div className="space-y-5">
          <MoneySlider
            label="年間賞与"
            value={input.bonusAnnual}
            min={0}
            max={2_000_000}
            onChange={(v) => setRoot("bonusAnnual", v)}
          />
          <MoneySlider label="通勤手当（年）" value={input.benefits.commuteAllowanceAnnual} min={0} max={600_000} onChange={(v) => setBenefits("commuteAllowanceAnnual", v)} />
          <MoneySlider label="学習補助（年）" value={input.benefits.learningSubsidyAnnual} min={0} max={500_000} onChange={(v) => setBenefits("learningSubsidyAnnual", v)} />
          <MoneySlider label="資格手当（年）" value={input.benefits.certAllowanceAnnual} min={0} max={500_000} onChange={(v) => setBenefits("certAllowanceAnnual", v)} />
          <MoneySlider label="在宅補助（年）" value={input.benefits.remoteWorkSubsidyAnnual} min={0} max={300_000} onChange={(v) => setBenefits("remoteWorkSubsidyAnnual", v)} />
          <MoneySlider label="健診補助（年）" value={input.benefits.healthCheckBenefitAnnual} min={0} max={100_000} step={1_000} onChange={(v) => setBenefits("healthCheckBenefitAnnual", v)} />
          <MoneySlider label="慶弔・その他（年）" value={input.benefits.otherAnnual} min={0} max={200_000} onChange={(v) => setBenefits("otherAnnual", v)} />
        </div>
      </section>

      <Separator />

      <section>
        <SectionLabel>積立</SectionLabel>
        <div className="space-y-5">
          <MoneySlider
            label="新NISA積立（年）"
            value={input.asset.nisaAnnual}
            min={0}
            max={1_200_000}
            onChange={(v) => setAsset("nisaAnnual", v)}
          />
          <div>
            <div className="mb-2 flex items-center">
              <Label>iDeCo（年）</Label>
              <InfoTip>会社員（企業年金なし）の上限は2.3万円/月・27.6万円/年。フリーランスの上限（6.8万/月）より低い。</InfoTip>
            </div>
            <div className="mb-2 flex justify-end">
              <span className="text-lg font-bold tabular-nums">{(input.asset.idecoAnnual / 10_000).toFixed(1)} 万円</span>
            </div>
            <Slider
              value={[input.asset.idecoAnnual]}
              min={0}
              max={276_000}
              step={10_000}
              onValueChange={([v]) => setAsset("idecoAnnual", v)}
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>0万円</span>
              <span>27.6万円（上限）</span>
            </div>
          </div>

          {hasAssets && (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label>運用年数</Label>
                <span className="text-lg font-bold tabular-nums">{input.asset.horizonYears}年</span>
              </div>
              <Slider
                value={[input.asset.horizonYears]}
                min={5}
                max={40}
                step={1}
                onValueChange={([v]) => setAsset("horizonYears", v)}
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>5年</span>
                <span>40年</span>
              </div>
            </div>
          )}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label>
                年金受給期間
                <InfoTip>65歳から何年間受給するかの想定。年金総受取額の計算に使用します。平均寿命ベースだと20年前後が目安です。</InfoTip>
              </Label>
              <span className="text-lg font-bold tabular-nums">{input.asset.pensionReceiveYears}年</span>
            </div>
            <Slider
              value={[input.asset.pensionReceiveYears]}
              min={10}
              max={35}
              step={1}
              onValueChange={([v]) => setAsset("pensionReceiveYears", v)}
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>10年</span>
              <span>35年</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
