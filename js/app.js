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