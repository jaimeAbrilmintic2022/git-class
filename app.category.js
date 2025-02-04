let x=14
x=90
var y = 20
console.log(x+y)

function sumTwoNumbers(){
    return 4+5
}

function changeContent(){

    document.getElementById("toChange").innerHTML="cambiado desde javascript"
}

function getCategory(){
    //elemento del DOM->document object model
    const $responseContainer=document.getElementById("response");
    // $responseContainer.innerHTML='texto agregado desde javascript';
    $.ajax({
        url:"https://g389439032223da-bxtdn7v5dsb6tede.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/api/costumes",
        type:"POST",
        datatype:"JSON",
        success:function(response){
            console.log(response)
            console.log(response.items)
            for(let x=0;x<response.items.length;x++){
                const costume= response.items[x];
                $responseContainer.innerHTML+=`
                id:${costume.idcostume}
                <br>
                nombre:${costume.name} 
                <br>
                descripción:${costume.description} 
                <br>
                años:${costume.year} 
                <br>
                marca:${costume.brand} 
                <br>
                categoría:${costume.idcategory}                
                <br>
                <br>
                `;
            }
        }
    })
}

function createCategory(){
    
    let dataToSend={
        "idcostume": parseInt( $("#id").val()),
        "name":$("#name").val(),
        "brand":$("#brand").val(),
        "year":parseInt($("#year").val()),
        "description":$("#description").val(),
        "idcategory": parseInt($("#idCategory").val())
    }
    dataToSend=JSON.stringify(dataToSend);   

    const settings = {
        "url": "https://g389439032223da-bxtdn7v5dsb6tede.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/api/costumes",
        "method": "POST",        
        "headers": {
          "Content-Type": "application/json"
        },
        "data": dataToSend,        
      };
      
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });

}

function updateCategory(){
    
    let dataToSend={
        "idcostume": parseInt( $("#id").val()),
        "name":$("#name").val(),
        "brand":$("#brand").val(),
        "year":parseInt($("#year").val()),
        "description":$("#description").val(),
        "idcategory": parseInt($("#idCategory").val())
    }
    dataToSend=JSON.stringify(dataToSend);   

    const settings = {
        "url": "https://g389439032223da-bxtdn7v5dsb6tede.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/api/costumes",
        "method": "PUT",        
        "headers": {
          "Content-Type": "application/json"
        },
        "data": dataToSend,        
      };      
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });

}

function deleteCategory(){
    
    let dataToSend={
        "idcostume": parseInt( $("#id").val()),        
    }
    dataToSend=JSON.stringify(dataToSend);   

    const settings = {
        "url": "https://g389439032223da-bxtdn7v5dsb6tede.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/api/costumes",
        "method": "DELETE",        
        "headers": {
          "Content-Type": "application/json"
        },
        "data": dataToSend,        
      };      
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });

}
getCostumes()