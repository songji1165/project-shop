var cartList;
var table = document.querySelector("table");
var tableBody = table.querySelector("tbody");
var tr = tableBody.querySelectorAll("tr");

function paintTable() {
  if (tableBody.hasChildNodes()) {
    for (let k = 0; k < tr.length; k++) {
      tableBody = tableBody.removeChild(tr[k]);
    }
  }

  cartList = JSON.parse(localStorage.getItem("CARTLIST"));
  cartList.sort(function(a, b) {
    if (a.title > b.title) return 1;
    else if (b.title > a.title) return -1;
    else return 0;
  });

  for (let i = 0; i < cartList.length; i++) {
    tableBody.innerHTML += `<tr id="${i}">
      <td >${cartList[i].title} </td>
      <td class="quantity">
        <button class="btn minus">-</button>
        <span class="num">${cartList[i].number}</span>
        <button class="btn plus">+</button>
      </td>
      <td >${cartList[i].size}</td>
      <td class="price">${cartList[i].price}</td>
      <td ><button class="btn del btn-outline-secondary p-1" data-data="${i}">Delete</button></td>       
    </tr>`;
  }
}

tableBody.addEventListener("click", function(e) {
  if (e.target.classList[1] == "plus") {
    e.target.previousSibling.previousSibling.innerText =
      parseInt(e.target.previousSibling.previousSibling.innerText) + 1;
  } else if (e.target.classList[1] == "minus") {
    if (e.target.nextSibling.nextSibling.innerText > 0) {
      e.target.nextSibling.nextSibling.innerText -= 1;
    }
  } else if (e.target.classList[1] == "del") {
    const currentTr = e.target.parentNode.parentNode.id;
    cartList.splice(currentTr, 1);

    tableBody.removeChild(e.target.parentNode.parentNode);

    localStorage.setItem("CARTLIST", JSON.stringify(cartList));
  }
  sumFun();
});

(function init() {
  paintTable();
  sumFun();
})();

function sumFun() {
  var arrNumber = tableBody.querySelectorAll(".num");
  var arrPrice = tableBody.querySelectorAll(".price");
  var arrN = [];
  var arrP = [];
  arrNumber.forEach(val => {
    arrN.push(val.innerText);
  });
  arrPrice.forEach(val => {
    arrP.push(val.innerText.split(" ", 2)[1]);
  });

  var sumProducts = 0;
  var sumTotal = 0;

  arrN.forEach(val => {
    sumProducts += parseInt(val);
  });
  for (let i = 0; i < arrN.length; i++) {
    sumTotal += arrN[i] * arrP[i];
  }

  document.querySelector(".sumProducts").innerText = `${sumProducts}`;
  document.querySelector(".sumTotal").innerText = `$ ${sumTotal}`;
}
