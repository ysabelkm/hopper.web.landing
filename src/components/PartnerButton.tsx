import { motion } from "motion/react"
import { cn } from "../lib/utils"

interface PartnerButtonProps {
  className?: string
  onClick?: () => void
}

export function PartnerButton({ className, onClick }: PartnerButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "px-12 py-5 glass rounded-full text-lg font-bold hover:bg-white/10 transition-all cursor-pointer",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Partner with us
    </motion.button>
  )
}
