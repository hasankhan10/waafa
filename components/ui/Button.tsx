import React, { ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  href,
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-label-caps text-label-caps uppercase tracking-widest transition-all duration-300";
  
  const variants = {
    primary: "px-8 py-4 bg-primary text-on-primary hover:bg-primary-container",
    secondary: "px-8 py-4 border border-secondary text-on-surface hover:bg-surface-container-high",
    ghost: "text-primary border-b border-primary pb-1 hover:text-primary-container hover:border-primary-container",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
};
