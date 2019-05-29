var req = new XMLHttpRequest();
var card = document.querySelector("#cardList");
var stockData;
var products;
var count = 0;

var paintCardList = function() {
  for (let i = 0; i < products.length; i++) {
    card.innerHTML += `
<div class="col-md-4 mb-4 " id="">
<div class="card">
    <img src=${products[i].img} class="card-img-top" alt="" />
    <div class="card-body">
      <h5 class="card-title">${products[i].title}</h5>
      <p class="card-text">${products[i].text}</p>
      <p class="card-price">$ ${products[i].price}</p>
      <a href="#" class="btn btn-primary" data-id="${
        products[i].id
      }" onclick="goToDetail()">Go</a>
    </div>
    </div>
    </div>
`;
  }
};

window.onload = getData();

function getData() {
  req.addEventListener("load", function() {
    stockData = JSON.parse(req.response);
    products = stockData.slice(0, 3);
    paintCardList();
    const moreBtn = `<button class="btn btn-danger" id="moreProduct" onclick="moreProducts()">
    Show more
  </button>`;
  });
  req.addEventListener("error", function() {
    alert("현재 상품을 불러올 수 없습니다. 연결 상태를 확인해 주세요");
  });
  req.open("GET", "http://localhost:3000/products");
  req.send();
}

function goToDetail() {
  event.preventDefault();
  location.href = "detail.html?product_num=" + event.target.dataset.id;
}

function moreProducts() {
  count += 1;
  if (count == 1) {
    products = stockData.slice(3);
    paintCardList();
  } else {
    document.querySelector(
      ".more"
    ).innerHTML = `<p class="text-center mt-4">No more products exist.</p>`;
  }
}

var filterTemplate = function() {
  var title = card.querySelectorAll(".card-title"),
    content = card.querySelectorAll(".card-text"),
    price = card.querySelectorAll(".card-price"),
    img = card.querySelectorAll(".card-img-top"),
    aID = card.querySelectorAll("a");
  for (let j = 0; j < stockData.length; j++) {
    title[j].innerHTML = stockData[j].title;
    content[j].innerHTML = stockData[j].text;
    price[j].innerHTML = "$" + stockData[j].price;
    img[j].src = stockData[j].img;
    aID[j].dataset.id = stockData[j].id;
  }
};

document.querySelector(".highFilter").addEventListener("click", function() {
  stockData.sort(function(a, b) {
    return b.price - a.price;
  });
  filterTemplate();
});

document.querySelector(".lowFilter").addEventListener("click", function() {
  stockData.sort(function(a, b) {
    return a.price - b.price;
  });

  filterTemplate();
});
