"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export type CTAButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function CTAButton({ 
  href, 
  onClick, 
  children, 
  variant = "primary",
  size = "md",
  className = ""
}: CTAButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-1";
  
  const sizeClasses = {
    sm: "px-6 py-3 text-sm rounded-full",
    md: "px-8 py-4 text-base rounded-full",
    lg: "px-10 py-5 text-lg rounded-full"
  };
  
  const variantClasses = {
    primary: "bg-[#E63946] shadow-[0_20px_60px_rgba(230,57,70,0.3)] hover:bg-[#D62839] hover:shadow-[0_25px_70px_rgba(230,57,70,0.4)]",
    secondary: "bg-[#F77F00] shadow-lg hover:bg-[#E67300]"
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
  };

  const content = (
    <motion.button
      className={combinedClasses}
      onClick={onClick}
      {...motionProps}
    >
      <span className="text-xl">🎊</span>
      <span>{children}</span>
    </motion.button>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
