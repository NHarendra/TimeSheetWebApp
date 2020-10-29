using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using TimeSheetWebApi.GlobalException;
using TimeSheetWebApi.Models;
using TimeSheetWebApi.Repository;

namespace TimeSheetWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        /* Global Variables*/
        private IRepository<User> UserRepository;
        private IConfiguration config;

        /* Contructor*/
        public UsersController(IRepository<User> UserRepository, IConfiguration config)
        {
            this.UserRepository = UserRepository;
            this.config = config;
        }

        /************************************ Start all Curd logic from here **************************************************/

        [HttpGet]
        [Route("")]
        public IEnumerable<User> GetAllUsers() {
            IEnumerable<User> returnObj = null;
            try
            {
                returnObj = UserRepository.GetAll().Where(w => w.FullName != null && w.Email != null && w.Designation != null).OrderByDescending(e => e.Id);
            }
            catch(Exception ex)
            {
                 throw new MyAppException(ex.Message);
            }
            return returnObj;
         }


        [HttpGet]
        [Route("{UserId}")]
        public User GetUserById(int UserId)
        {
            User returnObj = null;
            try
            {
                returnObj = UserRepository.GetById(UserId);
            }
            catch (Exception ex)
            {
                throw new MyAppException(ex.Message);
            }
            return returnObj;
        }

        [HttpPost]
        [Route("")]
        [AllowAnonymous]
        public void AddUser([FromBody] User User)
        {
            try
            {
                UserRepository.Insert(User);
            }
            catch (Exception ex)
            {
                throw new MyAppException(ex.Message);
            }
        }

        [HttpPut]
        [Route("")]
        [AllowAnonymous]
        public void UpdateUser([FromBody] User User)
        {
            try
            {
                UserRepository.Update(User);
            }
            catch (Exception ex)
            {
                throw new MyAppException(ex.Message);
            }
        }

        [HttpDelete]
        [Route("{UserId}")]
        [AllowAnonymous]
        public void DeleteUser(int UserId)
        {
            try
            {
                UserRepository.Delete(UserId);
            }
            catch (Exception ex)
            {
                throw new MyAppException(ex.Message);
            }
        }

        /************************************ End all Curd logic from here **************************************************/

        [AllowAnonymous]
        [HttpPost]
        [Route("GetUserLookup")]
        public List<LookupDto> GetUserLookup()
        {
            LookupDto retObj = new LookupDto();
            List<LookupDto> retObjList = new List<LookupDto>();
            try
            {
                retObjList = UserRepository.GetAll().Where(w => w.IsActive == true).Select(s => new LookupDto { label = s.FullName, value = s.Id }).ToList();
            }
            catch (Exception ex)
            {
                throw new MyAppException(ex.Message);
            }
            return retObjList;
        }

    }
}
