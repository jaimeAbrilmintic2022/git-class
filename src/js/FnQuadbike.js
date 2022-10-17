const API_URL = "http://localhost:8081/api/";
//const API_URL = "http://193.122.145.65:8080/api/";

function getAllQuadbikes() {
  //elemento del DOM->document object model
  $.ajax({
    url: `${API_URL}Quadbike/all`,
    type: "GET",
    datatype: "JSON",
    success: renderQuadbike,
  });
}

function renderQuadbike(response) {
  const $responseContainer = document.getElementById("response");
  $responseContainer.innerHTML = "";
  for (let x = 0; x < response.length; x++) {
    const row = response[x];
    $responseContainer.innerHTML += renderCard(
      row.name,
      row.brand,
      row.year,
      row.id,
      row.description
    );
    console.log(row.id)
  }
}

function renderCard(name, brand, year, id,description) {
  return `
  <div class="card">
      <h1>${brand}</h1>
      <p class="price">${year}</p>
      <p>
      ${name}
      </p>
      <p>
      ${id}
      </p>
      <p><button onclick="renderQuadbikeToUpdate(${id},'${name}',${year},'${brand}','${description}')">Actualizar</button></p>
      <p><button onclick="deleteQuadbike(${id})" >Borrar</button></p>
    </div>
  `;
  
}

function createQuadbike() {
  let dataToSend = {
    name: $("#name").val(), //obtengo el valor que tiene el campo de texto id="name"
    brand: $("#brand").val(),
    id: parseInt($("#id").val()),
    year: $("#year").val(),
    description: $("#description").val(),
    category: {
      id: parseInt($("#category").val()),
    },
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: `${API_URL}Quadbike/save`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    alert("Quadbike registrada correctamente");
    $("#name").val(""); //limpio el valor que tenga el campo de texto
    $("#description").val("");
    $("#brand").val("");
    $("#year").val("");
    $("#category").val("");
    getAllQuadbikes();
  });
}

function updateQuadbike() {
  let dataToSend = {
    name: $("#name").val(),
    brand: $("#brand").val(),
    id: parseInt($("#id").val()),
    year: $("#year").val(),
    description: $("#description").val(),
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: `${API_URL}Quadbike/update`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    alert("Quadbike actualizada correctamente");
    $("#name").val()
    $("#brand").val(),
    $("#id").val()
    $("#year").val()
    $("#description").val()
    $("#category").val("");
    getAllQuadbikes();
  });
}

function renderQuadbikeToUpdate(id, name, year,brand,description) {
  
  $("#id").val(id); //seteo el valor que tendrá el campo de texto
  $("#name").val(name);
  $("#year").val(year);
  $("#brand").val(brand);
  $("#description").val(description);    
  $("#category").val(category);
}

function deleteQuadbike(id) {
  const settings = {
    url: `${API_URL}Quadbike/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: {},
  };

  $.ajax(settings)
    .done(function (response) {
      alert("Quadbike eliminado correctamente");
      getAllQuadbikes();
    })
    .fail(function (response) {
      console.log(response.responseText);
      alert("algo falló");
    });
}

getAllQuadbikes();