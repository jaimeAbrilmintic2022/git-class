const API_URL = "http://localhost:8081/api/";
//const API_URL = "http://193.122.145.65:8080/api/";

function getReservation() {
  //elemento del DOM->document object model
  $.ajax({
    url: `${API_URL}Reservation/report-clients`,
    type: "GET",
    datatype: "JSON",
    headers:{
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin":"*"
    },
    success: renderReservation,
  });
  
}

function renderReservation(response) {
  const $responseContainer = document.getElementById("response");
  $responseContainer.innerHTML='';
  for (let x = 0; x < response.length; x++) {
    const row = response[x];
    $responseContainer.innerHTML += `
    <tr>
        <td>
            ${row.client.idClient}
        </td>
        <td>
            ${row.client.name}
        </td>
        <td>
            ${row.total}
        </td>
              
    </tr>
        `;
  }
  console.log(response)
}
          
getReservation();
