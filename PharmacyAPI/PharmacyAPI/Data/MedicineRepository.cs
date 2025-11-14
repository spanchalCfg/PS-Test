using PharmacyAPI.Models;
using System.Text.Json;

namespace PharmacyAPI.Data
{
    public class MedicineRepository
    {
        private readonly string _filePath = "medicines.json";

        public List<Medicine> GetAll()
        {
            if (!File.Exists(_filePath)) return new List<Medicine>();
            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<Medicine>>(json) ?? new List<Medicine>();
        }

        public void SaveAll(List<Medicine> medicines)
        {
            var json = JsonSerializer.Serialize(medicines, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_filePath, json);
        }

        public void Add(Medicine medicine)
        {
            var list = GetAll();
            list.Add(medicine);
            SaveAll(list);
        }

        public List<Medicine> Search(string name)
        {
            var list = GetAll();
            return list
                .Where(m => m.FullName.ToLower().Contains(name.ToLower()))
                .ToList();
        }
    }
}
