export default function Footer(){
  return (
    <footer className="border-t bg-base-100">
      <div className="container mx-auto px-4 py-8 grid sm:grid-cols-3 gap-6 items-center">
        <div className="sm:col-span-1">
          <p className="text-lg font-semibold">TravelEase</p>
          <p className="text-sm opacity-70">© {new Date().getFullYear()} TravelEase. All rights reserved.</p>
        </div>

        <div className="flex justify-center gap-3">
          {/* Use X (not bird) */}
          <a className="btn btn-sm" href="#" aria-label="X">✖</a>
          <a className="btn btn-sm" href="#" aria-label="Facebook">f</a>
          <a className="btn btn-sm" href="#" aria-label="Instagram">ig</a>
        </div>

        <div className="text-center sm:text-right text-sm opacity-70">
          Built with React • DaisyUI • Tailwind • Firebase
        </div>
      </div>
    </footer>
  )
}
