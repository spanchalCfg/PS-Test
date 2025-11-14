import React, { useEffect, useState } from "react";
import type { Medicine } from "./types";
import { fetchMedicines, createMedicine } from "./api";
import MedicineTable from "./components/MedicineTable";
import AddMedicineForm from "./components/AddMedicineForm";

export default function App() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  async function load(searchTerm = "") {
    setLoading(true);
    try {
      const data = await fetchMedicines(searchTerm);
      setMedicines(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load medicines");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(med: Medicine) {
    await createMedicine(med);
    await load(search);
    alert("Medicine added successfully");
  }

  return (
    <div className="container">
      <h2>ABC Pharmacy - Medicine Inventory</h2>

      <div className="search-row">
        <input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => load(search)}>Search</button>
        <button onClick={() => { setSearch(""); load(); }}>Clear</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <MedicineTable medicines={medicines} />
      )}

      <AddMedicineForm onAdd={handleAdd} />
    </div>
  );
}
