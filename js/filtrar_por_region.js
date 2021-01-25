const d = document;

export default function regionFilter(){
    const $countryCards = d.querySelectorAll(".content-country .card");
    //console.log($countryCards)
    d.addEventListener("click", e=>{
        //console.log(e.target.value)
        if(e.target.matches("#region")){
            $countryCards.forEach(card=>{
                if(!e.target.value.includes(card.dataset.region.toLowerCase())){
                    card.style.display = "none";
                }else{
                    card.style.display = "block";
                }
                if(e.target.value === "default"){
                    card.style.display = "block";
                }
            })
        }
    })
}