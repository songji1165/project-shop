var cartList;
var table = document.querySelector("table");
var tableBody = table.querySelector("tbody");
var tr = tableBody.querySelectorAll("tr");

function paintTable(){
    if(tableBody.hasChildNodes()){
        for(let k=0; k<tr.length;k++){
            console.log(tr[k])
            tableBody =  tableBody.removeChild(tr[k])
        }
      
    
    }

    cartList = JSON.parse(localStorage.getItem("CARTLIST"));
    cartList.sort(function(a, b) {
      if (a.title > b.title) return 1;
      else if (b.title > a.title) return -1;
      else return 0;
    });
  
    for (let i = 0; i < cartList.length; i++) {
      tableBody.innerHTML += `<tr>
      <td >${cartList[i].title} </td>
      <td class="quantity">
        <button class="btn minus">-</button>
        <span class="num">${cartList[i].number}</span>
        <button class="btn plus">+</button>
      </td>
      <td >${cartList[i].size}</td>
      <td >${cartList[i].price}</td>
      <td ><button class="btn del btn-outline-secondary p-1" data-id="${cartList[i].id}">Delete</button></td>       
    </tr>`;
    }
}
(function init(){
    paintTable()
})()


document.querySelector("tbody").addEventListener("click", function(e) {
  if (e.target.classList[1] == "plus") {
    e.target.previousSibling.previousSibling.innerText =
      parseInt(e.target.previousSibling.previousSibling.innerText) + 1;
  } else if (e.target.classList[1] == "minus") {
    if (e.target.nextSibling.nextSibling.innerText > 0) {
      e.target.nextSibling.nextSibling.innerText -= 1;
    }
  } else if(e.target.classList[1] == "del"){
      let find = cartList.find(function(item) {return item.id === e.target.dataset.id})

      cartList.splice(find,1);
      localStorage.setItem("CARTLIST",JSON.stringify(cartList))
      paintTable()
  }
});