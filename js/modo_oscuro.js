const d = document;

export default function darkMode(btnDarkMode) {
    const $btnSwitch = d.querySelector(btnDarkMode).querySelector(".switch-circle");

    if (localStorage.getItem("tema") === "oscuro") {
        $btnSwitch.classList.add("switch-darkmode");
        d.body.classList.add("darkmode");
    }
    if (localStorage.getItem("tema") === "normal") {
        $btnSwitch.classList.remove("switch-darkmode");
        d.body.classList.remove("darkmode");
    }
    d.addEventListener("click", e => {
        //console.warn($btnSwitch)
        // console.log(e.target);
        if (e.target.matches(btnDarkMode) || e.target.matches(`${btnDarkMode} *`)) {
            $btnSwitch.classList.toggle("switch-darkmode");
            d.body.classList.toggle("darkmode");
        }

        if (d.body.classList.contains("darkmode")) {
            localStorage.setItem("tema", "oscuro")
        } else {
            localStorage.setItem("tema", "normal")
        }
    });
}

