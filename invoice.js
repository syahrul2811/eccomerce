const invoiceBody = document.getElementById("invoice-body");
const invoiceTotal = document.getElementById("invoice-total");

const cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

cart.forEach((item) => {
  total += item.total;
  invoiceBody.innerHTML += `
    <tr>
      <td>${item.name}</td>
      <td>Rp ${item.price.toLocaleString()}</td>
      <td>${item.quantity}</td>
      <td>Rp ${item.total.toLocaleString()}</td>
    </tr>`;
});

invoiceTotal.textContent = `Rp ${total.toLocaleString()}`;
