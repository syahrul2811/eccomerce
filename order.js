document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartBody = document.getElementById("cart-body");
  const totalPriceElement = document.getElementById("total-price");
  const placeOrderButton = document.getElementById("place-order");
  const sendWhatsAppButton = document.getElementById("send-whatsapp");
  let cart = [];
  let totalPrice = 0;

  // Fungsi untuk menambah item ke keranjang
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const name = this.dataset.name;
      const price = parseInt(this.dataset.price);
      addToCart(name, price);
    });
  });

  // Fungsi untuk menambah item ke keranjang
  function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  }

  // Fungsi untuk memperbarui tampilan keranjang
  function updateCart() {
    cartBody.innerHTML = "";
    totalPrice = 0;

    if (cart.length === 0) {
      const row = document.createElement("tr");
      row.classList.add("empty-cart");
      row.innerHTML = "<td colspan='4'>Keranjang masih kosong.</td>";
      cartBody.appendChild(row);
      placeOrderButton.disabled = true;
      sendWhatsAppButton.style.display = "none";
    } else {
      cart.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.name}</td>
          <td>Rp ${item.price.toLocaleString()}</td>
          <td>${item.quantity}</td>
          <td>Rp ${(item.price * item.quantity).toLocaleString()}</td>
        `;
        cartBody.appendChild(row);
        totalPrice += item.price * item.quantity;
      });
      totalPriceElement.innerText = `Rp ${totalPrice.toLocaleString()}`;
      placeOrderButton.disabled = false;
      sendWhatsAppButton.style.display = "inline-block";
    }
  }

  // Fungsi untuk mengirimkan invoice ke WhatsApp
  sendWhatsAppButton.addEventListener("click", function () {
    const orderDetails = cart.map((item) => `${item.name} x ${item.quantity} - Rp ${(item.price * item.quantity).toLocaleString()}`).join("\n");

    const paymentMethod = document.getElementById("payment-method").value;
    const shippingMethod = document.getElementById("shipping-method").value;

    const message = `*Invoice Pesanan Kopi*\n\n${orderDetails}\n\nTotal Bayar: Rp ${totalPrice.toLocaleString()}\nMetode Pembayaran: ${paymentMethod}\nMetode Pengiriman: ${shippingMethod}`;
    const phoneNumber = "6282111077028"; // Ganti dengan nomor WhatsApp Anda atau pelanggan
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  });
});
// Ambil semua tombol 'Tambah ke Keranjang'
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Ambil elemen yang menampilkan keranjang
const cartBody = document.getElementById("cart-body");
const totalPriceElement = document.getElementById("total-price");
const placeOrderButton = document.getElementById("place-order");
const sendWhatsappButton = document.getElementById("send-whatsapp");

// Array untuk menyimpan barang yang ada di keranjang
let cart = [];

// Fungsi untuk menambahkan item ke keranjang
addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);

    // Cek apakah item sudah ada di keranjang
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1; // Jika ada, tambah jumlahnya
    } else {
      cart.push({ name, price, quantity: 1 }); // Jika tidak ada, tambahkan item baru
    }

    updateCart(); // Perbarui tampilan keranjang
  });
});

// Fungsi untuk memperbarui tampilan keranjang
function updateCart() {
  // Clear keranjang saat ini
  cartBody.innerHTML = "";

  let totalPrice = 0;

  // Menampilkan setiap item di keranjang
  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>Rp ${item.price.toLocaleString()}</td>
      <td>${item.quantity}</td>
      <td>Rp ${(item.price * item.quantity).toLocaleString()}</td>
    `;
    cartBody.appendChild(row);
    totalPrice += item.price * item.quantity;
  });

  // Jika keranjang kosong, tampilkan pesan
  if (cart.length === 0) {
    cartBody.innerHTML = '<tr><td colspan="4" class="empty-cart">Keranjang masih kosong.</td></tr>';
  }

  // Perbarui total harga
  totalPriceElement.innerText = `Rp ${totalPrice.toLocaleString()}`;

  // Aktifkan tombol "Pesan Sekarang" jika ada barang di keranjang
  if (cart.length > 0) {
    placeOrderButton.disabled = false;
    sendWhatsappButton.style.display = "inline-block";
  } else {
    placeOrderButton.disabled = true;
    sendWhatsappButton.style.display = "none";
  }
}
document.getElementById("apply-filter").addEventListener("click", function () {
  const location = document.getElementById("location").value.toLowerCase();
  const price = document.getElementById("price").value.toLowerCase();
  const type = document.getElementById("type").value.toLowerCase();

  const items = document.querySelectorAll(".menu-item");

  items.forEach((item) => {
    const itemLocation = item.getAttribute("data-location") || "all";
    const itemPrice = parseInt(item.getAttribute("data-price"));
    const itemType = item.getAttribute("data-type") || "all";

    let isVisible = true;

    // Filter lokasi
    if (location !== "all" && itemLocation !== location) {
      isVisible = false;
    }

    // Filter harga
    if ((price === "low" && itemPrice >= 50000) || (price === "mid" && (itemPrice < 50000 || itemPrice > 100000)) || (price === "high" && itemPrice <= 100000)) {
      isVisible = false;
    }

    // Filter jenis
    if (type !== "all" && itemType !== type) {
      isVisible = false;
    }

    // Tampilkan atau sembunyikan item
    item.style.display = isVisible ? "block" : "none";
  });
});
