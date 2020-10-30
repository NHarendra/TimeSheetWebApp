using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeSheetWebApi.DataBaseCtxt;
using TimeSheetWebApi.GlobalException;
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
        protected readonly DatabaseContext db;

        /* Contructor*/
        public TimeSheetsController(IRepository<TimeSheet> TimeSheetRepository, DatabaseContext context)
        { this.TimeSheetRepository = TimeSheetRepository; this.db = context; }

        /************************************ Start all Curd logic from here **************************************************/

        [HttpGet]
        [Route("")]
        public IEnumerable<TimeSheet> GetAllTimeSheets()
        {
            IEnumerable<TimeSheet> returnObj = null;
            try
            {
               returnObj = TimeSheetRepository.GetAll().Include("UserFk").OrderByDescending(w => w.Id);
            }
            catch (Exception ex)
            {
                throw new MyAppException(ex.Message);
            }
            return returnObj;
           

        }

        [HttpGet]
        [Route("{TimeSheetId}")]
        public TimeSheet GetTimeSheetById(int TimeSheetId) => TimeSheetRepository.GetById(TimeSheetId);

        [HttpPost]
        [Route("")]
        [AllowAnonymous]
        // public void AddTimeSheet([FromBody] TimeSheet TimeSheet) => TimeSheetRepository.Insert(TimeSheet);
        public void AddTimeSheet([FromBody] TimeSheet TimeSheet)
        {
            try
            {
                TimeSheet.StartDateTime = Convert.ToDateTime(TimeSheet.StartDateTime).AddHours(5).AddMinutes(30);
                TimeSheetRepository.Insert(TimeSheet);
            }
            catch (Exception ex)
            {
                throw new MyAppException(ex.Message);
            }
        }

        [HttpPut]
        [Route("")]
        [AllowAnonymous]
        public void UpdateTimeSheet([FromBody] TimeSheet TimeSheet)
        {
            try
            {
                TimeSheetRepository.Update(TimeSheet);
            }
            catch (Exception ex)
            {
                throw new MyAppException(ex.Message);
            }
        }

        [HttpDelete]
        [Route("{TimeSheetId}")]
        [AllowAnonymous]
        public void DeleteTimeSheet(int TimeSheetId)
        {
            try
            {
                TimeSheetRepository.Delete(TimeSheetId);
            }
            catch (Exception ex)
            {
                throw new MyAppException(ex.Message);
            }
        }

        /************************************ End all Curd logic from here **************************************************/


    }
}
