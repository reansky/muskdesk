export function TokenBalances() {
  return <section className="terminal-card p-5"><div className="flex items-center justify-between"><h2 className="text-sm font-semibold text-white">Token holdings</h2><span className="text-[10px] text-[var(--muted)]">Indexer-ready</span></div><p className="mt-4 text-xs leading-5 text-[var(--muted)]">Token balances appear when a configured chain indexer is available. Native ETH balance is read through the RPC adapter.</p></section>
}
