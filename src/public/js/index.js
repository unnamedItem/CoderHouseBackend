const socket = io();

const productsFieldsKeys = ["title", "code", "price", "stock"];

socket.on("product_added", (products) => {
    let newTableBody = document.createElement("productsTableBody");
    newTableBody.id = "productsTableBody";

    products.forEach(product => {
        let tr = document.createElement("tr");
        productsFieldsKeys.forEach(key => {
            let td = document.createElement("td");
            td.innerHTML = product[key];
            tr.appendChild(td);
        });
        newTableBody.appendChild(tr);
    });

    document.getElementById("productsTableBody").replaceWith(newTableBody);
})