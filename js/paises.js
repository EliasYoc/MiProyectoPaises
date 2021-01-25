import regionFilter from "./filtrar_por_region.js";
import darkMode from "./modo_oscuro.js";

const $template = document.getElementById("card-template").content,
$fragment = document.createDocumentFragment(),
$sectionCountry = document.querySelector(".content-country");
//console.log($template)

document.addEventListener("DOMContentLoaded", (e)=>{
    getCountries();
    
})
darkMode(".switch-darkmode");


const getCountries = async()=>{
    try{
        const res = await fetch("https://restcountries.eu/rest/v2/all");
        //console.log(res);
        if(!res.ok) throw {status: res.status, statusText: res.statusText};
        const data = await res.json();
        //console.log(data);
        data.forEach(el=>{
            $template.querySelector(".bg-img img").setAttribute("src",`${el.flag}`);
            $template.querySelector(".info-country h5").textContent = el.name;
            $template.querySelector(".info-country h6").textContent = el.translations.es;
            $template.querySelectorAll("span")[0].textContent = new Intl.NumberFormat().format(el.population);
            $template.querySelectorAll("span")[1].textContent = el.region||"--";
            $template.querySelectorAll("span")[2].textContent = el.capital;
            $template.querySelector(".card").dataset.region = el.region.toLowerCase()||"desconocido";
            const $clone = document.importNode($template,true);
            $fragment.appendChild($clone);
        })
        $sectionCountry.appendChild($fragment);
        
    }catch(err){
        console.warn(`Error ${err.status}: ${err.statusText || "error de lectura"}`)
        $sectionCountry.insertAdjacentHTML("afterbegin",`<h2>Error ${err.status}: ${err.statusText || "ocurrió un error"}<h2>`)
    }
    finally{
        regionFilter();
        filterCountries();
    }
};

// Este codigo podria estar en un archivo javascript
const filterCountries = ()=>{
    const $input = document.getElementById("busqueda-pais"),
    $cardsCountries = document.querySelectorAll(".content-country .card");
    //console.log($cardsCountries);
    //console.log($titleCountries[0].textContent.toLowerCase().includes("na"));
    document.addEventListener("keyup",e=>{
        //console.log(e.target.parentNode.parentNode.querySelectorAll(".content-country .card"));
        if(e.target === $input){
            if(e.key === "Escape") e.target.value = "";
            // console.log(e.target.value.toLowerCase())
            $cardsCountries.forEach(card=>{
                let title = card.querySelector(".title").textContent.toLowerCase();
                if(!title.includes(e.target.value.toLowerCase())){
                    // card.classList.add("hide");
                    card.style.display = "none"
                }else{
                    // card.classList.remove("hide");
                    card.style.display = "block"
                }
            })
        }
    });
};