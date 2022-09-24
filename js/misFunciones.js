
function traerInformacion(){

    $.ajax({
        url:"https://gd4e5b039ce03e6-qzzrc7eb50ba610i.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/quadbike/quadbike",
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
        myTable+="<td>  " + items[i].id+ "<td>";
        myTable+="<td>" + items[i].brand+ "<td>";
        myTable+="<td>" + items[i].model+ "<td>";
        myTable+="<td>" + items[i].category_id+ "<td>";
        myTable+="<td><a href='"+window.location.pathname+"?id="+items[i].id+"'>" + items[i].name+ "</a><td>";
        myTable+="<td> <button onclick= 'borrarElemento("+items[i].id+")'>Borrar</button>";
        myTable+="<tr>"
        
        
     }
     myTable+="</table>";
     $("#resultado").append(myTable);
}

function guardarInformacion(){

    let myData ={
        id:$("#id").val(),
        brand:$("#brand").val(),
        model:$("#model").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),
        
    };

    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"https://gd4e5b039ce03e6-qzzrc7eb50ba610i.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/quadbike/quadbike",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val(""),
            $("#brand").val(""),
            $("#model").val(""),
            $("#category_id").val(""),
            $("#name").val(""),
            traerInformacion();
            alert("se ha guardado el dato")
        }
    });
 }

 function editarInformacion(){

    let myData ={
        id:$("#id").val(),
        brand:$("#brand").val(),
        model:$("#model").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),
        
    };

    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url:"https://gd4e5b039ce03e6-qzzrc7eb50ba610i.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/quadbike/quadbike",
        type:"PUT",
        data:dataToSend,
        datatype:"JSON",
        contentType:"application/JSON",        
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val(""),
            $("#brand").val(""),
            $("#model").val(""),
            $("#category_id").val(""),
            $("#name").val(""),
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
        url:"https://gd4e5b039ce03e6-qzzrc7eb50ba610i.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/quadbike/quadbike",
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
    console.log(id)
    
  
    $.ajax({
        url:"https://gd4e5b039ce03e6-qzzrc7eb50ba610i.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/quadbike/quadbike/"+id,
        type:"GET",
        //data:dataToSend,        
        datatype:"JSON",
        contentType:"application/JSON",
        success:function(respuesta){
            
            for(let i=0; i < respuesta.items.length; i++){
                if (respuesta.items[i].id == id){
                    console.log(respuesta.items[i].id)
                    console.log(respuesta.items[i].brand)
                    console.log(respuesta.items[i].model)
                    console.log(respuesta.items[i].category_id)
                    console.log(respuesta.items[i].name)

                                       
                    $("#id").val(respuesta.items[i].id),
                    $("#brand").val(respuesta.items[i].brand),
                    $("#model").val(respuesta.items[i].model),
                    $("#category_id").val(respuesta.items[i].category_id),
                    $("#name").val(respuesta.items[i].name)
                    //traerInformacion();
                                                          
                   
                }
            }

        }
    });
       
}


