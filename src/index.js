window.addEventListener("DOMContentLoaded", () => {
    for (let elm of document.getElementsByTagName("button")) {
        elm.addEventListener("click", (ev) => {
            console.log("crack "+elm.id);
        });
    }
});