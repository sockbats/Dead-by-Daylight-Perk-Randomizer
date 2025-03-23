using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Dead_by_Daylight_Perk_Randomizer.Controllers.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Dead_by_Daylight_Perk_Randomizer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurvivorPerkController : ControllerBase {
        private const string FilePath = "Web Scraper/Data Output/survivor_perk_list.json";

        private static async Task<List<SurvivorPerk>> GetSurvivorPerksFromFileAsync() {
            if (!System.IO.File.Exists(FilePath)) {
                return new List<SurvivorPerk>();
            }
            string existingJson = await System.IO.File.ReadAllTextAsync(FilePath, Encoding.UTF8);
            return JsonSerializer.Deserialize<List<SurvivorPerk>>(existingJson) ?? new List<SurvivorPerk>();
        }
        
        // GET: api/SurvivorPerk
        [HttpGet]
        public async Task<List<SurvivorPerk>> GetAllPerks() {
            var survivorPerks = await GetSurvivorPerksFromFileAsync();
            survivorPerks.ForEach(Console.WriteLine);
            return survivorPerks;
        }

        // GET: api/SurvivorPerk/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<SurvivorPerk> GetById(int id) {
            var survivorPerks = await GetSurvivorPerksFromFileAsync();
            return (from perk in survivorPerks where perk.perk_id == id select perk).SingleOrDefault() ?? new SurvivorPerk();
        }

        // POST: api/SurvivorPerk
        [HttpPost]
        public void Post([FromBody] string value) {
        }

        // PUT: api/SurvivorPerk/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value) {
        }

        // DELETE: api/SurvivorPerk/5
        [HttpDelete("{id}")]
        public void Delete(int id) {
        }
    }
}
