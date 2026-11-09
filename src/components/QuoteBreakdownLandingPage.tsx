import React, { useState } from 'react';
import {
  Download,
  Printer,
  CreditCard,
  CheckCircle2,
  Share2,
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
  FileText,
  Copy,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { DivisionLogoRenderer } from './BrandLogos';
import { PayFastModal } from './PayFastModal';

export interface QuoteRecord {
  id: string;
  quoteNumber: string;
  createdAt: string;
  validUntil: string;
  // Customer info
  fullName: string;
  email: string;
  phone: string;
  // Physical Address details
  houseNumber: string;
  streetName: string;
  suburb: string;
  zipCode: string;
  propertyType: string;
  fullAddress: string;
  // Schedule
  preferredDate: string;
  timeSlot: string;
  // Divisions & Items
  divisionIds: string[];
  divisionNames: string[];
  lineItems: {
    divisionId: string;
    divisionName: string;
    title: string;
    description: string;
    unitPriceZAR: number;
    quantity: number;
    totalZAR: number;
  }[];
  specialInclusions: string[];
  notes: string;
  // Financial breakdown
  subtotalZAR: number;
  discountPercent: number;
  discountZAR: number;
  vatZAR: number;
  totalZAR: number;
  // Status
  status: 'Quote Generated' | 'Approved & Dispatched' | 'Paid via PayFast Instant EFT';
  payFastTxId?: string;
  bankUsed?: string;
}

interface QuoteBreakdownLandingPageProps {
  quote: QuoteRecord;
  onBackToApp: () => void;
  onQuoteUpdated: (updated: QuoteRecord) => void;
}

export const QuoteBreakdownLandingPage: React.FC<QuoteBreakdownLandingPageProps> = ({
  quote,
  onBackToApp,
  onQuoteUpdated,
}) => {
  const [isPayFastOpen, setIsPayFastOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleDownloadFile = () => {
    const textContent = `=====================================================
MIGHTY BRANDS SOUTH AFRICA - ESTIMATED SERVICE QUOTE
Reference: ${quote.quoteNumber}
Date: ${quote.createdAt} (Valid for 30 Days until ${quote.validUntil})
Direct Office Line: 087 8222 984 | WhatsApp: 066 322 7557
Email: info@mightybrands.co.za | Head of Operations: victoria@mightybrands.co.za
Website: www.mightymaids.co.za / www.mightybrands.co.za
=====================================================

IMPORTANT ESTIMATE NOTICE:
All cost breakdowns and pricing figures shown are an estimated quote. 
The final quote could be a bit less or more than the estimated amount 
depending on property condition and confirmed requirements. 
The Mighty Brands office reviews all details and sends the final confirmed quote.

CLIENT DETAILS:
Name: ${quote.fullName}
Phone: ${quote.phone}
Email: ${quote.email}

PHYSICAL SERVICE ADDRESS:
Property Type: ${quote.propertyType}
House / Unit: ${quote.houseNumber}
Street: ${quote.streetName}
Suburb: ${quote.suburb}
Postal Code: ${quote.zipCode}
Full Address: ${quote.fullAddress}

SCHEDULED WINDOW:
Preferred Date: ${quote.preferredDate}
Time Window: ${quote.timeSlot}

DIVISIONS REQUESTED:
${quote.divisionNames.join(', ')}

ITEMIZED ESTIMATED BREAKDOWN:
-----------------------------------------------------
${quote.lineItems
  .map(
    (item, idx) =>
      `${idx + 1}. [${item.divisionName}] ${item.title}\n   Scope: ${item.description}\n   Qty: ${item.quantity} | Rate: R${item.unitPriceZAR.toLocaleString()} | Total: R${item.totalZAR.toLocaleString()}`
  )
  .join('\n\n')}

SPECIAL INCLUSIONS & NOTES:
${quote.specialInclusions.length > 0 ? quote.specialInclusions.map((s) => `• ${s}`).join('\n') : 'Standard service protocol.'}
${quote.notes ? `\nClient Notes: ${quote.notes}` : ''}

FINANCIAL TOTALS (ZAR):
-----------------------------------------------------
Subtotal: R${quote.subtotalZAR.toLocaleString()}
Multi-Division Discount (${quote.discountPercent}%): -R${quote.discountZAR.toLocaleString()}
South African VAT (15%): R${quote.vatZAR.toLocaleString()}
ESTIMATED TOTAL AMOUNT: R${quote.totalZAR.toLocaleString()}
(The office reviews and confirms final quote amount)

PAYMENT TERMS:
Instant Online EFT supported via PayFast (Capitec, FNB, Standard Bank, Nedbank, Absa, TymeBank, Discovery, Investec).
Account: Mighty Brands SA (Pty) Ltd.
Status: ${quote.status} ${quote.payFastTxId ? `(Tx: ${quote.payFastTxId} via ${quote.bankUsed})` : ''}

The Mighty Standard: 7-Tier Background Checks, Mighty Academy Certified & 100% Satisfaction Guarantee.
Office line: 087 8222 984 · info@mightybrands.co.za · victoria@mightybrands.co.za
=====================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Mighty-Brands-Quote-${quote.quoteNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summary = `Mighty Brands Estimate Quote ${quote.quoteNumber} for ${quote.fullName}: R${quote.totalZAR.toLocaleString()} (${quote.divisionNames.join(' + ')}). All cost breakdowns are an estimate quote (office sends final quote). Direct Office: 087 8222 984 · info@mightybrands.co.za`;
    navigator.clipboard.writeText(summary);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePaymentSuccess = (paymentDetails: {
    transactionId: string;
    bankName: string;
    amountPaid: number;
  }) => {
    const updated: QuoteRecord = {
      ...quote,
      status: 'Paid via PayFast Instant EFT',
      payFastTxId: paymentDetails.transactionId,
      bankUsed: paymentDetails.bankName,
    };
    onQuoteUpdated(updated);
    setIsPayFastOpen(false);

    // Also update localStorage
    try {
      const stored = localStorage.getItem('mighty_quotes');
      if (stored) {
        const list: QuoteRecord[] = JSON.parse(stored);
        const idx = list.findIndex((q) => q.id === quote.id);
        if (idx !== -1) {
          list[idx] = updated;
          localStorage.setItem('mighty_quotes', JSON.stringify(list));
        }
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8 text-slate-900 print:bg-white print:p-0 animate-fadeIn">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Navigation Bar (Hidden during print) */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-xs border border-slate-200 print:hidden">
          <button
            onClick={onBackToApp}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-950 transition-colors px-3 py-2 rounded-xl hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Mighty Brands</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{copiedLink ? 'Copied to Clipboard!' : 'Share Quote'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={handleDownloadFile}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-xl shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Quote (.TXT)</span>
            </button>
          </div>
        </div>

        {/* Printable Official Quote Document */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden print:shadow-none print:border-none print:rounded-none">
          {/* Header Banner */}
          <div className="bg-slate-900 text-white p-8 sm:p-10 border-b border-slate-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                    Mighty Brands SA (Pty) Ltd · Official Quote Breakdown
                  </span>
                </div>
                <h1 className="text-3xl font-black tracking-tight text-white">
                  Mighty Brands Service Quote
                </h1>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  Unified umbrella of Mighty Maids, Mighty Nannies, Mighty Movers, Mighty Plumbing, Mighty Gardeners & Mighty Handyman.
                </p>

                {/* Estimate Notice Banner */}
                <div className="mt-3 p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs flex items-start gap-2.5 max-w-2xl">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Estimate Quote Notice:</strong> All cost breakdowns and pricing figures are an estimated quote. 
                    The final quote could be a bit less or more than the estimated amount depending on confirmed on-site requirements. 
                    The Mighty Brands office reviews your booking and sends the final confirmed quote.
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-left sm:text-right">
                <div
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                    quote.status === 'Paid via PayFast Instant EFT'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-amber-400 text-slate-950'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{quote.status}</span>
                </div>
                <div className="text-xs font-mono font-bold text-slate-300 mt-2">
                  Quote #{quote.quoteNumber}
                </div>
                <div className="text-[11px] text-slate-400">
                  Issued: {quote.createdAt} · Valid 30 days
                </div>
              </div>
            </div>

            {/* Division Logos Involved */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-2">
                Divisions Included:
              </span>
              {quote.divisionIds.map((divId) => (
                <div
                  key={divId}
                  className="bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-xl flex items-center gap-2"
                >
                  <DivisionLogoRenderer divisionId={divId} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section: Client & Physical Address Grid */}
          <div className="p-8 sm:p-10 border-b border-slate-200 bg-slate-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
              {/* Client Info */}
              <div className="space-y-3">
                <div className="font-extrabold uppercase tracking-wider text-slate-400 text-[10px]">
                  Client Information
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="text-sm font-black text-slate-900">{quote.fullName}</div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{quote.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{quote.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 pt-1 border-t border-slate-100">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Scheduled for: <strong className="text-slate-900">{quote.preferredDate}</strong> ({quote.timeSlot})</span>
                  </div>
                </div>
              </div>

              {/* Physical Address Info */}
              <div className="space-y-3">
                <div className="font-extrabold uppercase tracking-wider text-slate-400 text-[10px]">
                  Physical Service Address & Property Type
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" />
                    <span className="font-bold text-slate-900">Property: {quote.propertyType}</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">
                        {quote.houseNumber} {quote.streetName}
                      </div>
                      <div className="text-slate-600 font-medium">
                        Suburb: <strong>{quote.suburb}</strong> · Postal Code: <strong>{quote.zipCode}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                    Full Reference: {quote.fullAddress}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="p-8 sm:p-10 space-y-6">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider">
                Itemized Scope & Service Breakdown
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                All rates in South African Rand (ZAR) based on residential requirements.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-600 font-bold border-b border-slate-200">
                    <th className="py-3.5 px-4">Service & Inclusions</th>
                    <th className="py-3.5 px-4 hidden sm:table-cell">Division</th>
                    <th className="py-3.5 px-3 text-center">Qty / Cadence</th>
                    <th className="py-3.5 px-4 text-right">Unit Rate (ZAR)</th>
                    <th className="py-3.5 px-4 text-right">Total (ZAR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {quote.lineItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 align-top">
                        <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                        <div className="text-slate-500 text-xs mt-1 leading-relaxed max-w-md">
                          {item.description}
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top hidden sm:table-cell">
                        <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md text-[11px]">
                          {item.divisionName}
                        </span>
                      </td>
                      <td className="py-4 px-3 align-top text-center font-semibold text-slate-700">
                        {item.quantity}
                      </td>
                      <td className="py-4 px-4 align-top text-right font-mono text-slate-700">
                        R{item.unitPriceZAR.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 align-top text-right font-mono font-bold text-slate-900 text-sm">
                        R{item.totalZAR.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Special Requests & Inclusions List */}
            {quote.specialInclusions.length > 0 && (
              <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl text-xs space-y-2">
                <div className="font-extrabold text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Special Scope Requirements & Operating Rules:</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                  {quote.specialInclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Notes if any */}
            {quote.notes && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1">
                <span className="font-bold text-slate-700">Client Instructions & Notes:</span>
                <p className="text-slate-600 italic">{quote.notes}</p>
              </div>
            )}

            {/* Financial Summary Box */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-4 border-t border-slate-200">
              <div className="space-y-2 max-w-sm text-xs text-slate-500">
                <div className="font-bold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>The Mighty Brands Standard</span>
                </div>
                <p>
                  Includes dedicated concierge coordinator, 7-tier verified background screening, Mighty Academy certified personnel, and PayFast Instant EFT security.
                </p>
                <div className="text-[11px] font-semibold text-slate-700 pt-1 space-y-0.5">
                  <div>Office Line: <strong>087 8222 984</strong> · WhatsApp: <strong>066 322 7557</strong></div>
                  <div>info@mightybrands.co.za · victoria@mightybrands.co.za</div>
                </div>
              </div>

              {/* Price Calculation Card */}
              <div className="w-full sm:w-85 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-mono font-semibold text-slate-900">
                    R{quote.subtotalZAR.toLocaleString()}
                  </span>
                </div>

                {quote.discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Multi-Service Discount ({quote.discountPercent}%):</span>
                    <span className="font-mono font-bold">
                      -R{quote.discountZAR.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>South African VAT (15%):</span>
                  <span className="font-mono font-semibold text-slate-900">
                    R{quote.vatZAR.toLocaleString()}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-300 flex justify-between items-center text-sm">
                  <div>
                    <span className="font-black text-slate-900 block leading-tight">Estimated Total:</span>
                    <span className="text-[10px] text-slate-500 font-normal">Subject to office confirmation</span>
                  </div>
                  <span className="text-xl font-black text-slate-950 font-mono">
                    R{quote.totalZAR.toLocaleString()}
                  </span>
                </div>

                {/* Estimate quote disclaimer */}
                <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 leading-tight">
                  <span className="font-bold">Estimate Notice:</span> All cost breakdowns are an estimated quote and could be a bit less or more than estimated. Our office reviews all requirements and sends your final confirmed quote.
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer (Hidden during print) */}
          <div className="bg-slate-900 p-6 sm:p-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <div className="text-white text-xs">
              <div className="font-bold flex items-center gap-2">
                <span>Secure South African Instant EFT</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-semibold text-[10px]">
                  PayFast Gateway
                </span>
              </div>
              <div className="text-slate-400 mt-0.5">
                Capitec, FNB, Standard Bank, Nedbank, Absa, TymeBank, Discovery & Investec.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleDownloadFile}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download Quote</span>
              </button>

              {quote.status !== 'Paid via PayFast Instant EFT' ? (
                <button
                  onClick={() => setIsPayFastOpen(true)}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay R{quote.totalZAR.toLocaleString()} via PayFast EFT</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-xl font-bold text-xs border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Paid · Ref {quote.payFastTxId}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PayFast Modal */}
      <PayFastModal
        isOpen={isPayFastOpen}
        onClose={() => setIsPayFastOpen(false)}
        bookingReference={quote.quoteNumber}
        amount={quote.totalZAR}
        customerName={quote.fullName}
        serviceTitle={quote.divisionNames.join(' + ') + ' Service'}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};
