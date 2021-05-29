var x;
$(document).ready(function () {
$.ajax({
            type: "POST",
            url: "/php/getCard3.php",
            timeout: 10000,
            data: ({ mbti: mbtiresult }),
            cache: false,
            dataType: "json",
           success:function(row){
		   
		   $("._card_1").attr("src",row[0][2]);
		   $(".card1_name").text(row[0][0]);
		   $(".card1_company").text(row[0][1]);
		   $("._card_2").attr("src",row[1][2]);
		   $("._card_3").attr("src",row[2][2]);
		   for (var i=4; i<26;i=i+2)
		   {	if(row[0][i] == "")
				   break;
			   var cardbold = "<p class='card_text_bold'>"+ row[0][i]+ "</p>";
			   var cardtext = " <p class='card_text'>"+ row[0][i+1]+ "</p><hr><br>";
			   $(".card1_benefit").append(cardbold);
			   $(".card1_benefit").append(cardtext);
		}
		          for (var i=4; i<26;i=i+2)
                   {    if(row[1][i] == "")
                                   break;
                           var cardbold = "<p class='card_text_bold'>"+ row[1][i]+ "</p>";
                           var cardtext = " <p class='card_text'>"+ row[1][i+1]+ "</p><hr><br>";
                           $(".card2_benefit").append(cardbold);
                           $(".card2_benefit").append(cardtext);
                }
       for (var i=4; i<26;i=i+2)
                   {    if(row[2][i]=="")
			   {
                                   break;
			   }
                           var cardbold = "<p class='card_text_bold'>"+ row[2][i]+ "</p>";
                           var cardtext = " <p class='card_text'>"+ row[2][i+1]+ "</p><hr><br>";
                           $(".card3_benefit").append(cardbold);
                           $(".card3_benefit").append(cardtext);
                }



		   
        }
} );
	$.ajax({
	type: "POST",
            url: "/php/getPayPtn.php",
            timeout: 10000,
            data: ({ mbti: mbtiresult.toUpperCase() }),
            cache: false,
            dataType: "json",
           success:function(msg){
		   console.dir( msg);
	   	console.log(msg);}
/*error:function(request,status,error){
      alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
*/
	});
})
