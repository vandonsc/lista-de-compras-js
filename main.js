 let listaDeItens = []

 const form = document.getElementById("form-itens")
 const itensInput = document.getElementById("receber-item")
 const ulItens = document.getElementById("lista-de-itens")
 const ulItensComprados = document.getElementById("itens-comprados")

 form.addEventListener("submit", function(evento){
    evento.preventDefault() //impedir que algo aconteça
    salvarItem()
    mostrarItem()
    itensInput.focus

 })



 function salvarItem(){
    const comprasItem = itensInput.value 
    const checarDuplicado = listaDeItens.some ((elemento)=> elemento.valor.toUpperCase() === comprasItem.toUpperCase())

    if(checarDuplicado == true){
        alert("Item ja exsite")
    }else{


    listaDeItens.push( {
        valor: comprasItem,
        checar: false
    })
    } 

    itensInput.value = ''
 }

 function mostrarItem(){
    ulItens.innerHTML = ''
    ulItensComprados.innerHTML = ''
    listaDeItens.forEach((elemento,index) => {
        if (elemento.checar) { 
        ulItensComprados.innerHTML += `
     <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" checked class="is-clickable" />  
            <span class="itens-comprados is-size-5">${elemento.valor}</span>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li> `    
        }else{
        ulItens.innerHTML += ` 
     <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}"></input>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
     </li>`
    }
    })

    const inputsCheck = document.querySelectorAll('input[type = "checkbox"]')

    inputsCheck.forEach(i => {
        i.addEventListener('click', (evento) => {
         const valorDoELemento = evento.target.parentElement.parentElement.getAttribute('data-value')
         listaDeItens[valorDoELemento].checar = evento.target.checked
         mostrarItem()
        })
    })
 }