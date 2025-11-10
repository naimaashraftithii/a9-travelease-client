export default function Footer(){
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-semibold">TravelEase</p>
        <p className="text-sm">© {new Date().getFullYear()} TravelEase. All rights reserved.</p>
        <div className="flex gap-3">
          <a href="#" aria-label="X">✖</a>
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Instagram">ig</a>
        </div>
      </div>
    </footer>
  )
}
