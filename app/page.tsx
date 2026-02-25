'use client'

import { useState, useCallback } from 'react'

const bases = [
  { name: 'Binary', base: 2, prefix: '0b' },
  { name: 'Octal', base: 8, prefix: '0o' },
  { name: 'Decimal', base: 10, prefix: '' },
  { name: 'Hexadecimal', base: 16, prefix: '0x' },
]

export default function Home() {
  const [values, setValues] = useState<Record<number, string>>({ 10: '255' })
  const [lastEdited, setLastEdited] = useState(10)
  const [copied, setCopied] = useState<string | null>(null)

  const convertFrom = useCallback((value: string, fromBase: number) => {
    if (!value.trim()) return {}
    
    try {
      const decimal = parseInt(value, fromBase)
      if (isNaN(decimal)) return {}
      
      const result: Record<number, string> = {}
      bases.forEach(({ base }) => {
        if (base === 10) {
          result[base] = decimal.toString()
        } else {
          result[base] = decimal.toString(base).toUpperCase()
        }
      })
      return result
    } catch {
      return {}
    }
  }, [])

  const handleChange = (base: number, value: string) => {
    setLastEdited(base)
    const converted = convertFrom(value, base)
    setValues(converted)
  }

  const copyToClipboard = useCallback((value: string, baseName: string) => {
    navigator.clipboard.writeText(value)
    setCopied(baseName)
    setTimeout(() => setCopied(null), 2000)
  }, [])

  const clearAll = useCallback(() => {
    setValues({})
    setLastEdited(10)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg">🔢</div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Base Converter</h1>
                <p className="text-sm text-slate-500">Binary · Octal · Decimal · Hex</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#tool" className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors">Tool</a>
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors">Features</a>
              <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors">FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-3xl shadow-xl mb-6">🔢</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Number Base Converter</h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">Convert between binary, decimal, hexadecimal, and octal number systems instantly. Essential tool for programmers and students.</p>
          </div>
        </div>
      </section>

      <main id="tool" className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8">
          <div className="flex justify-end mb-4">
            <button onClick={clearAll} className="btn-ghost text-sm">🗑️ Clear All</button>
          </div>

          <div className="space-y-4">
            {bases.map(({ name, base, prefix }) => (
              <div key={base} className={`bg-slate-50 rounded-xl border p-4 transition-all ${
                lastEdited === base ? 'border-violet-300 ring-2 ring-violet-100' : 'border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-700">{name}</span>
                    <span className="text-xs text-slate-400">(Base {base})</span>
                  </div>
                  {prefix && (<span className="text-xs text-slate-400 font-mono">{prefix}</span>)}
                  {values[base] && (
                    <button
                      onClick={() => copyToClipboard(prefix + values[base], name)}
                      className="text-xs font-medium text-violet-600 hover:text-violet-700"
                    >
                      {copied === name ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={values[base] || ''}
                  onChange={(e) => handleChange(base, e.target.value)}
                  placeholder={`Enter ${name.toLowerCase()} number...`}
                  className="w-full input font-mono text-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <section id="features" className="bg-white border-t border-slate-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Use Our Base Converter?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🔢', title: 'Multiple Bases', description: 'Convert between binary, octal, decimal, and hexadecimal instantly.' },
              { icon: '⚡', title: 'Real-time', description: 'See conversions update as you type. No button clicks needed.' },
              { icon: '📋', title: 'Easy Copy', description: 'Copy any base value with one click, including prefixes.' },
              { icon: '🎯', title: 'Visual Feedback', description: 'Highlighted field shows which base you are currently editing.' },
              { icon: '💻', title: 'Programmer Friendly', description: 'Perfect for debugging, learning, and quick conversions.' },
              { icon: '💯', title: 'Free Forever', description: 'No registration, no limits. Completely free.' },
            ].map((f, i) => (
              <div key={i} className="group p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-violet-200 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center text-2xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-slate-50 border-t border-slate-200 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'What number bases are supported?', a: 'We support binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16).' },
              { q: 'Is this tool free?', a: 'Yes, completely free. No registration required.' },
              { q: 'Do I need to click a convert button?', a: 'No! Just type in any field and all other bases update automatically in real-time.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">🔢</div>
              <span className="text-white font-semibold">Base Converter</span>
            </div>
            <p className="text-sm">© 2024 SmartOK Tools. Free online tools.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="text-sm hover:text-white">Privacy</a>
              <a href="/terms" className="text-sm hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
