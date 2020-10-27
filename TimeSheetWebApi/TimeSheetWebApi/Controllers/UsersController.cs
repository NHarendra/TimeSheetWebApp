using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
        public IEnumerable<User> GetAllUsers() => UserRepository.GetAll();

        [HttpGet]
        [Route("{UserId}")]
        public User GetUserById(int UserId) => UserRepository.GetById(UserId);

        [HttpPost]
        [Route("")]
        [AllowAnonymous]
        public void AddUser([FromBody] User User) => UserRepository.Insert(User);

        [HttpPut]
        [Route("")]
        [AllowAnonymous]
        public void UpdateUser([FromBody] User User) => UserRepository.Update(User);

        [HttpDelete]
        [Route("{UserId}")]
        [AllowAnonymous]
        public void DeleteUser(int UserId) => UserRepository.Delete(UserId);

        /************************************ End all Curd logic from here **************************************************/
    }
}
