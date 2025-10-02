export const fiat = ['USD','EUR','GBP','CHF','JPY','AUD','CAD']
export const crypto = ['BTC','ETH','SOL','DOGE','XRP','ADA','BNB']
export const allSymbols = [...fiat, ...crypto]
export const isCrypto = (s: string) => crypto.includes(s)
