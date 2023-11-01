const tableData = document.getElementById("tableContent")
const buttonAdd = document.getElementById("addProduct")
const buttonCancel = document.getElementById("cancel")
const modal = document.getElementById("modal")
const productName = document.getElementById("productName")
const productValue = document.getElementById("productValue")
const productQuantity = document.getElementById("productQuantity")
const btnSend = document.getElementById("send")
const form = document.getElementById("formu")
const errorMessage = document.getElementById("errorMessage")
const modal2 = document.getElementById("modal2")
const productName2 = document.getElementById("productNameChange")
const productValue2 = document.getElementById("productValueChange")
const productQuantity2 = document.getElementById("productQuantityChange")
const btnChange = document.getElementById("change")
const formChange = document.getElementById("formula")
const btnCancelChange = document.getElementById("cancelChange")

let editingProductIndex = -1

const products = [
    {nome: "IPhone X 64Gb Grey", preco: 999.0, quantidade: 1},
    {nome: "Samsung S8 black", preco: 999.0, quantidade: 1}
]

function formatDataToString(value) {
    const valorFormatado = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }) 
    return valorFormatado
}

function handleDelete(id) {
  products.splice(id, 1)
  renderDataTable()
}

function handleEdit(id) {
  editingProductIndex = id
  const product = products[id]
  productName2.value = product.nome
  productValue2.value = product.preco
  productQuantity2.value = product.quantidade
  openModal2()
}

function criaModelo(nome, preco, quantidade, total, id) {
    const resultHtml =  (tableData.innerHTML += `
    <tr class="even:bg-[#f2f2f2] odd:bg-white">
        <td class="p-3">${nome}</td>
        <td class="p-3">${preco}</td>
        <td class="p-3">${quantidade}</td>
        <td class="text-center p-3">${total}</td>
        <td class="flex gap-2 items-center justify-center p-3">
        <button onclick="handleEdit(${id})" class="py-1 px-2 bg-gray-800 text-white rounded-md">Editar</button>
        <button onclick="handleDelete(${id})" class="py-1 px-2 bg-red-800 text-white rounded-md">Deletar</button>
        </td>
    </tr>
`)
return resultHtml
}

function renderDataTable() {
  tableData.innerHTML = ""
    products.map((product, index) => {
      const preco = formatDataToString(Number(product.preco))
      const total = product.preco * product.quantidade
      const totalFormatado = formatDataToString(total)
      const data = criaModelo(product.nome, preco, product.quantidade, totalFormatado, index)
    })
  }  

  function btnChangeProduct(e) {
    e.preventDefault()
    const newName = productName2.value
    const newValue = productValue2.value
    const newQuantity = productQuantity2.value
  
    if (newName && newValue && newQuantity) {
      const editedProduct = {
        nome: newName,
        preco: newValue,
        quantidade: newQuantity,
      }
  
      if (editingProductIndex !== -1) {
        products[editingProductIndex] = editedProduct
      }
  
      closeModal2()
      renderDataTable()
      editingProductIndex = -1
    } else {
      showErrorMessage()
    }
  }

  function openModal() {
    modal.classList.remove("hidden")
    modal.classList.add("flex")
  }
  function openModal2() {
    modal2.classList.remove("hidden")
    modal2.classList.add("flex")
  }
  
  function closeModal() {
    modal.classList.remove("flex")
    modal.classList.add("hidden")
    hiddenErrorMessage()
    form.reset()
  }
  function closeModal2() {
    modal2.classList.remove("flex")
    modal2.classList.add("hidden")
    hiddenErrorMessage()
    formChange.reset()
  }
  

  function showErrorMessage(){
    errorMessage.classList.remove("hidden")
    errorMessage.classList.add("block")
  }
  function hiddenErrorMessage(){
    errorMessage.classList.remove("block")
    errorMessage.classList.add("hidden")
  }
  function addProduct() {
    if(productName.value && productQuantity.value && productValue.value) {
      products.push({nome: productName.value, preco: productValue.value, quantidade:productQuantity.value})
      closeModal()
    }else {
      showErrorMessage()
    }
  }

  renderDataTable()

  buttonAdd.addEventListener("click", openModal)

  btnChange.addEventListener("click", btnChangeProduct)
  
  buttonCancel.addEventListener("click", (e) => {
    e.preventDefault()    
    closeModal()
  })
  
  btnSend.addEventListener("click", (e) => {
    e.preventDefault()
    addProduct()
    renderDataTable()    
  })

  btnCancelChange.addEventListener("click", (e) => {
    e.preventDefault()
    closeModal2()
    editingProductIndex = -1
  })

  /*
  *TAREFA*
  - pegar o valor dos nomes, preços e quantidade e fazer a ediçao 
  
  */