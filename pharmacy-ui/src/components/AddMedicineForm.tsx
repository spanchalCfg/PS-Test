import React, { useState } from "react";
import type { Medicine } from "../types";

interface Props {
  onAdd: (med: Medicine) => Promise<void>;
}

export default function AddMedicineForm({ onAdd }: Props) {
  const [form, setForm] = useState<Medicine>({
    fullName: "",
    notes: "",
    expiryDate: "",
    quantity: 0,
    price: 0,
    brand: "",
  });

  const [saving, setSaving] = useState(false);

  function update<K extends keyof Medicine>(k: K, v: Medicine[K]) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName || !form.expiryDate) {
      alert("Please provide name and expiry date");
      return;
    }
    if (form.quantity < 0 || form.price < 0) {
      alert("Quantity and price should be non-negative");
      return;
    }

    setSaving(true);
    try {
      await onAdd(form);
      setForm({
        fullName: "",
        notes: "",
        expiryDate: "",
        quantity: 0,
        price: 0,
        brand: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add medicine");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="add-form" onSubmit={submit}>
      <h3>Add New Medicine</h3>

      <div className="form-row">
        <label>
          Full Name:
          <input
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            required
          />
        </label>

        <label>
          Brand:
          <input
            value={form.brand}
            onChange={(e) => update("brand", e.target.value)}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Expiry Date:
          <input
            type="date"
            value={form.expiryDate}
            onChange={(e) => update("expiryDate", e.target.value)}
            required
          />
        </label>

        <label>
          Quantity:
          <input
            type="number"
            value={form.quantity}
            onChange={(e) => update("quantity", Number(e.target.value))}
            min={0}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Price:
          <input
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => update("price", Number(e.target.value))}
            min={0}
          />
        </label>

        <label>
          Notes:
          <input
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
        </label>
        </div>

        <div className="form-row">

        <button type="submit" disabled={saving}>
          {saving ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
}
