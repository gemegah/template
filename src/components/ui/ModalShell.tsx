"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type ModalShellProps = {
  title: string;
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
};

export function ModalShell({ title, open, onClose, children }: ModalShellProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.();
    };

    const handleTabTrap = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTabTrap);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTabTrap);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open && previousFocusRef.current) previousFocusRef.current.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="proposal-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7f3453]"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 id="proposal-modal-title" className="text-lg font-semibold text-[#2f2030]">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#d7c0cc] px-3 text-sm font-medium text-[#4a2a3a] transition-colors hover:bg-[#f9edf3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f3453]"
            aria-label="Close proposal dialog"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
