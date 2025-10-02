'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { allSymbols, isCrypto } from '../lib/currencies'

type RateMap = Record<string, number>

export default function Converter() {
  const [amount, setAmount] = useState(100)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('BTC')
  const [rates, setRates] = useState<RateMap>({})
  const [series, setSeries] = useState<{ time: string; value: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFiat = async () => {
      const res = await fetch('https://api.exchangerate.host/latest?base=USD')
      const data = await res.json()
      setRates((prev) => ({ ...prev, ...data.rates, USD: 1 }))
    }
    fetchFiat()
  }, [])

  async function loadCrypto(symbol: string) {
    const idMap: Record<string,string> = {
      BTC: 'bitcoin', ETH: 'ethereum', SOL: 'solana', DOGE: 'dogecoin', XRP: 'ripple', ADA: 'cardano', BNB: 'binancecoin'
    }
    const id = idMap[symbol]
    if (!id) return
    const [priceRes, histRes] = await Promise.all([
      fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`),
      fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=hourly`)
    ])
    const priceData = await priceRes.json()
    const histData = await histRes.json()
    const usd = priceData[id]?.usd ?? 0
    setRates((prev) => ({ ...prev, [symbol]: usd }))
    const mapped = (histData?.prices || []).map((p: [number, number]) => ({
      time: new Date(p[0]).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      value: p[1],
    }))
    setSeries(mapped)
  }

  useEffect(() => {
    setLoading(true)
    const ops: Promise<any>[] = []
    if (isCrypto(to)) ops.push(loadCrypto(to))
    else if (isCrypto(from)) ops.push(loadCrypto(from))
    Promise.all(ops).finally(() => setLoading(false))
  }, [from, to])

  const result = useMemo(() => {
    if (!rates) return 0
    const fromToUSD = isCrypto(from) ? (rates[from] || 0) : (1 / (rates[from] || 1))
    const usdToTo = isCrypto(to) ? (1 / (rates[to] || 1)) : (rates[to] || 1)
    const out = amount * fromToUSD * usdToTo
    return isFinite(out) ? out : 0
  }, [amount, from, to, rates])

  const quick = ['USD','EUR','GBP','BTC','ETH','SOL']

  return (
    <section className="container-max gradient">
      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:.6}} className="text-center mb-10">
        <h1 className="hero-title">Currency & Crypto Converter</h1>
        <p className="subtle mt-4 text-lg">Live rates, elegant charts, and a wow-grade interface.</p>
      </motion.div>

      <motion.div initial={{opacity:0, scale:.98}} animate={{opacity:1, scale:1}} transition={{duration:.5}} className="card p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <input className="input md:col-span-1" type="number" value={amount} min={0} onChange={(e)=>setAmount(parseFloat(e.target.value || '0'))} placeholder="Amount" />
          <select className="select" value={from} onChange={(e)=>setFrom(e.target.value)}>
            {allSymbols.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="select" value={to} onChange={(e)=>setTo(e.target.value)}>
            {allSymbols.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="text-center text-2xl md:text-3xl font-semibold my-8">
          {amount} {from} = {result.toLocaleString(undefined, { maximumSignificantDigits: 6 })} {to}
        </div>

        <div className="h-80 w-full card p-4">
          {loading ? (
            <div className="h-full w-full grid place-items-center subtle">Loading chart…</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series}>
                <XAxis dataKey="time" tick={{fill: 'white'}} tickLine={false} axisLine={{stroke: 'rgba(255,255,255,0.15)'}} />
                <YAxis tick={{fill: 'white'}} tickLine={false} axisLine={{stroke: 'rgba(255,255,255,0.15)'}} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid #333', color: '#fff' }} />
                <Line type="monotone" dataKey="value" dot={false} stroke="#ffffff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {quick.map(q => (
            <button key={q} onClick={()=>{ if(isCrypto(q)) setTo(q); else setFrom(q); }} className="pill">{q}</button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
