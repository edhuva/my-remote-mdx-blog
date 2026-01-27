export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-zinc-100 border-t border-zinc-300 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 text-center text-sm text-black/70">
        © {new Date().getFullYear()} Edwin Matema. All rights reserved.
      </div>
    </footer>
  )
}
