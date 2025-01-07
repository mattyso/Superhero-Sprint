for (let elm of document.getElementsByTagName("button")) {
    elm.addEventListener("click", (ev) => {
        console.log("clicked "+elm.id);
    });
}