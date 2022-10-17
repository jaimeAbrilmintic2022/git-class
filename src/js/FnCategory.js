const API_URL = "http://localhost:8081/api/";
//const API_URL = "http://193.122.145.65:8080/api/";

function getAllCategorys() {
  //elemento del DOM->document object model
  $.ajax({
    url: `${API_URL}Category/all`,
    type: "GET",
    datatype: "JSON",
    success: renderCategory,
  });
}

function renderCategory(response) {
  const $responseContainer = document.getElementById("response");
  $responseContainer.innerHTML = "";
  for (let x = 0; x < response.length; x++) {
    const row = response[x];
    $responseContainer.innerHTML += renderCard(
      row.name,
      row.id,
      row.description
    );
    console.log(row.id)
  }
}

function renderCard(name, id,description) {
  return `
  <div class="card">
      <h1>${name}</h1>
      <p class="price">${description}</p>
      <p>
      ${id}
      </p>
      
      <p><button onclick="renderCategoryToUpdate(${id},'${name}','${description}')">Actualizar</button></p>
      <p><button onclick="deleteCategory(${id})" >Borrar</button></p>
    </div>
  `;
  
}

function createCategory() {
  let dataToSend = {
    name: $("#name").val(), //obtengo el valor que tiene el campo de texto id="name"
    id: parseInt($("#id").val()),
    description: $("#description").val(),
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: `${API_URL}Category/save`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    alert("Category registrada correctamente");
    $("#name").val(""); //limpio el valor que tenga el campo de texto
    $("#description").val("");
    getAllCategorys();
  });
}

function updateCategory() {
  let dataToSend = {
    name: $("#name").val(),
    id: parseInt($("#id").val()),
    description: $("#description").val(),
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: `${API_URL}Category/update`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    alert("Category actualizada correctamente");
    $("#name").val()
    $("#id").val()
    $("#description").val()
    getAllCategorys();
  });
}

function renderCategoryToUpdate(id, name, description) {
  
  $("#id").val(id); //seteo el valor que tendrá el campo de texto
  $("#name").val(name);
  $("#description").val(description);    
}

function deleteCategory(id) {
  const settings = {
    url: `${API_URL}Category/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: {},
  };

  $.ajax(settings)
    .done(function (response) {
      alert("Category eliminado correctamente");
      getAllCategorys();
    })
    .fail(function (response) {
      console.log(response.responseText);
      alert("algo falló");
    });
}

getAllCategorys();