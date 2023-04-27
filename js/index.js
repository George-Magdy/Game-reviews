

var games = []
var category = "mmorpg"
var detalis = []
var selectedID = "521"


async function getGames() {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '64b5e48e58msh1be071d2c667576p10393bjsnb84c06ed7cb4',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options)
    var response = await api.json()
    
    games =  response

}

async function getDetalis() {

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '64b5e48e58msh1be071d2c667576p10393bjsnb84c06ed7cb4',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

    api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${selectedID}`, options)
    var response = await api.json()
    
    detalis =  response

}



function displayGames(){
var cards =""

for (let i = 0; i < games.length; i++) {

cards += `<div class="col-xl-3 col-lg-4 col-md-6 position-relative">

<div  class="card bg-darkblue text-white p-3 pb-0 opacity-75" >
<div id="${games[i].id}" class="layer w-100 h-100 position-absolute"></div>
    <img src="${games[i].thumbnail}" class="w-100 card-img-top" alt="...">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title fs-6">${games[i].title}</h5>
        <p class="bg-blue px-2 py-1 rounded-2 fs-7 fw-bolder">Free</p>

    </div>
      <p class="card-text text-white-50 fs-7">${games[i].short_description.split(" ").slice(0,10).join(" ")}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item bg-darkblue text-white d-flex justify-content-between align-items-center">
        <p class="fs-7 fw-bolder bg-gray px-2 mb-0 rounded-pill">${games[i].genre}</p>
        <p class="fs-7 fw-bolder bg-gray px-2 mb-0 rounded-3">${games[i].platform}</p>
      </li>
    </ul>
  </div>
</div>`
    
}
document.getElementById("games").innerHTML = cards

}

function displayDetalis() {
var detalied = ""
detalied = `<div class="container text-white">
<div class=" d-flex justify-content-between align-items-center mt-4">
    <h2>Details Game</h2>
    <i class="fa-solid fa-xmark fs-4 text-white-50"></i>
</div>
<div class="row mt-5">
    <div class="col-md-4">
    <img class="w-100" src="${detalis.thumbnail}" alt="">
    </div>
    <div class="col-md-8 ">
        <h3>Title: ${detalis.title}</h3>
        <p>Category: <span class="bg-info text-black fs-7 fw-bolder px-2 rounded-2">${detalis.genre}</span></p>
        <p>Platform: <span class="bg-info text-black fs-7 fw-bolder px-2 rounded-2">${detalis.platform}</span></p>
        <p>Status: <span class="bg-info text-black fs-7 fw-bolder px-2 rounded-2">${detalis.status}</span></p>
        <p class="fs-7">${detalis.description}</p>
        <a href="${detalis.game_url}" target="_blank" class="text-decoration-none"><button class="btn btn-outline-warning text-white">Show Game</button></a>
            
    </div>

</div>
</div>`


  document.querySelector(".details").innerHTML = detalied
  $(".details").fadeIn(200)
  $("#games").fadeOut(100)
  $("#navbar").fadeOut(100)
  $("#header").fadeOut(100)
  $(".fa-xmark").click(()=>{
    $(".details").fadeOut(200)
    $("#games").fadeIn(200)
    $("#navbar").fadeIn(100)
    $("#header").fadeIn(100)
  })
  
}

async function getAll() {
  await getGames()
  await getDetalis()
  displayGames()
  getId()
    
}
async function gethalf() {
  await getDetalis()
  displayDetalis()
    
}
getAll()

$(".navbar").css({"position" : "absolute" , "width" : "75%", "top" : "-80"} )

$(document).scroll(()=> {

    if ($(document).scrollTop() > $("#games").offset().top - $(".navbar").outerHeight(true) - 30) {

        $(".navbar").css({"position" : "fixed" , "top" : "0%", "width" : "75%"})
    }else{
        $(".navbar").css({"position" : "absolute" , "width" : "75%", "top" : "-80"} )
    }

})

$(".nav-link").click((e)=> {
  category = $(e.target).html().toLowerCase()
  $(e.target).addClass("active")
  $(e.target).siblings().removeClass("active")
  $(".loading-screan").removeAttr("style");
    setTimeout(() => {
      $(".loading-screan").fadeOut(500)
    }, 500);
  getAll()
})



function getId() {
  
  $(".layer").click((e)=>{
    selectedID = $(e.target).attr("id")
    gethalf()
    $(".loading-screan").removeAttr("style");
  setTimeout(() => {
    $(".loading-screan").fadeOut(500)
  }, 500);
  })
 
}



$(window).on("load", ()=>{
  setTimeout(() => {
    $(".loading-screan").fadeOut(500)
  }, 500);
})