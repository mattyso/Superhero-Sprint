document.addEventListener("DOMContentLoaded",() => {
    const 
        navBar = document.getElementById("navigation"),
        popup = document.getElementById("popup");

    popup.addEventListener("click",() => {
        const extended = navBar.getAttribute("data-extended") == "true";
        if (extended) {
            navBar.style = "display:none";
            navBar.setAttribute("data-extended","false");
            popup.innerHTML = "v";
        } else {
            navBar.style = "display:default";
            navBar.setAttribute("data-extended","true");
            popup.innerHTML = "^";
        }
    });
});