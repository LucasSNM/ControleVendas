using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TDE_VendaAPI.Models
{
    public class Produto
    {
        public int Id { get; set; }
        public string Quantidade { get; set; }
        public string Valor { get; set; }
        public int Identificacao { get; set; }
        public string Descricao { get; set; }

        public List<ServicoProduto> ServicoProdutos { get; set; }

        public Cliente Cliente { get; set; }


    }
}
