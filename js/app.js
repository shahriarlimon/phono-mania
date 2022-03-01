const phonesContainer = document.getElementById("phones-container");
const singlePhoneDetails = document.getElementById("single-phone-details");


const loadPhones=()=>{
    const input = document.getElementById("input-field");
    const inputText = input.value;
    const error = document.getElementById("error");
    if(inputText==''){
        error.innerHTML = 'Please enter a phone name';
        input.value = '';
    }
    else{
         error.innerHTML='';
         const url=`https://openapi.programming-hero.com/api/phones?search=${inputText}`;
         fetch(url)
         .then(res=>res.json())
         .then(data=>displayPhones(data.data))
         input.value='';
    }
}

const displayPhones=phones=>{
    let totalPhones=phones.slice(0,20);
    let html ='';
    // console.log(totalPhones)
    totalPhones.forEach(phone => {
        // console.log(phone)
        html+= `
        <div class="flex flex-col items-center justify-center border border-gray rounded shadow-lg p-8">
            <img class="rounded-t-lg mb-3" width="300px" height="250px" src="${phone.image}" alt="">
            <h2 class="text-xl">Name: ${phone.phone_name}</h2>
            <h2 class="text-xl">Brand Name: ${phone.brand}</h2>
            <button class=" mt-3 px-8 py-5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold md:ml-3">Get Details</button>
       </div>
        
        `;
    });
    phonesContainer.innerHTML=html;

}