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
using System.IO;
using Microsoft.AspNetCore.Hosting;


namespace AplicatieWebTd3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        //acces the configuration from the app settings file
        private readonly IConfiguration configuration;
        private readonly IWebHostEnvironment environment;
        public StudentController(IConfiguration configuration, IWebHostEnvironment environment)
        {
            this.configuration = configuration;
            this.environment = environment;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT StudentId, StudentName, FacultyName, 
                            convert(varchar(10), DateOfMatriculation, 120) as DateOfMatriculation, 
                            PhotoFileName FROM [UniversityDB].[dbo].[StudentTable]";
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
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Student student)
        {
            string query = @"INSERT INTO [UniversityDB].[dbo].[StudentTable] (StudentName, 
                            FacultyName, DateOfMatriculation, PhotoFileName) values(
                            '" + student.StudentName+ @"'
                            ,'" + student.FacultyName + @"'
                            ,'" + student.DateOfMatriculation+ @"'
                            ,'" + student.PhotoFileName+ @"'
                            )";
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
        public JsonResult Put(Student student)
        {
            string query = @"UPDATE  [UniversityDB].[dbo].[StudentTable] set 
                            StudentName ='" + student.StudentName+ @"'
                            ,FacultyName ='" + student.FacultyName + @"'
                            ,DateOfMatriculation ='" + student.DateOfMatriculation+ @"'
                            WHERE StudentId = '" + student.StudentId+ @"'";

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
            string query = @"DELETE FROM  [UniversityDB].[dbo].[StudentTable] WHERE StudentId='" + id + @"'";

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

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = environment.ContentRootPath + "/Photo/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("defaultPhoto.png");
            }
        }

        [Route("GetAllFacultyNames")]
        [HttpGet]
        public JsonResult GetAllFacultyNames()
        {
            string query = @"SELECT DISTINCT(FacultyName)
                            FROM [UniversityDB].[dbo].[StudentTable]";
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
            return new JsonResult(table);
        }





    }
}
