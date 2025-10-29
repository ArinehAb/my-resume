import React, { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { CoffeeRose } from "../theme";

type PrivateContact = {
  id: string;
  access_code: string | null;
  phone: string | null;
  email: string | null;
  linkedin_url: string | null;
  location: string | null;
  created_at: string | null;
  updated_at: string | null;
};

type ContactPanelProps = {
  open: boolean;
  onClose: () => void;
  inline?: boolean;       // NEW
  hideBackdrop?: boolean; // NEW
};

const ContactPanel: React.FC<ContactPanelProps> = ({
  open,
  onClose,
  inline = false,
  hideBackdrop = false,
}) => {
  const [pin, setPin] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState<PrivateContact | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckPin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("private_contact")
        .select("*")
        .eq("access_code", pin.trim())
        .single();

      if (error || !data) {
        console.error(error);
        setError("Invalid PIN.");
        return;
      }

      setContact(data as PrivateContact);
      setVerified(true);
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  // panel styles depend on inline vs modal
  const panelClasses = inline
    ? // inline dropdown version
      "rounded-xl p-5 shadow-xl flex flex-col w-[20rem] max-w-full"
    : // floating modal version
      "fixed right-4 bottom-4 z-50 w-[90%] max-w-md rounded-xl p-5 shadow-xl flex flex-col";

  const panelStyle = inline
    ? {
        backgroundColor: CoffeeRose.cream,
        border: `1px solid ${CoffeeRose.rosewd}`,
        boxShadow: "0 20px 48px rgba(0,0,0,0.15)",
      }
    : {
        backgroundColor: CoffeeRose.cream,
        border: `1px solid ${CoffeeRose.rosewd}`,
        boxShadow: "0 20px 48px rgba(0,0,0,0.15)",
      };

  return (
    <>
      {/* Backdrop only for full modal usage */}
      {!inline && !hideBackdrop && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      {/* Panel box */}
      <div
        className={inline ? panelClasses : panelClasses + " z-50"}
        style={panelStyle}
      >
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <h2
            className="text-lg font-semibold"
            style={{ color: CoffeeRose.mocha }}
          >
            Contact
          </h2>

          {/* Close button only makes sense in modal mode */}
          {!inline && (
            <button
              onClick={onClose}
              className="text-sm px-2 py-1 rounded border"
              style={{
                backgroundColor: "#fff",
                color: CoffeeRose.mocha,
                borderColor: CoffeeRose.rosewd,
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Locked view */}
        {!verified && (
          <form onSubmit={handleCheckPin} className="flex flex-col gap-3">
            <label
              className="text-sm font-medium"
              style={{ color: CoffeeRose.mocha }}
            >
              Enter Access Code
            </label>

            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm outline-none"
              style={{
                borderColor: CoffeeRose.rosewd,
                backgroundColor: "#fff",
                color: CoffeeRose.mocha,
              }}
              placeholder="••••"
            />

            {error && (
              <p className="text-xs" style={{ color: "#a11" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="text-sm font-medium rounded-md px-3 py-2 border self-start"
              style={{
                color: CoffeeRose.mocha,
                backgroundColor: CoffeeRose.blush,
                border: `1px solid ${CoffeeRose.rosewd}`,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Checking..." : "Unlock"}
            </button>
          </form>
        )}

        {/* After unlock */}
        {verified && contact && (
          <div className="space-y-3 mt-2 text-sm">
            <div>
              <span
                className="block text-xs font-semibold uppercase tracking-wide"
                style={{ color: CoffeeRose.mocha }}
              >
                Phone
              </span>
              <span style={{ color: CoffeeRose.cocoa }}>
                {contact.phone || "—"}
              </span>
            </div>

            <div>
              <span
                className="block text-xs font-semibold uppercase tracking-wide"
                style={{ color: CoffeeRose.mocha }}
              >
                Email
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="underline break-all"
                style={{ color: CoffeeRose.dusty }}
              >
                {contact.email}
              </a>
            </div>

            <div>
              <span
                className="block text-xs font-semibold uppercase tracking-wide"
                style={{ color: CoffeeRose.mocha }}
              >
                LinkedIn
              </span>
              <a
                href={contact.linkedin_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="underline break-all"
                style={{ color: CoffeeRose.dusty }}
              >
                {contact.linkedin_url}
              </a>
            </div>

            <div>
              <span
                className="block text-xs font-semibold uppercase tracking-wide"
                style={{ color: CoffeeRose.mocha }}
              >
                Location
              </span>
              <span style={{ color: CoffeeRose.cocoa }}>
                {contact.location || "—"}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactPanel;
