using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TDE_VendaAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TDE_VendaAPI.Dados
{
    public class TDEVendaAPIContext: DbContext
    {
        public TDEVendaAPIContext(DbContextOptions<TDEVendaAPIContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ServicoProduto>()
                .HasKey(ac => new { ac.ServicoId, ac.ProdutoId });
        }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Funcionario> Funcionarios { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Servico> Servicos { get; set; }
        public DbSet<ServicoProduto> ServicoProdutos { get; set; }
    }
}

