 let listaDeItens = []

 const form = document.getElementById("form-itens")
 const itensInput = document.getElementById("receber-item")

 form.addEventListener("submit", function(evento){
    evento.preventDefault() //impedir qu algo aconteça
    salvarItem()
 })

 function salvarItem(){
    const comprasItem = itensInput.value 
    const checarDuplicado = listaDeItens.some ((elemento)=> elemento.valor.toUpperCase() === comprasItem.toUpperCase())

    if(checarDuplicado == true){
        alert("Item ja exsite")
    }else{


    listaDeItens.push( {
        valor: comprasItem
    })
    }
    console.log(listaDeItens)
 }