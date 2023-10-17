const tableData = document.getElementById("tableContent")
const buttonAdd = document.getElementById("addProduct")
const buttonCancel = document.getElementById("cancel")
const modal = document.getElementById("modal")

const products = [
    {nome: "IPhone X 64Gb Grey", preco: 999.0, quantidade: 1},
    {nome: "Samsung S8 black", preco: 999.0, quantidade: 1}
]

function formatDataToString(value) {
    const valorFormatado = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }) 
    return valorFormatado;
}

function criaModelo(nome, preco, quantidade, total) {
    const resultHtml =  (tableData.innerHTML += `
    <tr class="even:bg-[#f2f2f2] odd:bg-white">
        <td class="p-3">${nome}</td>
        <td class="p-3">${preco}</td>
        <td class="p-3">${quantidade}</td>
        <td class="text-center p-3">${total}</td>
    </tr>
`)
return resultHtml
}

function renderDataTable() {
    products.map((product) => {
      const preco = formatDataToString(product.preco)
      const total = product.preco * product.quantidade
      const totalFormatado = formatDataToString(total)
      const data = criaModelo(product.nome, preco, product.quantidade, totalFormatado)
    })
  }  
  renderDataTable()

  function openModal() {
    modal.classList.remove("hidden")
    modal.classList.add("flex")
  }
  buttonAdd.addEventListener("click", openModal)