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
        myTable+="<td><a href='"+window.location.pathname+"?id="+items[i].id+"'>" + items[i].name+ "</a><td>";
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
function obtenerInformacionId(){

    const url = new URL(window.location.href);
    const id=url.searchParams.get('id');
    console.log(id, "hasta aca llega")
    
  
    $.ajax({
        url:"https://gd4e5b039ce03e6-qzzrc7eb50ba610i.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/"+id,
        type:"GET",
        //data:dataToSend,        
        datatype:"JSON",
        contentType:"application/JSON",
        success:function(respuesta){
            
            for(let i=0; i < respuesta.items.length; i++){
                if (respuesta.items[i].id == id){
                                                           
                    $("#id").val(respuesta.items[i].id),
                    $("#name").val(respuesta.items[i].name)
                    $("#email").val(respuesta.items[i].email),
                    $("#age").val(respuesta.items[i].age)
                    
                }
            }

        }
    });
       
}

function limpiarCampos(){

    $("#id").val(""),
    $("#name").val(""),
    $("#email").val(""),
    $("#age").val("")
    
}