import React from "react";
import type { Medicine } from "../types";

interface Props {
  medicines: Medicine[];
}

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toISOString().split("T")[0];
}

export default function MedicineTable({ medicines }: Props) {
  const now = new Date();

  return (
    <div className="table-wrap">
      <table className="medicine-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Expiry</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Brand</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((m, idx) => {
            const expiry = new Date(m.expiryDate);
            const diffDays = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
            let rowClass = "";
            if (m.quantity < 10) rowClass = "yellow";
            else if (!isNaN(diffDays) && diffDays < 30) rowClass = "red";

            const key = m.id != null ? String(m.id) : `${m.fullName}-${idx}`;

            return (
              <tr key={key} className={rowClass}>
                <td>{m.fullName}</td>
                <td>{formatDate(m.expiryDate)}</td>
                <td>{m.quantity}</td>
                <td>{m.price.toFixed(2)}</td>
                <td>{m.brand}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
