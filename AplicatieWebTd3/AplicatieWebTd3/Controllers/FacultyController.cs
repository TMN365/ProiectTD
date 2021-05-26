using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using AplicatieWebTd3.Models;

namespace AplicatieWebTd3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacultyController : ControllerBase
    {
        //acces the configuration from the app settings file
        private readonly IConfiguration configuration;
        public FacultyController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT FacultyId, FacultyName FROM [UniversityDB].[dbo].[FacultyTable]";
            DataTable table = new DataTable();
            string sqlDataSource = configuration.GetConnectionString("UniversityAppCon");
            SqlDataReader sqlReader;
            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand command = new SqlCommand(query, myCon))
                {
                    sqlReader = command.ExecuteReader();
                    table.Load(sqlReader);
                    sqlReader.Close();
                }
                myCon.Close();
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Faculty faculty)
        {
            string query = @"INSERT INTO [UniversityDB].[dbo].[FacultyTable] values('"+faculty.FacultyName+@"')";
            DataTable table = new DataTable();
            string sqlDataSource = configuration.GetConnectionString("UniversityAppCon");
            SqlDataReader sqlReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand command = new SqlCommand(query, myCon))
                {
                    sqlReader = command.ExecuteReader();
                    table.Load(sqlReader);
                    sqlReader.Close();
                }
                myCon.Close();
            }
            return new JsonResult("Added succesfully");
        }


        [HttpPut]
        public JsonResult Put(Faculty faculty)
        {
            string query = @"UPDATE  [UniversityDB].[dbo].[FacultyTable] set FacultyName ='" + faculty.FacultyName + @"'
                            WHERE FacultyId = '" + faculty.FacultyId + @"'";

            DataTable table = new DataTable();
            string sqlDataSource = configuration.GetConnectionString("UniversityAppCon");
            SqlDataReader sqlReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand command = new SqlCommand(query, myCon))
                {
                    sqlReader = command.ExecuteReader();
                    table.Load(sqlReader);
                    sqlReader.Close();
                }
                myCon.Close();
            }
            return new JsonResult("Updated succesfully");
        }
        

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"DELETE FROM  [UniversityDB].[dbo].[FacultyTable] WHERE FacultyId='" + id + @"'";

            DataTable table = new DataTable();
            string sqlDataSource = configuration.GetConnectionString("UniversityAppCon");
            SqlDataReader sqlReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand command = new SqlCommand(query, myCon))
                {
                    sqlReader = command.ExecuteReader();
                    table.Load(sqlReader);
                    sqlReader.Close();
                }
                myCon.Close();
            }
            return new JsonResult("Deleted succesfully");
        }

        
    }
}
