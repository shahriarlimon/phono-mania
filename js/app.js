const phonesContainer = document.getElementById("phones-container");
const singlePhoneDetails = document.getElementById("single-phone-details");


const loadPhones=()=>{
    const input = document.getElementById("input-field");
    const inputText = input.value;
    const error = document.getElementById("error");
    if(inputText==''){
        error.innerHTML = 'Please enter a phone name';
        input.value = '';
        phonesContainer.innerHTML='';
    }
    else{
         phonesContainer.innerHTML='';
         error.innerHTML='';
         const url=`https://openapi.programming-hero.com/api/phones?search=${inputText}`;
         fetch(url)
         .then(res=>res.json())
         .then(data=>displayPhones(data))
         input.value='';
    }
}

const displayPhones=phoneData=>{
    const phones=phoneData.data;
    let totalPhones=phones.slice(0,20);
    let html ='';
      if(phoneData.status){
        totalPhones.forEach(phone => {
            html+= `
            <div class="flex flex-col items-center justify-center border border-gray rounded shadow-lg p-8">
                <img class="rounded-t-lg mb-3" width="300px" height="250px" src="${phone.image}" alt="">
                <h2 class="text-xl">Name: ${phone.phone_name}</h2>
                <h2 class="text-xl">Brand Name: ${phone.brand}</h2>
                <button onclick="loadSinglePhoneDetails('${phone.slug}')" class=" mt-3 px-8 py-5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold md:ml-3">Get Details</button>
           </div>
            
            `;
        });
      }else{
          html=`
          <div class="col-span-3"><p class="text-2xl font-bold text-red-800 text-center"> Sorry!No result found</p></div>
          `
      }
    phonesContainer.innerHTML=html;
}

const loadSinglePhoneDetails=id=>{
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    // console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(data=>displaySinglePhoneDetails(data))
}

const displaySinglePhoneDetails=features=>{
    singlePhoneDetails.style.display='block';
    let html=`
     <div class="relative ">
        <button onclick='removeBtn()' class="flex justify-end">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </button>
        </div>
    <div class="flex flex-col md:flex-row items-center justify-center md:justify-between shadow-lg p-8">
        <div>
        <img class="rounded-t-lg mb-2" width="400px" height="300px" src="${features.data.image}" alt="">
        <h2 class="text-xl">Release Date: ${features.data.releaseDate}</h2>
        </div>
        <div class="md:mr-24 md:ml-5 mt-5 md:mt-0">
            <h2 class="text-xl">Name: ${features.data.name}</h2>
            <h2 class="text-xl">Brand: ${features.data.brand}</h2>
            <h2 class="text-xl">Storage: ${features.data.mainFeatures.storage}</h2>
            <h2 class="text-xl">Display Size: ${features.data.mainFeatures.displaySize}</h2>
            <h2 class="text-xl">Chipset: ${features.data.mainFeatures.chipSet}</h2>
            <h2 class="text-xl">Memory: ${features.data.mainFeatures.memory}</h2>
        </div>
    </div>


    `;
    singlePhoneDetails.innerHTML=html;
}

const removeBtn=()=>{
    singlePhoneDetails.style.display='none';
}