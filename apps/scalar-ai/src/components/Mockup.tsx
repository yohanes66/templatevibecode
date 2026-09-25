export function Mockup({ className }: { className: string }) {
  return (
    <div className={`mockup ${className}`}>
      <div className="mockup-inner">
        <div className="mockup-screen">
          <img src="/images/dashboard-screen.webp" alt="Scalar.ai brand visibility dashboard" />
        </div>
      </div>
    </div>
  )
}
