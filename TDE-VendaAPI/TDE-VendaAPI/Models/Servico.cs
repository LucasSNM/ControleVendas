using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TDE_VendaAPI.Models
{
    public class Servico
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public int FuncionarioId { get; set; }

        public DateTime Data { get; set; }
        public string ValorTotal { get; set; }

        public List <ServicoProduto> ServicoProdutos{ get; set; }

        public Cliente Cliente { get; set; }

        public Funcionario Funcionario { get; set; }


    }
}
