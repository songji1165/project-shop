const modal = document.querySelector("#modal");

document.querySelector(".requriedModal").addEventListener("click", function(e) {
  e.defaultPrevented;

  modal.style.display = "block";

  modal.querySelector(".modalTitle").innerHTML = e.target.innerHTML;
});

modal.addEventListener('click',function(e){
    if(e.target == modal.querySelector(".closeModal") || e.target == modal){
        modal.style.display = "none";
    }
})