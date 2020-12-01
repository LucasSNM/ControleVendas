// VARIAVEL COMPRADOR SELECIONADO ARMAZENA O INDEX DE QUAL CLIENTE FOI SELECIONADO NO DROP DOWN MENU
var compradorSelecionado

//CAMINHO PARA LOCALHOST E PASTA DE TASTE API
var caminho ='https://localhost:44360'

//OBJETO COMPRADOR
var comprador = {
  id: [1,2],
  nome: ['João','Victor'],
  cpf: ['1245652214','15478622145'],
  endereco: ['Travessa Ed, 30, Centro, Brazópolis, Minas Gerais, 37530000', 'Travessa Ed, 30, Centro, Brazópolis, Minas Gerais, 37660000'],
  
  salvar: function(){
    if(document.getElementById('span-comprador-nome').value=="" || document.getElementById('span-comprador-cpf').value=="" || document.getElementById('span-comprador-endereco').value==""){
      alert("Todos os dados de cliente devem estar preenchidos")
    }
    else{
      if(compradorSelecionado==null){
        //FUNÇÃO POST NA TABELA CLIENTE
        postComprador(document.getElementById('span-comprador-nome').value, document.getElementById('span-comprador-cpf').value, document.getElementById('span-comprador-endereco').value)
          .catch(error => {
            console.log('Houve um erro na execução do getWeather')
            console.error(error)
          })

        var novoId = this.id.length+1
        this.id.push(novoId)
        this.nome.push(document.getElementById('span-comprador-nome').value)
        this.cpf.push(document.getElementById('span-comprador-cpf').value)
        this.endereco.push(document.getElementById('span-comprador-endereco').value)
        
        compradorSelecionado=novoId
      }
      else{
        //FUNÇÃO PUT NA TABELA CLIENTE, ONDE CLIENTE/ID = COMPRADORSELECIONADO
        putComprador(compradorSelecionado, document.getElementById('span-comprador-nome').value, document.getElementById('span-comprador-cpf').value, document.getElementById('span-comprador-endereco').value)
          .catch(error => {
            console.log('Houve um erro na execução do getWeather')
            console.error(error)
          })

        this.nome[compradorSelecionado] = document.getElementById('span-comprador-nome').value
        this.cpf[compradorSelecionado] = document.getElementById('span-comprador-cpf').value
        this.endereco[compradorSelecionado] = document.getElementById('span-comprador-endereco').value
      }

      limpa()
      liberaAlterar(false)
    }
  },

  deletar: function(){
    //FUNÇÃO DELETE NA TABELA CLIENTE, ONDE CLIENTE/ID = COMPRADORSELECIONADO
    putComprador(compradorSelecionado)
          .catch(error => {
            console.log('Houve um erro na execução do getWeather')
            console.error(error)
          })

    comprador.id.splice(compradorSelecionado, 1)
    comprador.nome.splice(compradorSelecionado, 1)
    comprador.cpf.splice(compradorSelecionado, 1)
    comprador.endereco.splice(compradorSelecionado, 1)


    document.getElementById('btn-deletar').setAttribute("disabled", "true");
    limpa()
  },

  preenche: function(){
    //FUNÇÃO GET NO BANCO DE DADOS, QUE PEGA TODOS OS USÁRIOS CADASTRADOS E SALVA NO OBJETO
    getComprador()
      .catch(error => {
        console.log('Houve um erro na execução do getWeather')
        console.error(error)
      })
  },

  imprime: function (){
      for(var i=0; i<this.id.length; i++){
          document.getElementById("myDropdown-Comprador").innerHTML+=`<a name='${i}'>${this.nome[i]} | ${this.cpf[i]}</a>`
      }
  }
}


