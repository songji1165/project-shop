var card = document.querySelector("#cardList");
var stockData;
var products;
var count = 0;

window.onload = function() {
  fetch(
    "http://ec2-18-191-138-183.us-east-2.compute.amazonaws.com:8888/products"
  )
    .then(data => {
      data.json().then(function(temp) {
        stockData = temp.data.products;
        products = stockData.slice(0, 3);
        paintCardList();
        sessionStorage.setItem("stocksData", JSON.stringify(stockData));
      });
      //  stockData = data;
      //   products = stockData.slice(0, 3);
      //   paintCardList();
      //   sessionStorage.setItem("stocksData", JSON.stringify(stockData));
    })
    .catch(err =>
      alert("현재 상품을 불러올 수 없습니다. 연결 상태를 확인해 주세요")
    );
};

function paintCardList() {
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

var filterTemplate = function(stockData) {
  var title = card.querySelectorAll(".card-title"),
    text = card.querySelectorAll(".card-text"),
    price = card.querySelectorAll(".card-price"),
    img = card.querySelectorAll(".card-img-top"),
    id = card.querySelectorAll("a");
  var j;
  for (j in stockData) {
    title[j].innerHTML = stockData[j].title;
    text[j].innerHTML = stockData[j].text;
    price[j].innerHTML = "$" + stockData[j].price;
    img[j].src = stockData[j].img;
    id[j].dataset.id = stockData[j].id;
  }
};

document.querySelector(".highFilter").addEventListener("click", function() {
  stockData.sort(function(a, b) {
    return b.price - a.price;
  });
  filterTemplate(stockData);
});

document.querySelector(".lowFilter").addEventListener("click", function() {
  stockData.sort(function(a, b) {
    return a.price - b.price;
  });

  filterTemplate(stockData);
});
