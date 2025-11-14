using Microsoft.AspNetCore.Mvc;
using PharmacyAPI.Data;
using PharmacyAPI.Models;

namespace PharmacyAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicineController : ControllerBase
    {
        private readonly MedicineRepository _repo = new MedicineRepository();

        [HttpGet]
        public ActionResult<IEnumerable<Medicine>> GetAll([FromQuery] string? search)
        {
            if (!string.IsNullOrEmpty(search))
                return Ok(_repo.Search(search));
            return Ok(_repo.GetAll());
        }

        [HttpPost]
        public ActionResult AddMedicine([FromBody] Medicine medicine)
        {
            _repo.Add(medicine);
            return Ok(new { message = "Medicine added successfully" });
        }
    }
}