//FUNÇÃO GERENCIA CLIENTE
async function getComprador() {
  const response = await fetch(`${caminho}/api/clientes`);
  const data = await response.json();
  data.forEach(element => {
      const { id, nome, cpf, endereco } = element;
      if(!carrinho.id.find(element => element == id)){

        comprador.id.push(id)
        comprador.nome.push(nome)
        comprador.cpf.push(cpf)
        comprador.endereco.push(endereco)

      }
  });
}

async function postComprador( nome, cpf, endereco) {
  const options = {
      method: 'POST',
      mode: "cors",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          nome: nome,
          cpf: cpf,
          endereco: endereco,
      })
  };
  const response = await fetch(`${caminho}/api/clientes`, options);
  const data = await response.json();
}

async function putComprador(id, nome, cpf, endereco) {
  const options = {
      method: 'PUT',
      mode: "cors",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          id: parseInt(id),
          nome: nome,
          cpf: cpf,
          endereco: endereco,
      })
  };
  const response = await fetch(`${caminho}/api/clientes/${id}`, options);
}

async function deleteComprador(id) {
  const options = {
      method: 'DELETE',
      mode: "cors",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },

  };
  const response = await fetch(`${caminho}/api/clientes/${id}`, options);
}



//OBJETO VENDEDOR QUE RECEBE TODOS OS VENDEDORES CADASTRADOS NO BANCO
var vendedor = {
  id: [1,2,3],
  /*
  cpf: [],
  registro: [],
  funcao: [],
  */
  nome: ['Willian','Lucas','Pedro'],

  imprime: function (){
      for(var i=0; i<this.id.length; i++){
          document.getElementById("myDropdown-Vendedor").innerHTML+=`<a name='${i}'>${this.nome[i]}</a>`
      }
  }
}

//OBJETO PRODUTO QUE RECEBE TODOS OS PRODUTOS CADASTRADOS NO BANCO
var produto = {
  id: [1,2],
  nome: ['Memoria Ram Ddr4 HyperX','Placa Video Gtx 1650'],
  valor: [234.99,1099.50],
  quantidade: [5,2],
  

  imprime: function (){
      for(var i=0; i<this.id.length; i++){
          document.getElementById("myDropdown-Produto").innerHTML+=`<a name='${i}'>${this.nome[i]} | ${this.valor[i].toLocaleString("pt-BR", { style: "currency" , currency:"BRL"})} </a>`
      }
  }
}

//OBJETO CARRINHO QUE ARMAZENA OS PRODUTOS SELECIONADOS PARA COMPRA
var carrinho = {
  id:[],
  quantidade: [],
  valorTotal : 0, 

  remove: function(indice){
    carrinho.id.splice(indice, 1);
    carrinho.quantidade.splice(indice, 1);
    this.imprime()
  },

  mudaQuantidade: function(indice, event){
    this.quantidade[indice]=event.target.value
    this.imprime()
  },

  imprime: function(){
    document.getElementById("span-produto").innerHTML=''
    this.valorTotal=0
    for(var i=0; i<this.id.length; i++){
      var id=this.id[i]
      document.getElementById("span-produto").innerHTML+=`<hr><p>${produto.nome[id]}</p>R$ ${produto.valor[id].toLocaleString("pt-BR", { style: "currency" , currency:"BRL"})}  <input type="number" value="${this.quantidade[i]}" min="1" max="${produto.quantidade[id]}" onchange="carrinho.mudaQuantidade(${i}, event)" onKeyDown="return false"></input> <a onclick="carrinho.remove(${i})">remover</a><hr><br/>`
      this.valorTotal+=(produto.valor[id]*this.quantidade[i])
    }
    var valorTotal = this.valorTotal.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"})
    document.getElementById("span-produto").innerHTML+=`Valor Total = ${valorTotal}`
  },
}

