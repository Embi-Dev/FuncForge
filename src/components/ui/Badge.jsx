export function Badge({ className = "", variant = "default", children, ...props }) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80 bg-gray-900 text-white",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 bg-gray-100 text-gray-900",
    outline: "text-foreground border border-gray-300",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
