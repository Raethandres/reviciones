$(document).ready(function(){
$.ajax({

            type: 'GET',
            url: 'http://127.0.0.1:8000/teach/',
            dataType:'JSON',
            success: function (result) {
                if(result.status==true){
                  console.log(result)
                  for (var i = 0; i < result.profesor.length; i++) {
                    console.log(result.profesor[i])
                  }
                  var tri="<option value=\"";
                  var tre="</option>";
              
                  for (var i = 0; i < result.profesor.length; i++) {
                    var da="";
                    da+=tri+result.profesor[i][1]+"\"id=\""+result.profesor[i][1]+"\" >";
                    da+=result.profesor[i][0];
                    da+=tre;
                    $("#id_profesor").append(da);
                    
              }

                }
              
            },
            error: function(result){
              console.error(result);
            }
          });



});

max=0
$("#id_evaluacion").change(function(){
dat={
  d:$("#id_evaluacion").val()
}
  $.ajax({

            type: 'POST',
            url: 'http://127.0.0.1:8000/works/',
            data:dat,
            dataType:'JSON',
            success: function (result) {
                if(result.status==true){
                   max=result.max

              
              }
              
            },
            error: function(result){
              console.error(result);
            }
          });

  });
$("#id_profesor").change(function(){
  console.log($(this).val())
  id={data:$(this).val()}
  $.ajax({

            type: 'GET',
            url: 'http://127.0.0.1:8000/works/',
            data:id,
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
})
cantidad=0
$("#mas").click(function(){
  if (cantidad<max) {
    cantidad++
    console.log("WW")
    data='<input type="text" name="name'+cantidad+'" id="id_name" maxlength="20" placeholder="name" class="col-6 arreglos "> <input type="text" name="surname'+cantidad+'" id="id_surname" maxlength="20" placeholder="surname" class="col-6 arreglos "><input type="number" name="identity'+cantidad+'" id="id_identity" maxlength="20" placeholder="C.I" class="col-6 arreglos ">'
    $("#vole").append(data)
  }
 

});

$("#subir").click(function(){
  console.log($("form").serialize())
  $.ajax({

            type: 'POST',
            url: 'http://127.0.0.1:8000/salum/',
            data:$("form").serialize(),
            dataType:'JSON',
            success: function (result) {
                if(result.status==true){
                  console.log(result);
                  location.reload();

                }
              
            },
            error: function(result){
              console.error(result);
            }
          });

});
$("#sum").click(function(){
   console.log($('#ll').serialize(),"w");
   d={
    user:$('#user').val(),
    pw:$('#password').val()
   };
   console.log(d);
			$.ajax({

            type: 'POST',
            url: 'http://127.0.0.1:8000/login/',
            data: d,
            dataType:'JSON',
            success: function (result) {
                if(result.status==true){
                	console.log(result);
                  console.log("sige");
                  location.href="admin.html"

                }
              
            },
            error: function(result){
              console.error(result);
            }
          });
		});

