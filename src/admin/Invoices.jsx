import { CheckCircle2, Printer } from 'lucide-react'
import CrudPage from './CrudPage'
import { invoiceConfig } from './configs'
import { useStore } from '../store/Store'

function printInvoice(inv, s) {
  const w = window.open('', '_blank')
  if (!w) return
  w.document.write(`<html><head><title>${inv.number}</title><style>body{font-family:Inter,Arial;padding:48px;color:#111}h1{font-size:40px;margin:0}table{width:100%;border-collapse:collapse;margin-top:32px}td,th{padding:12px;border-bottom:1px solid #ddd;text-align:left}.r{text-align:right}</style></head><body>
  <h1>${s.agencyName}</h1><p>${s.address}<br>${s.email} · ${s.phone}</p><hr>
  <h2>Invoice ${inv.number}</h2><p><b>Billed to:</b> ${inv.client}<br><b>Issued:</b> ${inv.issued}<br><b>Due:</b> ${inv.due}<br><b>Status:</b> ${inv.status}</p>
  <table><tr><th>Description</th><th class="r">Amount</th></tr><tr><td>Professional services</td><td class="r">${s.currency}${Number(inv.amount).toLocaleString()}</td></tr>
  <tr><th>Total</th><th class="r">${s.currency}${Number(inv.amount).toLocaleString()}</th></tr></table>
  <script>window.print()</script></body></html>`)
  w.document.close()
}

export default function Invoices() {
  const { db } = useStore()
  const cur = db.settings.currency
  return (
    <CrudPage
      config={invoiceConfig}
      rowActions={(r, store) => (
        <>
          {r.status !== 'Paid' && <button onClick={() => store.update('invoices', r.id, { status: 'Paid' })} title="Mark paid" className="rounded-lg p-2 text-white/60 hover:bg-lime/10 hover:text-lime"><CheckCircle2 size={15} /></button>}
          <button onClick={() => printInvoice(r, db.settings)} title="Print / PDF" className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"><Printer size={15} /></button>
        </>
      )}
      summary={(rows) => {
        const sum = (st) => rows.filter((r) => !st || r.status === st).reduce((a, r) => a + Number(r.amount || 0), 0)
        const cards = [['Total billed', sum()], ['Paid', sum('Paid')], ['Pending', sum('Pending')], ['Overdue', sum('Overdue')]]
        return (
          <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {cards.map(([l, v]) => <div key={l} className="card"><p className="text-xs uppercase tracking-wider text-white/50">{l}</p><p className="mt-2 text-2xl font-bold">{cur}{v.toLocaleString()}</p></div>)}
          </div>
        )
      }}
    />
  )
}
