 let listaDeItens = []
 let itemAEditar

 const form = document.getElementById("form-itens")
 const itensInput = document.getElementById("receber-item")
 const ulItens = document.getElementById("lista-de-itens")
 const ulItensComprados = document.getElementById("itens-comprados")
 const listaRecuperada = localStorage.getItem('listaDeItens')//getItem pega informações
 function atualizaLocalStorage(){
    localStorage.setItem('listaDeItens' , JSON.stringify(listaDeItens)) //.stringify transforma elementos em dados do tipo string
 }

 //o que retorna false em uma condição em js: (valores omitidos, 0, null, NaN. undefined, "", false) << retornam false

if(listaRecuperada){
    listaDeItens = JSON.parse(listaRecuperada) //.parse transforma elementos em dados do tipo javascript
    mostrarItem()
}else{
    listaDeItens = []
}

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
            <button onclick= "salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button><i class="fa-regular is-clickable fa-pen-to-square editar"></i>
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

    const deletarObjetos =  document.querySelectorAll(".deletar")

    deletarObjetos.forEach(i => {
        i.addEventListener('click', (evento) => {
         const valorDoELemento = evento.target.parentElement.parentElement.getAttribute('data-value')
         listaDeItens.splice(valorDoELemento, 1)
         mostrarItem()
         
        })
    
    })

    const editarItens = document.querySelectorAll(".editar")

   editarItens.forEach(i => {
        i.addEventListener('click', (evento) => {
         itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value')
         mostrarItem()
         
        })
    
    })

    atualizaLocalStorage()
 }

 function salvarEdicao(){
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
   // console.log(itemEditado.value)
    listaDeItens[itemAEditar].valor = itemEditado.value
    console.log(listaDeItens)
    itemAEditar = -1
    mostrarItem()

 }