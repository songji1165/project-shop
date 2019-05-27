window.addEventListener("scroll", function() {
  console.log(window.scrollTop);
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector(".navbar").classList.add("navbar-small");
  } else {
    document.querySelector(".navbar").classList.remove("navbar-small");
  }
});
