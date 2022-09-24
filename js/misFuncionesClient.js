function traerInformacion(){

    $.ajax({
        url:"https://gd4e5b039ce03e6-qzzrc7eb50ba610i.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
         console.log(respuesta)
         pintarRespuesta(respuesta.items)
         
        }
       });
       
}

function pintarRespuesta(items){

    let myTable="<table>";

    for(let i=0; i < items.length; i++){
        
        myTable+="<tr>"
        myTable+="<td>" + items[i].id+ "<td>";
        myTable+="<td>" + items[i].name+ "<td>";
        myTable+="<td>" + items[i].email+ "<td>";
        myTable+="<td>" + items[i].age+ "<td>";
        myTable+="<td> <button onclick= 'borrarElemento("+items[i].id+")'>Borrar</button>";
        myTable+="<tr>"
        
        
     }
     myTable+="</table>";
     $("#resultado").append(myTable);
}

function guardarInformacion(){

    let myData ={
        id:$("#id").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("age").val(),
             
    };

    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"https://gd4e5b039ce03e6-qzzrc7eb50ba610i.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val(""),
            $("#name").val(""),
            $("#email").val(""),
            $("#age").val(""),
            traerInformacion();
            alert("se ha guardado el dato")
        }
    });
 }

 function editarInformacion(){

    let myData ={
        id:$("#id").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
               
        
    };

    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"https://gd4e5b039ce03e6-qzzrc7eb50ba610i.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type:"PUT",
        data:dataToSend,
        datatype:"JSON",
        contentType:"application/JSON",        
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val(""),
            $("#name").val(""),
            $("#email").val(""),
            $("#age").val(""),
            traerInformacion();
            alert("se ha guardado el dato")
        }
    });
 }


 function borrarElemento(idElemento){
    
    let myData ={
        id:idElemento
    };
    
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"https://gd4e5b039ce03e6-qzzrc7eb50ba610i.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type:"DELETE",
        data:dataToSend,        
        datatype:"JSON",
        contentType:"application/JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacion();
            alert("se ha Eliminado")
        }
    });

 }

 function traerInformacion_q(){

    let myData ={
        id:$("#id_q").val(),
    };
        console.log(myData.id)
    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"https://gd4e5b039ce03e6-qzzrc7eb50ba610i.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/quadbike/quadbike",
        type:"GET",
        data:dataToSend,        
        datatype:"JSON",
        contentType:"application/JSON",
        success:function(respuesta){
            console.log(respuesta.items[0].id)
            for(let i=0; i < respuesta.items.length; i++){
                if (respuesta.items[i].id == myData.id){
                    console.log(respuesta.items)
                    let myTable="<table>";
                    myTable+="<tr>"
                    myTable+="<td>" + respuesta.items[i].brand+ "<td>";
                    myTable+="<td>" + respuesta.items[i].model+ "<td>";
                    myTable+="<td>" + respuesta.items[i].category_id+ "<td>";
                    myTable+="<td>" + respuesta.items[i].name+ "<td>";
                    myTable+="<tr>"
                    myTable+="</table>";
                    $("#resultado").append(myTable);
                    
                }
            }

        }
    });
       
}

 