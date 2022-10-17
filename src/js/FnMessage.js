const API_URL = "http://localhost:8081/api/";
//const API_URL = "http://150.136.244.240:8080/api/";

function getMessage() {
  //elemento del DOM->document object model
  $.ajax({
    url: `${API_URL}Message/all`,
    type: "GET",
    datatype: "JSON",
    success: renderMessage,
  });
}

function renderMessage(response) {
  const $responseContainer = document.getElementById("response");
  $responseContainer.innerHTML = "";
  for (let x = 0; x < response.length; x++) {
    const row = response[x];
    $responseContainer.innerHTML += renderCard(
      row.idMessage,
      row.messageText,
      row.client.idClient,
      row.quadbike.id
    );
  }
}

function renderCard(id, messageText, client, quadbike) {
 
  return `
  <div class="card">
      <h1>${messageText}</h1>
      <p>
       idClient: ${client}
      </p>
      <p>
      idQuadbike: ${quadbike}
      </p>
      <p><button onclick="renderMessageToUpdate(${id},'${messageText}',${client}, ${quadbike})">Actualizar</button></p>
      <p> <button onclick="deleteMessage(${id})">Eliminar</button></p>
    </div>
  `;
}

/*function renderMessage(response) {
  const $responseContainer = document.getElementById("response");
  $responseContainer.innerHTML='';
  for (let x = 0; x < response.length; x++) {
    const row = response[x];
    console.log(response)
    $responseContainer.innerHTML += `
    <tr>
        <td>
            ${row.idMessage}
        </td>
        <td>
            ${row.messageText}
        </td>
        <td>
            ${row.client.idClient}
        </td>
        <td>
            ${row.quadbike.id}
        </td>
        <td>
            <button onclick="renderMessageToUpdate(${row.idMessage},'${row.messageText}',${row.client?.idClient}, ${row.quadbike?.id})">Actualizar</button>
        </td>
        <td>
            <button onclick="deleteMessage(${row.idMessage})">Eliminar</button>
        </td>
    </tr>
        `;
  }
}*/

function createMessage() {
  let dataToSend = {
    messageText: $("#messageText").val(),
    client: {
      idClient: parseInt($("#client").val()),
    },
    quadbike: {
      id: parseInt($("#quadbike").val()),
    },
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: `${API_URL}Message/save`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    alert("Mensage registrado correctamente");
    $("#messageText").val("");
    $("#client").val("");
    $("#quadbike").val("");

    getMessage()
  });
}

function updateMessage() {
  let dataToSend = {
    messageText: $("#messageText").val(),
    client: {
      idClient: parseInt($("#client").val()),
    },
    quadbike: {
      id: parseInt($("#quadbike").val()),
    },
    idMessage:parseInt($("#idMessage").val())
   
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: `${API_URL}Message/update`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    alert("Mensage actualizado correctamente");
    $("#idMessage").val("");
    $("#messageText").val("");
    $("#client").val("");
    $("#quadbike").val("");
    getMessage()
  });
}

function renderMessageToUpdate(idMessage, messageText, client, quadbike) {
  $("#idMessage").val(idMessage);
  $("#messageText").val(messageText);
  $("#client").val(client);
  $("#quadbike").val(quadbike);
}

function deleteMessage(idMessage) {
  const settings = {
    url: `${API_URL}Message/${idMessage}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: {},
  };

  $.ajax(settings).done(function (response) {
    alert("Mensaje eliminado correctamente");
    getMessage()
  });
}

getMessage();