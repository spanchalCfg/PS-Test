import type { Medicine } from "./types";

const BASE_URL = "https://localhost:7006/api/medicine";

export async function fetchMedicines(search = ""): Promise<Medicine[]> {
  const q = search ? `?search=${encodeURIComponent(search)}` : "";
  const res = await fetch(`${BASE_URL}${q}`);
  if (!res.ok) throw new Error("Failed to fetch medicines");
  return res.json();
}

export async function createMedicine(med: Medicine): Promise<Medicine> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(med),
  });
  if (!res.ok) throw new Error("Failed to add medicine");
  return res.json();
}
