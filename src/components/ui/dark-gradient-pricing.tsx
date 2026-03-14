import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface BenefitProps {
  text: string
}

const Benefit = ({ text }: BenefitProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-4 place-content-center rounded-full bg-gold-600/20 text-sm text-gold-600 flex-shrink-0">
        <Check className="size-3" />
      </span>
      <span className="text-sm text-white/60 font-light">{text}</span>
    </div>
  )
}

interface PricingCardProps {
  tier: string
  price: string
  priceLabel?: string
  CTA: string
  benefits: string[]
  highlighted?: boolean
  className?: string
  ctaHref?: string
}

export const PricingCard = ({
  tier,
  price,
  priceLabel = "/ Monat",
  CTA,
  benefits,
  highlighted = false,
  className,
  ctaHref = "#demo",
}: PricingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card
        className={cn(
          "relative h-full w-full overflow-hidden flex flex-col",
          "bg-gradient-to-b from-white/[0.03] to-transparent",
          highlighted
            ? "border-gold-600/50 shadow-[0_0_40px_rgba(139,115,0,0.08)]"
            : "border-white/5",
          "p-8",
          className,
        )}
      >
        {highlighted && (
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-600/60 to-transparent" />
        )}

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-white/55 mb-4">{tier}</p>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-black text-white">{price}</span>
            {price !== "Individuell" && (
              <span className="text-sm text-white/55 font-light">{priceLabel}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gold-600 text-xs">✦</span>
            <span className="text-gold-600 text-[10px] tracking-[0.25em] uppercase font-medium">
              Inklusive
            </span>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-3.5 flex-1 mb-8">
          {benefits.map((benefit, index) => (
            <Benefit key={index} text={benefit} />
          ))}
        </div>

        {/* CTA */}
        <Button
          asChild
          variant={highlighted ? "default" : "ghost"}
          className="w-full h-12"
        >
          <a href={ctaHref}>{CTA}</a>
        </Button>
      </Card>
    </motion.div>
  )
}
