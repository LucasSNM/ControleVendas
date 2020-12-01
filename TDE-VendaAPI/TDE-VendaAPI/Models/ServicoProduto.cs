using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TDE_VendaAPI.Models
{
    public class ServicoProduto
    {
        public int ServicoId { get; set; }
        public int ProdutoId { get; set; }

        public Servico Servico { get; set; }
        public Produto Produto { get; set; }
      

    }
}
