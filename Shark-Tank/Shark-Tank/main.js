let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");



let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");
 


let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");


let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");
let filterPersonalshooes = document.getElementById("filter-shooes");



let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}

let mainSection = document.getElementById("data-list-wrapper");
function fetchdata() {
  fetch("http://localhost:3000/pitches")
    .then((res) => res.json())
    .then((data) => {
      productData = data;
      showdata(data);
    })
    .catch((err) => {
      showdata(err);
    });
}

fetchdata();

function showdata(data) {
  let show = data.map((el) =>
    storeData(el.id, el.image, el.title, el.founder, el.category, el.price)
  );
  mainSection.innerHTML = show.join(" ");
}

let productData = [];

function storeData(id, image, title, founder, category, price) {
  let store = `

        <div class="card" data-id="${id}">

         <a href="description.html?title= ${encodeURIComponent(title)}&founder= ${encodeURIComponent(founder)}&category= ${encodeURIComponent(title)}&price= ${encodeURIComponent(price)}&image= ${encodeURIComponent(image)}">

        
                <div class="card-img">
                  <img src="${image}" alt=""${title}">


                </div>
                </a>
                <div class="card-body">
                <div class="card-body"> 
                  <h4 class="card-title">${title}</h4>
                  <p class="card-founder">${founder}(</p>
                  <p class="class-founder">${category}</p>
                  <p class="class-category">${price}</p>
                  <a href="#" data-id="${id}" class="card-link">Edit</a>
                  <button class="card-button" data-id="${id}">Delete</button>
                </div>

              </div>
    `;

  return store;
}

pitchCreateBtn.addEventListener("click", () => {
  let product = {
    title: pitchTitleInput.value,
    image: pitchImageInput.value,
    category: pitchCategoryInput.value,
    founder: pitchfounderInput.value,
    price: pitchPriceInput.value,
  };

  fetch("http://localhost:3000/pitches", {
    method: "POST",
    headers: {
      "Content-Type": "applications/json",
    },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => fetchdata())
    .catch((err) => console.log(err));
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-button")) {
    deleteproduct(e.target.dataset.id);
  }
});

function deleteproduct(id) {
  fetch(`http://localhost:3000/pitches/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => console.log(data), alert("delete success"))
    .catch((err) => console.log(err));
}

filterFood.addEventListener("click", () => {
  let foodData = productData.filter((el) => el.category === "Food");

  console.log(foodData);
  showdata(foodData);
});

filterElectronics.addEventListener("click", () => {
  let ElectronicData = productData.filter(
    (el) => el.category === "Electronics"
  );

  console.log(ElectronicData);
  showdata(ElectronicData);

  
});

filterPersonalCare.addEventListener("click", () => {
  let careData = productData.filter((el) => el.category === "Personal-Care");
  console.log(careData);
  showdata(careData);
});

filterPersonalshooes.addEventListener("click", () => {
  let shooesData = productData.filter((el) => el.category === "shooes");
  console.log(shooesData);
  showdata(shooesData);
});

sortAtoZBtn.addEventListener("click", () => {
  let filterprice = productData.filter((el) => {
    return el.price;
  });
  let sortprice = filterprice.sort((a, b) => {
    return a.price - b.price;
  });
  showdata(sortprice);
});



sortZtoABtn.addEventListener("click", () => {
  let filterprice = productData.filter((el) => {
    return el.price;
  });
  let sortprice = filterprice.sort((a, b) => {
    return b.price - a.price;
  });
  showdata(sortprice);
});



document.addEventListener('click', (e)=>

{
    if(e.target.classList.contains("card-link"))
    {
       
        console.log(e.target.dataset.id);
        updateData(e.target.dataset.id);
    }
});

function updateData(id)
{
    fetch(`http://localhost:3000/pitches/${id}`)
    .then((res)=> res.json())
    .then((data)=>{
        
        (updatePitchIdInput.value = data.id),
        (updatePitchTitleInput.value = data.title),
        (updatePitchImageInput.value = data.image),
        (updatePitchCategoryInput.value = data.category),
        (updatePitchfounderInput.value = data.founder),
        (updatePitchPriceInput.value = data.price)
    
    })
    .catch((err)=> console.log(err));
}
updatePitchBtn.addEventListener('click',()=>{
  let updateobj = {

    id : updatePitchIdInput.value,
    title : updatePitchTitleInput.value,
    image : updatePitchImageInput.value,
    category : updatePitchCategoryInput.value,
    founder : updatePitchfounderInput.value,
    price : updatePitchPriceInput.value
    
};
console.log(updateobj)    


fetch(`http://localhost:3000/pitches/${updateobj.id}`,{
  method : 'PUT',
  headers : {

    'Content-Type' : 'application/json'

    },

    body: JSON.stringify(updateobj)
  })
  .then((res)=>res.json())
  .then((data)=>console.log(data))
  .catch((err)=>console.log(err));


})


/////////////////////////////////////////

document.addEventListener('click', (e)=>

  {
      if(e.target.classList.contains("card-link"))
      {
         
          console.log(e.target.dataset.id);
          updateOnlyData(e.target.dataset.id);
      }
  });
  
  function updateOnlyData(id)
{
      fetch(`http://localhost:3000/pitches/${id}`)
      .then((res)=> res.json())
      .then((data)=>{
          
          (updatePricePitchId.value = data.id),
          (updatePricePitchPrice.value = data.price) 
      })

      .catch((err)=> console.log(err));
  }
  updatePricePitchPriceButton.addEventListener('click',()=>{
    let updatePriceobj = {
      id : updatePricePitchId.value,
      price : updatePricePitchPrice.value
  };
  console.log(updatePriceobj)    

  fetch(`http://localhost:3000/pitches/${updatePriceobj.id}`,{
    method : 'PATCH',
    headers : { 

      'Content-Type' : 'application/json'

      },
      body: JSON.stringify(updatePriceobj)
    })
    .then((res)=>res.json())
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err));
  })



