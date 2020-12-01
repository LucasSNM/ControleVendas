using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TDE_VendaAPI.Dados;
using TDE_VendaAPI.Models;

namespace TDE_VendaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicoProdutosController : ControllerBase
    {
        private readonly TDEVendaAPIContext _context;

        public ServicoProdutosController(TDEVendaAPIContext context)
        {
            _context = context;
        }

        // GET: api/ProdutoServicoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServicoProduto>>> GetProdutosServicos()
        {
            return await _context.ServicoProdutos.ToListAsync();
        }

        // GET: api/ProdutoServicoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServicoProduto>> GetProdutoServico(int id)
        {
            var produtoServico = await _context.ServicoProdutos.FindAsync(id);

            if (produtoServico == null)
            {
                return NotFound();
            }

            return produtoServico;
        }

        // PUT: api/ProdutoServicoes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProdutoServico(int id, ServicoProduto produtoServico)
        {
            if (id != produtoServico.ProdutoId)
            {
                return BadRequest();
            }

            _context.Entry(produtoServico).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProdutoServicoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ProdutoServicoes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ServicoProduto>> PostProdutoServico(ServicoProduto produtoServico)
        {
            _context.ServicoProdutos.Add(produtoServico);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProdutoServicoExists(produtoServico.ProdutoId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProdutoServico", new { id = produtoServico.ProdutoId }, produtoServico);
        }

        // DELETE: api/ProdutoServicoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ServicoProduto>> DeleteProdutoServico(int id)
        {
            var produtoServico = await _context.ServicoProdutos.FindAsync(id);
            if (produtoServico == null)
            {
                return NotFound();
            }

            _context.ServicoProdutos.Remove(produtoServico);
            await _context.SaveChangesAsync();

            return produtoServico;
        }

        private bool ProdutoServicoExists(int id)
        {
            return _context.ServicoProdutos.Any(e => e.ProdutoId == id);
        }
    }
}
