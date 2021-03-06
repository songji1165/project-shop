var stockData;
window.onload = getData();

function getData() {
  if (sessionStorage.getItem("stocksData")) {
    stockData = JSON.parse(sessionStorage.getItem("stocksData"));
    let selectedProduct = stockData.filter(function(n) {
      return n.id == getParam();
    });
    paintDetail(selectedProduct);
  } else {
    alert("데이터를 불러올 수 없습니다.");
    location.href = "index.html";
  }
}

function getParam(sname) {
  const params = location.search.substr(location.search.indexOf("?"));

  const productNum = params.split("=")[1];
  return productNum;
}

function paintDetail(data) {
  const container = document.querySelector(".container");
  container.querySelector(".product-img").src = data[0].img;
  container.querySelector(".product-title").innerHTML = data[0].title;
  container.querySelector(".product-text").innerHTML = data[0].text;
  container.querySelector(".product-price").innerHTML = `$ ${data[0].price}`;
}

document.querySelector(".tabDetail").addEventListener("click", function(e) {
  let id = e.target.dataset.id;
  const tabBtn = this.querySelectorAll(".tab-button");
  const tabContent = this.querySelectorAll(".tab-content");

  for (let i = 0; i < tabBtn.length; i++) {
    tabBtn[i].classList.remove("active");
    tabContent[i].classList.remove("show");
  }

  tabBtn[id].classList.add("active");
  tabContent[id].classList.add("show");
});

document.querySelector(".modalMoveTO").addEventListener("click", function(e) {
  if (e.target == this.querySelector(".moveToCart")) {
    location.href = "cart.html";
  } else if (e.target == this.querySelector(".closeModal")) {
    this.classList.remove("show");
  }
});

let cartList = [];
let data = 0;
document.querySelector(".saveCartBtn").addEventListener("click", saveLS);

function saveLS() {
  event.preventDefault();
  var data = data + 1;
  let savedProdutInfo = {
    data: data,
    id: getParam(),
    title: document.querySelector(".product-title").innerText,
    number: document.querySelector("#number").value,
    color: document.querySelector("#color").value,
    size: document.querySelector("#size").value,
    price: document.querySelector(".product-price").innerText
  };
  if (localStorage.getItem("CARTLIST")) {
    cartList = JSON.parse(localStorage.getItem("CARTLIST"));
  }
  cartList.push(savedProdutInfo);
  localStorage.setItem("CARTLIST", JSON.stringify(cartList));

  document.querySelector(".modalMoveTO").classList.add("show");
}
