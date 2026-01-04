const BASE_URL = "https://farm-app-backend-2.onrender.com";

/* LOGIN */
function login() {
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;

  if (!name) {
    alert("Enter name");
    return;
  }

  localStorage.setItem("name", name);
  localStorage.setItem("role", role);

  if (role === "farmer") window.location.href = "farmer.html";
  if (role === "vendor") window.location.href = "vendor.html";
  if (role === "community") window.location.href = "community.html";
}

/* ADD FARMER */
function addFarmer() {
  fetch(BASE_URL + "/farmer/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: localStorage.getItem("name"),
      location: document.getElementById("location").value,
      crops: [document.getElementById("crop").value]
    })
  })
  .then(res => res.text())
  .then(msg => alert(msg));
}

/* LOAD FARMERS */
function loadFarmers() {
  fetch(BASE_URL + "/farmer/all")
    .then(res => res.json())
    .then(data => {
      let div = document.getElementById("farmers");
      div.innerHTML = "";

      data.forEach(f => {
        div.innerHTML += `
          <div class="card">
            <b>${f.name}</b><br>
            Location: ${f.location}<br>
            Crops: ${f.crops.join(", ")}
          </div>
        `;
      });
    });
}
