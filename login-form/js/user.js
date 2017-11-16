function print(arg){
	console.log(arg);
};

function crearTr(data){
	var tri="<tr id=";
	var tdi="<td>";
	var tre="</tr>";
	var tde="</td>";
	var da="";
  if (ad=="1") {
    for (var i = 0; i < data.length; i++) {
    da+=tri+data[i].id_vo+">";
    da+=tdi+data[i].nombre+tde;
    da+=tdi+data[i].apellido+tde;
    da+=tdi+data[i].cedula+tde;
    da+=tdi+data[i].nom+tde;
    da+=tdi+data[i].ubicacion+tde;
    da+="<td id=\""+data[i].id_vo+"\"><a id=\"ver\" alt=\"Ver registro\">View</a><a id=\"edit\" alt=\"Editar registro\">Edit</a><a id=\"eliminar\" alt=\"Eliminar registro\">Clear</a></td>";
    da+=tre;
    
  }
  }else{
     for (var i = 0; i < data.length; i++) {
      da+=tri+data[i].id_vo+">";
      da+=tdi+data[i].nom+tde;
      da+=tdi+"1"+tde;
      da+=tdi+data[i].ser+tde;
      da+=tdi+data[i].fecha+tde;
      da+=tdi+data[i].ubicacion+tde;
      da+="<td id=\""+data[i].id_vo+"\"><a id=\"ver\" alt=\"Ver registro\">View</a><a id=\"edit\" alt=\"Editar registro\">Edit</a></td>";
      da+=tre;
    }
  }
	
	if(da.length>1){
    $(".table-hover").append("<tbody>"+da+"</tbody>");
  print("sd");
  
  $("tr #ver").on('click',function(){
      var mas=$(this).parent().attr("id");
    // var m=$("#"+mas).parent().attr("id");
      var d="id_vo="+mas+"&crsf=volet";
      print(d);
      print("ver registro");
    $("#c").load('../html/ver.html #ver');
    $.ajax({
            type: 'get',
            url: '../php/back.php',
            data:d,
            dataType:'JSON',
            success: function (result) {
              print(result);
                if(result.ok=="entro"){
                  print(result);
                  $("h2").append(result.row[0].nombre);
                  $("#id_nombre").append(result.row[0].nombre);
                  $("#id_apellido").append(result.row[0].apellido);
                  $("#id_cedula").append(result.row[0].cedula);
                  $("#id_sexo").append(result.row[0].sexo);
                  $("#id_direccion").append(result.row[0].dire);
                  $("#id_email").append(result.row[0].email);
                  $("#id_telefono").append(result.row[0].telefono);
                  $("#id_username").append(result.row[0].user);
                  $("#id_pass").append(result.row[0].pass);

                  $("#id_serial").append(result.vol[0].ser);
                  $("#id_evento").append(result.vol[0].nom);
                  $("#id_fecha").append(result.vol[0].fecha);
                  $("#id_ubicacion").append(result.vol[0].ubicacion);
                }   
            }
          });
  });
  
 
  }
	
};
var ad;
var id;
$(document).ready(function(){
	
  
	var da="crsf=user";
	$.ajax({

            type: 'GET',
            url: 'http://127.0.0.1:8000/works/',
            data:id,
            dataType:'JSON',
            success: function (result) {
		console.log(result,22)
                if(result.status==true){
                   var tri="<option value=\"";
                  var tre="</option>";
              
                  for (var i = 0; i < result.work.length; i++) {
                    var da="";
                    da+=tri+result.work[i][1]+"\"id=\""+result.work[i][1]+"\" >";
                    da+=result.work[i][0];
                    da+=tre;
                    $("#id_evaluacion").append(da);

                }
              }else{
                $("#id_evaluacion").remove("option")
              }
              
            },
            error: function(result){
              console.error(result);
            }
          });
  
  $("#btn-logout").click(function(){
    var d="crsf=out";
    $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:8000/logout/',
            data:d,
            dataType:'JSON',
            success: function (result) {
              print(result);
              location.href="..";
              
            }
          });

  });
	$("#user_n").click(function(){
		// if (!$("#c").children("#home")) {
      location.reload();
			// $("#c").load('../html/home.html');
			// da="crsf=user";
			// $.ajax({
			
   //          type: 'post',
   //          url: '../php/back.php',
   //          data: da,
   //          dataType:'JSON',
   //          success: function (result) {
   //              if(result.ok=="entro"){
   //              	print(result);
   //              	crearTr(result.row)
   //              	$("#user_n").html(result.row[1].nombre);
   //              	$("#user_np").html(result.row[1].nombre+" "+result.row[1].apellido);
   //              	id=result.row[1].id_us;


   //              }
              
   //          }
   //        });


		// }

	});


  //Carga html del registro de evento-Admin
  $("#evento").click(function(){
      print("Entro a evento registro");
    $("#c").load('vento.html');
    
		$("#c").on('click',"#cargar-evento",function(){
			print("ss");
      
			$.ajax({
            type: 'post',
            url: 'http://127.0.0.1:8000/prueba/',
            data:$('#resgistro-evento').serialize(),
            dataType:'JSON',
            success: function (result) {
            	print(result);
                if(result.ok==true){
                	$("h2").html("cargado exitoso");
                  $('#resgistro-evento')[0].reset();
                	


                }
              
            }
          });
		});
		}
);
});
