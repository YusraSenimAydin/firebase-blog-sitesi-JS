document.addEventListener("DOMContentLoaded", function() {
    var modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);

    var makaleler= document.querySelectorAll(".collapsible");
    M.Collapsible.init(makaleler);

});