//HABILITA OU DESABILITA O DISABLED DOS BOTOES E DOS INPUT TEXT DO CADASTRO DE COMPRADOR
function liberaAlterar(flag){
  if(!flag) {
    document.getElementById('span-comprador-nome').setAttribute("disabled", "true");
    document.getElementById('span-comprador-cpf').setAttribute("disabled", "true");
    document.getElementById('span-comprador-endereco').setAttribute("disabled", "true");

    document.getElementById('btn-alterar').removeAttribute("disabled");
    document.getElementById('btn-salvar').setAttribute("disabled", "true");
    document.getElementById('btn-deletar').setAttribute("disabled", "true");
  }
  else{
    document.getElementById('span-comprador-nome').removeAttribute("disabled");
    document.getElementById('span-comprador-cpf').removeAttribute("disabled");
    document.getElementById('span-comprador-endereco').removeAttribute("disabled");

    document.getElementById('btn-salvar').removeAttribute("disabled");
    document.getElementById('btn-alterar').setAttribute("disabled", "true");
    document.getElementById('btn-deletar').setAttribute("disabled", "true");
  }
}

//LIMPA OS DADOS DO INPUT TEXT DE CADASTRO DE COMPRADOR
function limpa(){
  document.getElementById('span-comprador-nome').value=""
  document.getElementById('span-comprador-cpf').value=""
  document.getElementById('span-comprador-endereco').value=""
  compradorSelecionado=null
}


//FUNÇÃO QUE ABRE OU FECHA O DROP DOWN MENU
function toggleDropDownVendedor() {  
  document.getElementById("myDropdown-Vendedor").classList.toggle("show");
  document.getElementById("myDropdown-Vendedor").innerHTML='<input type="text" placeholder="Pesquisa Vendedor..." id="myInput-Vendedor" class="myInput" onkeyup="filterFunctionVendedor()">'
  vendedor.imprime()
}

function toggleDropDownComprador() {  
  document.getElementById("myDropdown-Comprador").classList.toggle("show");
  document.getElementById("myDropdown-Comprador").innerHTML='<input type="text" placeholder="Pesquisa Comprador..." id="myInput-Comprador" class="myInput" onkeyup="filterFunctionComprador()">'
  comprador.imprime()
}

function toggleDropDownProduto() {  
  document.getElementById("myDropdown-Produto").classList.toggle("show");
  document.getElementById("myDropdown-Produto").innerHTML='<input type="text" placeholder="Pesquisa Produto..." id="myInput-Produto" class="myInput" onkeyup="filterFunctionProduto()">'
  produto.imprime()
}
  

//FILTRO DE PESQUISA DE CADA UM DOS DROP DOWN MENU
function filterFunctionVendedor() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput-Vendedor");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown-Vendedor");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function filterFunctionComprador() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput-Comprador");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown-Comprador");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function filterFunctionProduto() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput-Produto");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown-Produto");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}


//VERIFICA QUAL OPÇÃO FOI SELECIONADA DO DROP DOWN MENU
window.onclick = function(event) {
    if (event.target.matches('.vendedor a')) {
        console.log(event.target.innerText)
        document.getElementById("span-vendedor").textContent=event.target.innerText
        document.getElementById("myDropdown-Vendedor").classList.toggle("show");
    }

    if (event.target.matches('.comprador a')) {
      console.log(event.target.name)
      var i=event.target.name
      compradorSelecionado=i
      document.getElementById("span-comprador-nome").value=comprador.nome[i]
      document.getElementById("span-comprador-cpf").value=comprador.cpf[i]
      document.getElementById("span-comprador-endereco").value=comprador.endereco[i]
      document.getElementById('btn-deletar').removeAttribute("disabled");
      document.getElementById("myDropdown-Comprador").classList.toggle("show");
    }

    if (event.target.matches('.produto a')) {
      var i=event.target.name
      if(carrinho.id.find(element => element == i)){
        alert("Produto já esta no carrinho")
      }
      else{
        carrinho.id.push(i)
        carrinho.quantidade.push(1)
        carrinho.imprime()
        document.getElementById("myDropdown-Produto").classList.toggle("show");
      }
    }

  }

