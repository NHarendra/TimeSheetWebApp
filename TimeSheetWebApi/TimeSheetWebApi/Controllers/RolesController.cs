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
    public class RolesController : ControllerBase
    {
        /* Global Variables*/
        private IRepository<Role> RoleRepository;

        /* Contructor*/
        public RolesController(IRepository<Role> RoleRepository)
        { this.RoleRepository = RoleRepository; }

        /************************************ Start all Curd logic from here **************************************************/

        [HttpGet]
        [Route("")]
        public IEnumerable<Role> GetAllRoles() => RoleRepository.GetAll();

        [HttpGet]
        [Route("{RoleId}")]
        public Role GetRoleById(int RoleId) => RoleRepository.GetById(RoleId);

        [HttpPost]
        [Route("")]
        [AllowAnonymous]
        public void AddRole([FromBody] Role Role) => RoleRepository.Insert(Role);

        [HttpPut]
        [Route("")]
        [AllowAnonymous]
        public void UpdateRole([FromBody] Role Role) => RoleRepository.Update(Role);

        [HttpDelete]
        [Route("{RoleId}")]
        [AllowAnonymous]
        public void DeleteRole(int RoleId) => RoleRepository.Delete(RoleId);

        /************************************ End all Curd logic from here **************************************************/
    }
}
