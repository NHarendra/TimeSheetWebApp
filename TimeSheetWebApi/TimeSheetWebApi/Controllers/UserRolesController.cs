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
    public class UserRolesController : ControllerBase
    {
        /* Global Variables*/
        private IRepository<UserRole> UserRoleRepository;

        /* Contructor*/
        public UserRolesController(IRepository<UserRole> UserRoleRepository)
        { this.UserRoleRepository = UserRoleRepository; }

        /************************************ Start all Curd logic from here **************************************************/

        [HttpGet]
        [Route("")]
        public IEnumerable<UserRole> GetAllUserRoles() => UserRoleRepository.GetAll();

        [HttpGet]
        [Route("{UserRoleId}")]
        public UserRole GetUserRoleById(int UserRoleId) => UserRoleRepository.GetById(UserRoleId);

        [HttpPost]
        [Route("")]
        [AllowAnonymous]
        public void AddUserRole([FromBody] UserRole UserRole) => UserRoleRepository.Insert(UserRole);

        [HttpPut]
        [Route("")]
        [AllowAnonymous]
        public void UpdateUserRole([FromBody] UserRole UserRole) => UserRoleRepository.Update(UserRole);

        [HttpDelete]
        [Route("{UserRoleId}")]
        [AllowAnonymous]
        public void DeleteUserRole(int UserRoleId) => UserRoleRepository.Delete(UserRoleId);

        /************************************ End all Curd logic from here **************************************************/
    }
}
