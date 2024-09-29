const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"

const ddselect = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromc = document.querySelector(".from select");
const toc = document.querySelector(".to select");
let message = document.querySelector(".display p");
const input = document.querySelector(".amount input");
console.log((input.value)*(fromc.value));

let i =0;
for (let select of ddselect){
    for(let ccode in countryList){
        let op = document.createElement("option");
        op.innerText = ccode;
        op.value = ccode;
        select.append(op);
        if (select.name === "from" && ccode === "USD"){
            op.selected="selected";
        } else if(select.name === "to" && ccode === "INR"){
            op.selected="selected";
    }}

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (country)=>{
    let img = country.parentElement.querySelector("img");
    img.src= `https://flagsapi.com/${countryList[country.value]}/flat/64.png`;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amt = document.querySelector("input");
    let amtVal = amt.value;
    if (amtVal ==="" || amtVal <1){
        amtVal=1;
        amt.value="1";
    }

    const Url1 = new Request(`${URL}${fromc.value.toLowerCase()}.json`);
    let response = await fetch(Url1);
    let data = await response.json();
    let rate = data[fromc.value.toLowerCase()][toc.value.toLowerCase()];
    console.log(rate);

    message.innerText=`${input.value} ${fromc.value} = ${((rate)*(input.value)).toFixed(2)} ${toc.value}`;

})
