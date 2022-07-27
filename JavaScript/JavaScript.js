class Despesas 
{

  constructor(ano, mes, dia, tipo, descricao, valor)
  {
    this.ano = ano,
    this.mes = mes,
    this.dia = dia,
    this.tipo = tipo, 
    this.descricao = descricao, 
    this.valor = valor 
  }


  validarDados()
  {
      for(let i in this)
      {
        if(this[i] == undefined || this[i] == '' || this[i] == null)
        return false
      }

      return true
  }

}



class Bd
{
  constructor()
  {
    let id = localStorage.getItem('id')

    if(id === null)
    {
      localStorage.setItem('id' , 0)
    }

  }

  getProximoId()
  {
    let proximoId = localStorage.getItem('id')
    return parseInt(proximoId) + 1
  }

  gravar(d)
  {
    let id = this.getProximoId()
    localStorage.setItem(id, JSON.stringify(d))
    localStorage.setItem('id', id)
  }

  pesquisar(despesa)
  {

    let despesasFiltradas = Array()

    despesasFiltradas = this.recuperarTodosRegistros()

    //ano
    if(despesa.ano != '')
    {
      despesasFiltradas = despesasFiltradas.filter( d => d.ano == despesa.ano)
    }

    //mes
    if(despesa.mes != '')
    {
      despesasFiltradas = despesasFiltradas.filter( d => d.mes == despesa.mes )
    }

    //Dia
    if(despesa.dia != '')
    {
      despesasFiltradas = despesasFiltradas.filter( d => d.dia == despesa.dia )
    }

    //Tipo
    if(despesa.tipo != '')
    {
      despesasFiltradas = despesasFiltradas.filter( d => d.tipo == despesa.tipo )
    }

    //Descrição
    if(despesa.descricao != '')
    {
      despesasFiltradas = despesasFiltradas.filter( d => d.descricao == despesa.descricao )
    }

    //valor
    if(despesa.valor != '')
    {
    despesasFiltradas = despesasFiltradas.filter( d => d.valor == despesa.valor )
    }

    return despesasFiltradas

  }


  recuperarTodosRegistros()
  {

    let despesas = Array()

    let id = localStorage.getItem('id')

    for(let i = 1; i <= id; i++)
    {
      let despesa =  JSON.parse(localStorage.getItem(i))

      if(despesa == null)
      {
        continue
      }
      despesa.id = i
      despesas.push(despesa)
    }

    return despesas    
  }

  remover(id)
  {
    localStorage.removeItem(id)    
  }

  

}

let bd = new Bd()



function cadastrarDespesas()
{

  let ano = document.getElementById('Ano')
  let mes = document.getElementById('Mes')
  let dia = document.getElementById('Dia')
  let tipo = document.getElementById('Tipo')
  let descricao = document.getElementById('Descricao')
  let valor = document.getElementById('Valor')

  let despesa = new Despesas
  ( 
   ano.value,
   mes.value,
   dia.value,
   tipo.value,
   descricao.value,
   valor.value
  )

  if(despesa.validarDados())
    {
      //dialogo de sucesso
      bd.gravar(despesa)
      let elemento = document.getElementById('minha_modal_Sucesso')
      let minha_modal = new bootstrap.Modal(elemento)
      minha_modal.show()

      ano.value = ''
      mes.value = ''
      dia.value = ''
      tipo.value = ''
      descricao.value = ''
      valor.value = ''
    }

    else 
    {
      //dialogo de erro
      let elemento = document.getElementById('minha_modal')
      let minha_modal = new bootstrap.Modal(elemento)
      minha_modal.show()

    }

}




function carregaListaRegistro()
{
  let despesas = Array()
  despesas = bd.recuperarTodosRegistros()

  //selecionando o Tbody
  let listaDespesas = document.getElementById('listaDespesas')

  //Percorrer o Array, listando cada despesa de forma dinâmica
  despesas.forEach(function(d)
  {

    
        //criando a linha (tr)
        let linha = listaDespesas.insertRow()
  
        //criando as coluna (td)
        linha.insertCell(0).innerHTML = `${d.dia} / 0${d.mes} / ${d.ano}`

        switch(d.tipo)
        {
          case '1' : d.tipo = 'Alimentação'
          break

          case '2' : d.tipo = 'Educação'
          break 
          
          case '3' : d.tipo = 'Esporte'
          break 
          
          case '4' : d.tipo = 'Lazer'
          break 
          
          case '5' : d.tipo = 'Ordem DeMolay'
          break
        }
        linha.insertCell(1).innerHTML = `${d.tipo} `
        linha.insertCell(2).innerHTML = `${d.descricao}`
        linha.insertCell(3).innerHTML = `${d.valor} `

        //Botão de exclusão 
        let btn = document.createElement("button")
        btn.className = 'btn-danger'
        btn.innerHTML = '<i class="bi bi-x-square"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function()
        {
          //Remover despesa
          let id = this.id.replace('id_despesa_', '')
        
          bd.remover(id)
          window.location.reload()
        
        }
        
        linha.insertCell(4).append(btn)

  })

}



function pesquisarDespesa()
{
  
  let ano = document.getElementById('Ano').value
  let mes = document.getElementById('Mes').value
  let dia = document.getElementById('Dia').value
  let tipo = document.getElementById('Tipo').value
  let descricao = document.getElementById('Descricao').value
  let valor = document.getElementById('Valor').value 


  let despesa = new Despesas(ano, mes, dia, tipo, descricao, valor)



  let despesas = bd.pesquisar(despesa)

     //selecionando o tBody
     let listaDespesas = document.getElementById('listaDespesas')
     listaDespesas.innerHTML = '' 


     //Percorrer o Array, listando cada despesa de forma dinâmica
     despesas.forEach(function(d)
  {

        //criando a linha (tr)
        let linha = listaDespesas.insertRow()
  
        //criando as coluna (td)
        linha.insertCell(0).innerHTML = `${d.dia} / 0${d.mes} / ${d.ano}`

        switch(d.tipo)
        {
          case '1' : d.tipo = 'Alimentação'
          break

          case '2' : d.tipo = 'Educação'
          break 
          
          case '3' : d.tipo = 'Esporte'
          break 
          
          case '4' : d.tipo = 'Lazer'
          break 
          
          case '5' : d.tipo = 'Ordem DeMolay'
          break
        }
        linha.insertCell(1).innerHTML = `${d.tipo} `
        linha.insertCell(2).innerHTML = `${d.descricao}`
        linha.insertCell(3).innerHTML = `${d.valor} `


  })





}