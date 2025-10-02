import './globals.css'
import Script from 'next/script'
import Link from 'next/link'

export const metadata = {
  title: 'Setups.Space | Currency & Crypto Converter',
  description: 'Modern currency and crypto converter with live data and sleek UI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="adsense"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2846868566486218"
        />
      </head>
      <body>
        <header className="fixed inset-x-0 top-0 z-50 bg-black/40 backdrop-blur border-b border-white/10">
          <div className="container-max py-4 flex items-center justify-between">
            <Link href="/" className="brand text-xl">Setups.Space</Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link className="hover:underline" href="/about">About</Link>
              <Link className="hover:underline" href="/contact">Contact</Link>
              <a href="mailto:info@setups.space" className="pill">info@setups.space</a>
            </nav>
          </div>
        </header>
        <main className="pt-24">{children}</main>
        <footer className="border-t border-white/10 mt-16">
          <div className="container-max py-8 text-center subtle">
            © {new Date().getFullYear()} Setups.Space · <a href="mailto:info@setups.space">info@setups.space</a>
          </div>
        </footer>
      </body>
    </html>
  )
}
