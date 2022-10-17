const API_URL = "http://localhost:8081/api/";
//const API_URL = "http://193.122.145.65:8080/api/";

function getReservation() {
  //elemento del DOM->document object model
  $.ajax({
    url: `${API_URL}Reservation/report-dates/2020-01-01/2020-12-31`,
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
            ${row.idReservation}
        </td>
        <td>
            ${row.startDate}
        </td>
        <td>
            ${row.devolutionDate}
        </td>
        <td>
            ${row.status}
        </td>
        <td>
            ${row.score}
        </td>        
    </tr>
        `;
  }
  console.log(response)
}

getReservation();
