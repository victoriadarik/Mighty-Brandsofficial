import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight, Building2, Lock, ExternalLink } from 'lucide-react';

interface PayFastModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingReference: string;
  amount: number;
  customerName: string;
  serviceTitle: string;
  onPaymentSuccess: (paymentDetails: {
    transactionId: string;
    bankName: string;
    amountPaid: number;
  }) => void;
}

export const PayFastModal: React.FC<PayFastModalProps> = ({
  isOpen,
  onClose,
  bookingReference,
  amount,
  customerName,
  serviceTitle,
  onPaymentSuccess,
}) => {
  const [selectedBank, setSelectedBank] = useState<string>('Capitec Bank');
  const [paymentStep, setPaymentStep] = useState<'select' | 'authorizing' | 'success'>('select');
  const [payFastTxId, setPayFastTxId] = useState<string>('');

  if (!isOpen) return null;

  const banks = [
    { id: 'capitec', name: 'Capitec Bank', color: 'border-blue-300 hover:border-blue-500', popular: true },
    { id: 'fnb', name: 'FNB (First National Bank)', color: 'border-amber-300 hover:border-amber-500', popular: true },
    { id: 'standard', name: 'Standard Bank', color: 'border-blue-300 hover:border-blue-500', popular: true },
    { id: 'nedbank', name: 'Nedbank', color: 'border-emerald-300 hover:border-emerald-500' },
    { id: 'absa', name: 'Absa Bank', color: 'border-rose-300 hover:border-rose-500' },
    { id: 'tymebank', name: 'TymeBank', color: 'border-yellow-300 hover:border-yellow-500' },
    { id: 'discovery', name: 'Discovery Bank', color: 'border-purple-300 hover:border-purple-500' },
    { id: 'investec', name: 'Investec', color: 'border-slate-300 hover:border-slate-500' },
  ];

  const handleSimulatePayment = () => {
    setPaymentStep('authorizing');
    const tx = 'PF-' + Math.floor(10000000 + Math.random() * 90000000);
    setPayFastTxId(tx);

    setTimeout(() => {
      setPaymentStep('success');
      onPaymentSuccess({
        transactionId: tx,
        bankName: selectedBank,
        amountPaid: amount,
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-scaleIn">
        {/* PayFast Official Style Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white font-black flex items-center justify-center text-sm shadow-sm">
              PF
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <span>PayFast Online EFT Gateway</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-slate-300">South Africa</span>
              </div>
              <div className="text-xs text-slate-400">
                Secure Instant Bank Transfer
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {paymentStep === 'select' && (
            <div className="space-y-5">
              {/* Invoice Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-500">
                  <span>Merchant:</span>
                  <span className="font-bold text-slate-900">Mighty Brands SA (Pty) Ltd</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Service:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[220px]">{serviceTitle}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Booking Reference:</span>
                  <span className="font-mono font-bold text-slate-900">{bookingReference}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-900">Total Amount:</span>
                  <span className="text-xl font-extrabold text-emerald-700 font-mono">
                    R{amount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Bank Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select your South African Bank for Instant EFT:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {banks.map((bank) => (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => setSelectedBank(bank.name)}
                      className={`p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                        selectedBank === bank.name
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm font-bold'
                          : `bg-white text-slate-700 border-slate-200 hover:bg-slate-50 ${bank.color}`
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="truncate">{bank.name}</span>
                        {bank.popular && (
                          <span
                            className={`text-[9px] px-1 rounded uppercase font-bold tracking-wider ${
                              selectedBank === bank.name ? 'bg-slate-800 text-emerald-300' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            Popular
                          </span>
                        )}
                      </div>
                      <div className={`text-[10px] mt-1 ${selectedBank === bank.name ? 'text-slate-300' : 'text-slate-400'}`}>
                        Instant EFT supported
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Security info */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl flex items-center gap-2 text-xs text-emerald-900">
                <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>256-bit Bank Grade Security. Verified and cleared in seconds with zero delay.</span>
              </div>

              {/* Pay Button */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Pay Later
                </button>
                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <span>Pay R{amount.toLocaleString()} via PayFast EFT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {paymentStep === 'authorizing' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
              <h4 className="text-base font-bold text-slate-900">
                Connecting to {selectedBank}...
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Authorizing secure Instant EFT via PayFast payment gateway. Please do not close this window.
              </p>
            </div>
          )}

          {paymentStep === 'success' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Payment Verified
                </span>
                <h4 className="text-2xl font-black text-slate-900 mt-1">
                  EFT Successful!
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Thank you, {customerName}. Your PayFast Instant EFT payment has been received and verified.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2 text-xs max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">PayFast Tx ID:</span>
                  <span className="font-mono font-bold text-slate-900">{payFastTxId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Bank:</span>
                  <span className="font-semibold text-slate-900">{selectedBank}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-bold text-emerald-700">R{amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold text-emerald-700">Instant Clearing Verified</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Return to Mighty Brands
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
