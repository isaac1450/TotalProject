    var mbt;
    $(document).ready(function () {
        var mbta = location.href.split("?");
        history.pushState(null, null, mbta[0]);
        mbt = mbta[1];
        if(mbt == undefined)
        {location.href ="./"
    
        }
        
        $(".btn_danger1").hover(function () {
            x = $(this).children().val()
            $("input[name='question01']").each(function(i,e){
                if($(this).val()<=x)
             {
                 $(this).parent().fadeIn(2000,function(){
                     $(this).css({"background-color":"rgba(203, 181, 231)"})
                 });
             }
            });
            
        },function(){
            x = $(this).children().val()
            $("input[name='question01']").each(function(i,e){
                if($(this).val()<=x)
             {
                 $(this).parent().fadeIn(2000,function(){
                     $(this).css({"background-color":""})
                 });
             }
            });
        });
    
        $("input[name='question01']").on('click', function () {
            $("input[name='question01']").parent().removeClass("selected");
            x = $(this).val()
            $("input[name='question01']").each(function(i,e){
                if($(this).val()<=x)
             {
                 $(this).parent().addClass('selected');
                 
             }
            });
        });

        $(".btn_danger2").hover(function () {
            x = $(this).children().val()
            $("input[name='question02']").each(function(i,e){
                if($(this).val()<=x)
             {
                 $(this).parent().css({"background-color":"rgba(203, 181, 231)"});
                 
             }
            });
            
        },function(){
            x = $(this).children().val()
            $("input[name='question02']").each(function(i,e){
                if($(this).val()<=x)
             {
                $(this).parent().css({"background-color":""}).delay(500);
             }
            });
        });

        $("input[name='question02']").on('click', function () {
            $("input[name='question02']").parent().removeClass("selected");
            x = $(this).val()
            $("input[name='question02']").each(function(i,e){
                if($(this).val()<=x)
             {
                 $(this).parent().addClass('selected');
                 
             }
            });
            
            
        });
        $(".btn_danger3").hover(function () {
            x = $(this).children().val()
            $("input[name='question03']").each(function(i,e){
                if($(this).val()<=x)
             {
                 $(this).parent().css({"background-color":"rgba(203, 181, 231)"});
                 
             }
            });
            
        },function(){
            x = $(this).children().val()
            $("input[name='question03']").each(function(i,e){
                if($(this).val()<=x)
             {
                $(this).parent().css({"background-color":""}).delay(500);
             }
            });
        });
        $("input[name='question03']").on('click', function () {
            $("input[name='question03']").parent().removeClass("selected");
            x = $(this).val()
            $("input[name='question03']").each(function(i,e){
                if($(this).val()<=x)
             {
                 $(this).parent().addClass('selected');
                 
             }
            });
        });
        $(".btn_danger4").hover(function () {
            x = $(this).children().val()
            $("input[name='question04']").each(function(i,e){
                if($(this).val()<=x)
             {
                 $(this).parent().css({"background-color":"rgba(203, 181, 231)"});
                 
             }
            });
            
        },function(){
            x = $(this).children().val()
            $("input[name='question04']").each(function(i,e){
                if($(this).val()<=x)
             {
                $(this).parent().css({"background-color":""}).delay(500);
             }
            });
        });
        $("input[name='question04']").on('click', function () {
            $("input[name='question04']").parent().removeClass("selected");
            x = $(this).val()
            $("input[name='question04']").each(function(i,e){
                if($(this).val()<=x)
             {
                 $(this).parent().addClass('selected');
                 
             }
            });
        });
        $(".btn_danger5").hover(function () {
            x = $(this).children().val()
            $("input[name='question05']").each(function(i,e){
                if($(this).val()<=x)
             {
                 $(this).parent().css({"background-color":"rgba(203, 181, 231)"});
                 
             }
            });
            
        },function(){
            x = $(this).children().val()
            $("input[name='question05']").each(function(i,e){
                if($(this).val()<=x)
             {
                $(this).parent().css({"background-color":""}).delay(500);
             }
            });
        });
        $("input[name='question05']").on('click', function () {
            $("input[name='question05']").parent().removeClass("selected");
            x = $(this).val()
            $("input[name='question05']").each(function(i,e){
             if($(this).val()<=x)
             {
                 $(this).parent().addClass('selected');
                 
             }
            });
        });




    });
    function goAction() {
        var q01 = $("input[name='question01']:checked").val();

        // 선택하지 않을 때
        if (q01 == undefined) {
            Swal.fire({
                icon: 'warning',
                text: '월급대비 소비량을 선택해주세요',
            })
            $("input[name='question01']").eq(0).focus();
            return;
        }

        var q02 = $("input[name='question02']:checked").val();

        // 선택하지 않을 때
        if (q02 == undefined) {
            Swal.fire({
                icon: 'warning',
                text: '식비를 선택해주세요',
            })

            $("input[name='question02']").eq(0).focus();
            return;
        }
        var q03 = $("input[name='question03']:checked").val();

        // 선택하지 않을 때
        if (q03 == undefined) {
            Swal.fire({
                icon: 'warning',
                text: '의류비를 선택해주세요',
            })

            $("input[name='question03']").eq(0).focus();
            return;
        }
        var q04 = $("input[name='question04']:checked").val();

        // 선택하지 않을 때
        if (q04 == undefined) {
            Swal.fire({
                icon: 'warning',
                text: '통신비를 선택해주세요',
            })

            $("input[name='question04']").eq(0).focus();
            return;
        }
        var q05 = $("input[name='question05']:checked").val();

        // 선택하지 않을 때
        if (q05 == undefined) {
            Swal.fire({
                icon: 'warning',
                text: '교통비를 선택해주세요',
            })

            $("input[name='question05']").eq(0).focus();
            return;
        }
        $.ajax({
            type: "POST",
            url: "./php/sendPayPtn.php",
            timeout: 10000,
            data: ({ mbti: mbt, spend: q01, food: q02, clothes:q03,communication:q04, transport: q05 }),
            cache: false,
            dataType: "text",
            sucess: location.href = "result_test.html?mbtiresult:" + mbt


        }
        );
    };


