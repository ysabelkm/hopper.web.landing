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
        "w-full sm:w-auto min-w-64 px-10 py-5 bg-transparent border border-current/20 rounded-2xl text-base font-semibold hover:bg-current/5 hover:border-current/40 transition-colors cursor-pointer shadow-none backdrop-blur-none",
        className
      )}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      Partner with us
    </motion.button>
  )
}
