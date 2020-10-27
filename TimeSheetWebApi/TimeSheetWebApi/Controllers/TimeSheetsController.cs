using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TimeSheetWebApi.Models;
using TimeSheetWebApi.Repository;

namespace TimeSheetWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeSheetsController : ControllerBase
    {
        /* Global Variables*/
        private IRepository<TimeSheet> TimeSheetRepository;

        /* Contructor*/
        public TimeSheetsController(IRepository<TimeSheet> TimeSheetRepository)
        { this.TimeSheetRepository = TimeSheetRepository; }

        /************************************ Start all Curd logic from here **************************************************/

        [HttpGet]
        [Route("")]
        public IEnumerable<TimeSheet> GetAllTimeSheets() => TimeSheetRepository.GetAll();

        [HttpGet]
        [Route("{TimeSheetId}")]
        public TimeSheet GetTimeSheetById(int TimeSheetId) => TimeSheetRepository.GetById(TimeSheetId);

        [HttpPost]
        [Route("")]
        [AllowAnonymous]
        public void AddTimeSheet([FromBody] TimeSheet TimeSheet) => TimeSheetRepository.Insert(TimeSheet);

        [HttpPut]
        [Route("")]
        [AllowAnonymous]
        public void UpdateTimeSheet([FromBody] TimeSheet TimeSheet) => TimeSheetRepository.Update(TimeSheet);

        [HttpDelete]
        [Route("{TimeSheetId}")]
        [AllowAnonymous]
        public void DeleteTimeSheet(int TimeSheetId) => TimeSheetRepository.Delete(TimeSheetId);

        /************************************ End all Curd logic from here **************************************************/
    }
}
