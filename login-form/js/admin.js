$(document).ready(function(){
$.ajax({

            type: 'GET',
            url: 'http://127.0.0.1:8000/profesor/',
            dataType:'JSON',
            success: function (result) {
                if(result.status==true){
                   var tri="<option value=\"";
                  var tre="</option>";
                  $("#user_n").html(result.name)
                  $("#user_np").html(result.name)
                  if (result.work!=null){
                    for (var i = 0; i < result.work.length; i++) {
                    var da="";
                    da+=tri+result.work[i][1]+"\"id=\""+result.work[i][1]+"\" >";
                    da+=result.work[i][0];
                    da+=tre;
                    $("#id_evaluacion").append(da);

                }
                  }
                  
              }else{
                $("#id_evaluacion").remove("option")
              }
              
            },
            error: function(result){
              console.error(result);
            }
          });



});

$("#evento").click(function(){
    $("#c").load('evento.html');
    
    $("#c").on('click',"#cargar-evento",function(){
      
      
      $.ajax({
            type: 'post',
            url: 'http://127.0.0.1:8000/prueba/',
            data:$('#resgistro-evento').serialize(),
            dataType:'JSON',
            success: function (result) {
                if(result.status==true){
                  $("h2").html("cargado exitoso");
                  $('#resgistro-evento')[0].reset();
                  


                }
              
            }
          });
    });
    });
$("#user_n").click(function(){
      location.reload();
      

  });
 $("#btn-logout").click(function(){
    var d="crsf=out";
    $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:8000/logout/',
            data:d,
            dataType:'JSON',
            success: function (result) {
              
              location.href="index.html";
              
            }
          });

  });

$("#id_evaluacion").change(function(){
  $(".table-hover").html(" ")
  id={data:$(this).val()}
  console.log(id)
  $.ajax({

            type: 'GET',
            url: 'http://127.0.0.1:8000/profesor/',
            data:id,
            dataType:'JSON',
            success: function (result) {
                if(result.status==true){
                  console.log(result)
                  var tri="<tr id=";
                  var tdi="<td>";
                  var tre="</tr>";
                  var tde="</td>";
                  var da="";
                  var work=result.work
                  for (var i = 0; i <work.length; i++) {
                  da+=tri+work[i][1]+">";
                  da+=tdi+work[i][0]+tde;
                  da+=tdi+work[i][2]+tde;
                  da+=tdi+work[i][1]+tde;
                  da+=tdi+work[i][3]+tde;
                  da+=tdi+"<a href='"+work[i][4]+"'>"+work[i][4]+"</a>"+tde;
                  if (work[i][5]==true) {da+=tdi+work[i][5]+tde;da+=tdi+work[i][6]+tde;}
                  else{da+="<td  id=\""+work[i][1]+"ch\"><a onclick=\"send("+work[i][1]+")\" id=\"ver\" alt=\"Ver registro\">View</a></td>";da+=tdi+"<input type='number' id='"+work[i][1]+"poi' value='true'>"+tde;
                  console.log("weweq")
                  // $("tr #ver").on('click',function(){
                  //   var mas=$(this).parent().attr("id");
                  //   console.log(mas);
                  //   var v=$("#"+work[i][1]+'poi').val();
                  //   if (v>0) {$(this).attr('checked', true);}else{$(this).attr('checked', false);}
                  // });
                }
                  
                  
                  // da+="<td id=\""+work[i].id_vo+"\"><a id=\"ver\" alt=\"Ver registro\">View</a><a id=\"edit\" alt=\"Editar registro\">Edit</a><a id=\"eliminar\" alt=\"Eliminar registro\">Clear</a></td>";
                  da+=tre;
                }
                $(".table-hover").append("<tbody>"+da+"</tbody>");
              }
              
            },
            error: function(result){
              console.error(result);
            }
          });
  // $("tr #ver").on('click',function(){
  //     var mas=$(this).parent().attr("id");
  //   // var m=$("#"+mas).parent().attr("id");
  //     var d="id_vo="+mas+"&crsf=volet";
  //     console.log(d);
  //     console.log("ver registro");
  //   // $.ajax({
  //   //         type: 'post',
  //   //         url: 'http://127.0.0.1:8000/check/',
  //   //         data:d,
  //   //         dataType:'JSON',
  //   //         success: function (result) {
  //   //           print(result);
  //   //             if(result.status==true){
                 
  //   //             }   
  //   //         }
  //   //       });
  // });
  
})
function send(argument) {
  console.log(argument)
  var v=$("#"+argument+'poi').val();
  console.log(v)
  if (v>0){
    d={
      id:argument,
      point:v
    }
    console.log(d,"sdad")
      $.ajax({
            type: 'post',
            url: 'http://127.0.0.1:8000/check/',
            data:d,
            dataType:'JSON',
            success: function (result) {
              print(result);
                if(result.status==true){
                 var v=$("#"+argument+'ch').html("true");
                }   
            }
        });
    }
    
  
}