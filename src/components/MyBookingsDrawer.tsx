import React from 'react';
import { BookingRecord } from './BookingModal';
import { X, Calendar, Clock, MapPin, Trash2, ShieldCheck, ArrowRight, FileText, Download } from 'lucide-react';

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  onCancelBooking: (id: string) => void;
  onOpenNewBooking: () => void;
  onOpenQuoteByReference: (refCode: string) => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onOpenNewBooking,
  onOpenQuoteByReference,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-slideInRight">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Account Overview
            </div>
            <h3 className="text-lg font-extrabold text-white">
              My Service Bookings & Quotes ({bookings.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">No active bookings yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Schedule an appointment or generate an itemized quote with any Mighty division to track dispatch & download documents here.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenNewBooking();
                }}
                className="mt-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
              >
                Schedule & Generate First Quote
              </button>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white transition-all space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                  <span className="font-mono text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-600" />
                    <span>{b.referenceCode}</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {b.status}
                  </span>
                </div>

                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {b.divisionNames.join(' + ')}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Client: {b.fullName} · Total: <strong className="text-slate-900">R{b.amountZAR?.toLocaleString() || 'Quote Pending'}</strong>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{b.date} · {b.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{b.address}</span>
                  </div>
                </div>

                {/* Button to open the dedicated Quote Landing Page */}
                <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenQuoteByReference(b.referenceCode);
                    }}
                    className="font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 text-[11px]"
                  >
                    <Download className="w-3 h-3" />
                    <span>View Breakdown & Download</span>
                  </button>

                  <button
                    onClick={() => onCancelBooking(b.id)}
                    className="text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1 text-[11px]"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Quotes automatically saved & backed by 7-tier vetting</span>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenNewBooking();
            }}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
          >
            <span>Book / Quote Another Service</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
