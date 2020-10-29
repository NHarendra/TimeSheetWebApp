using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeSheetWebApi.DataBaseCtxt;
using TimeSheetWebApi.GlobalException;
using TimeSheetWebApi.Models;

namespace TimeSheetWebApi.Repository
{
    public class RepositoryClass<T> : IRepository<T> where T : BaseEntity
    {
        protected readonly DatabaseContext context;
        private DbSet<T> entities;
        string errorMessage = string.Empty;
        public RepositoryClass(DatabaseContext context)
        {
            try
            {
                this.context = context;
                entities = context.Set<T>();
            }
            catch(Exception ex)
            {
                throw new MyAppException(ex.Message);
            }
        }
        public IQueryable<T> GetAll()
        {
            try
            {
                return entities.AsQueryable();
            }
            catch (Exception ex)
            {
                throw new MyAppException(ex.Message);
            }
        }
        public T GetById(int id)
        {
            try
            {
                return entities.SingleOrDefault(s => s.Id == id);
            }
            catch (Exception ex)
            {
                throw new MyAppException(ex.Message);
            }
        }
        public void Insert(T entity)
        {

            try
            {
                if (entity == null) throw new ArgumentNullException("entity");
                entities.Add(entity);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new MyAppException(ex.Message);
            }
        }
        public void Update(T entity)
        {
            try
            {
                if (entity == null) throw new ArgumentNullException("entity");
                entities.Update(entity);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new MyAppException(ex.Message);
            }
        }
        public void Delete(int id)
        {
            try
            {
                if (id == null) throw new ArgumentNullException("entity");
                T entity = entities.SingleOrDefault(s => s.Id == id);
                entities.Remove(entity);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new MyAppException(ex.Message);
            }
        }
    }
}
