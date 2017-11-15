$(document).ready(function(){
$.ajax({

            type: 'GET',
            url: 'http://127.0.0.1:8000/profesor/',
            dataType:'JSON',
            success: function (result) {
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



});

$("#id_evaluacion").change(function(){
  id={data:$(this).val()}
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
                  else{da+="<td id=\""+work[i][1]+"ch\"><a id=\"ver\" alt=\"Ver registro\">View</a></td>";da+=tdi+"<input type='number' id='"+work[i][1]+"poi' value='true'>"+tde;
                  console.log("weweq")
                  $("tr #ver").on('click',function(){
                    var mas=$(this).parent().attr("id");
                    console.log(mas);
                    var v=$("#"+work[i][1]+'poi').val();
                    if (v>0) {$(this).attr('checked', true);}else{$(this).attr('checked', false);}
                  });
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
})