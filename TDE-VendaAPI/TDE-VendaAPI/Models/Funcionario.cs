using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TDE_VendaAPI.Models
{
    public class Funcionario
    {
        public int Id { get; set; }
        public string Cpf { get; set; }
        public string Nome { get; set; }
        public string Funcao { get; set; }

        public List<Servico> Servico { get; set; }

    }
}
