$(document).ready(function () {
    var x;
    $('.result_1').text(mbtiresult+"의 소비습관");
    $.ajax({
        type: "POST",
        url: "/php/getCard3.php",
        timeout: 10000,
        data: ({
            mbti: mbtiresult
        }),
        cache: false,
        dataType: "json",
        success: function (row) {
            x = row;
            $("._card_1").attr("src", row[0][3]);
            $(".card1_name").text(row[0][1]);
            $(".card1_company").text(row[0][2]);
            $("._card_2").attr("src", row[1][3]);
            $(".card2_company").text(row[1][2]);
            $(".card2_name").text(row[1][1]);
            $("._card_3").attr("src", row[2][3]);
            $(".card3_company").text(row[2][2]);
            $(".card3_name").text(row[2][1]);
            $(".num1").text(row[0][27]);
            $(".num2").text(row[1][27]);
            $(".num3").text(row[2][27]);
	   
            for (var i = 5; i < 27; i = i + 2) {
                if (row[0][i] == "")
                    break;
                var cardbold = "<p class='card_text_bold'>" + row[0][i] + "</p>";
                var cardtext = " <p class='card_text'>" + row[0][i + 1] + "</p><hr><br>";
                $(".card1_benefit").append(cardbold);
                $(".card1_benefit").append(cardtext);
            }
            for (var i = 5; i < 27; i = i + 2) {
                if (row[1][i] == "")
                    break;
                var cardbold = "<p class='card_text_bold'>" + row[1][i] + "</p>";
                var cardtext = " <p class='card_text'>" + row[1][i + 1] + "</p><hr><br>";
                $(".card2_benefit").append(cardbold);
                $(".card2_benefit").append(cardtext);
            }
            for (var i = 5; i < 27; i = i + 2) {
                if (row[2][i] == "") {
                    break;
                }
                var cardbold = "<p class='card_text_bold'>" + row[2][i] + "</p>";
                var cardtext = " <p class='card_text'>" + row[2][i + 1] + "</p><hr><br>";
                $(".card3_benefit").append(cardbold);
                $(".card3_benefit").append(cardtext);
            }
        }
    });


    $.ajax({
        type: "POST",
        url: "/php/getPayPtn.php",
        timeout: 10000,
        data: ({
            mbti: mbtiresult.toUpperCase()
        }),
        cache: false,
        dataType: "json",
        success: function (msg) {
            var ctx = document.getElementById('myChart2').getContext('2d');
            var jbAry = [
                [msg[2]["cl1"], msg[2]["cl2"], msg[2]["cl3"], msg[2]["cl4"]], // 의류
                [msg[3]["cm1"], msg[3]["cm2"], msg[3]["cm3"], msg[3]["cm4"]],
                [msg[4]["tr1"], msg[4]["tr2"], msg[4]["tr3"], msg[4]["tr4"]]
            ];
            //var cloth = jbAry[0][0] + jbAry[0][1] +jbAry[0][2] + jbAry[0][3];
            //var commu = jbAry[1][0] + jbAry[1][1] +jbAry[1][2] + jbAry[1][3];
            //var trans = jbAry[2][0] + jbAry[2][1] +jbAry[2][2] + jbAry[2][3];

            var data = {
                labels: ['의류', '통신', '교통'],
                datasets: [{
                        label: '의류 5만, 통신 4만, 교통 5만',
                        data: [jbAry[0][0], jbAry[1][0], jbAry[2][0]],
                        backgroundColor: [
                            '#02B0B5',
                            '#02B0B5',
                            '#02B0B5',
                        ],
                        borderWidth: 1.0,
                        borderColor: 'white'
                    },
                    {
                        label: '의류 15만, 통신 6만, 교통10만',
                        data: [jbAry[0][1], jbAry[1][1], jbAry[2][1]],
                        backgroundColor: [
                            '#F7D220',
                            '#F7D220',
                            '#F7D220',
                        ],
                        borderWidth: 1.0,
                        borderColor: 'white'
                    },
                    {
                        label: '의류 30만, 통신 8만, 교통15만',
                        data: [jbAry[0][2], jbAry[1][2], jbAry[2][2]],
                        backgroundColor: [
                            '#F85558',
                            '#F85558',
                            '#F85558',
                        ],
                        borderWidth: 1.0,
                        borderColor: 'white'
                    },
                    {
                        label: '의류 30만 이상, 통신 8만 이상, 교통15만 이상',
                        data: [jbAry[0][3], jbAry[1][3], jbAry[2][3]],
                        backgroundColor: [
                            '#2568FD',
                            '#2568FD',
                            '#2568FD',
                        ],
                        borderWidth: 1.0,
                        borderColor: 'white'
                    },
                ]
            };

            var stackedbar = new Chart(ctx, {
                type: 'horizontalBar',
                data: data,
                options: {
                    responsive: true,
                    //maintainAspectRatio: false,
                    plugins: {
                        labels: {
                            render: 'percentage',
                            fontSize: 10,
                            fontColor: '#000',
                            position: 'default',
                            outsidePadding: 40,
                            textMargin: 10
                        },
                    },
                    legend: {
                        display: false,
                    },
                    scales: {
                        xAxes: [{
                            stacked: true,
                            gridLines: {
                                display: false, 
                                drawBorder: false,
                                drawOnChartArea: false
                            },
                            ticks: {
                                display: false
                            },
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false, 
                                drawBorder: false,
                                drawOnChartArea: false
                            },
                            stacked: true,
                            barThickness: 20,
                        }]
                    }
                }
            });

            var ctx = document.getElementById('myChart');
            var data = {
                labels: [ //데이터 값
                    '30%',
                    '50%',
                    '70%',
                    '70%~'
                ],
                datasets: [{
                    label: 'My First Dataset',
                    data: [msg[0]["sp1"], msg[0]["sp2"], msg[0]["sp3"], msg[0]["sp4"]], //각각 데이터 수치
                    backgroundColor: [ //차트 색깔
                        '#17AD96',
                        '#E82663',
                        '#EE6D50',
                        '#FFC733'
                    ],
                    hoverOffset: 0
                }]
            };
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: data,
                options: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: '월급대비 소비량',
                        position: 'top',
                        fontSize: 13,
                        fontColor: '#000'
                    },
                    plugins: {
                        labels: [{
                            render: 'label',
                            fontSize: 11,
                            fontStyle: '',
                            fontColor: '#FFF'
                        }]
                    },
                }
            });

            var ctx1 = document.getElementById('myChart1');
            var data1 = {
                labels: [
                    '30만',
                    '50만',
                    '70만',
                    '70만~'
                ],
                datasets: [{
                    label: 'My First Dataset',
                    data: [msg[1]["fd1"], msg[1]["fd2"], msg[1]["fd3"], msg[1]["fd4"]],
                    backgroundColor: [
                        '#815DA4',
                        '#D5D746',
                        '#D12189',
                        '#FFC733'
                    ],
                    hoverOffset: 0
                }]
            };
            var myChart1 = new Chart(ctx1, {
                type: 'pie',
                data: data1,
                options: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: '식비',
                        position: 'top',
                        fontSize: 13,
                        fontColor: '#000'
                    },
                    plugins: {
                        labels: [{
                            render: 'label',
                            fontSize: 11,
                            fontStyle: '',
                            fontColor: '#FFF'
                        }]
                    },
                }
            });
        }
    });
    $('#heart1').click(function () {
        var like;
        if ($('#heart1').text() == "♡") {
            $('#heart1').text("♥");
            like = 1;
            $('.num1').text(parseInt($(".num1").text()) + 1);
        } else {
            $('#heart1').text("♡");
            like = 0;
            $('.num1').text(parseInt($('.num1').text()) - 1);
        }
        $.ajax({
            type: "POST",
            url: "/php/updateLike.php",
            timeout: 10000,
            data: ({
                mbti: mbtiresult,
                id: x[0][0],
                like: like
            }),
            cache: false,
            dataType: "json",
        });
    });
    $('#heart2').click(function () {
        var like;
        if ($('#heart2').text() == "♡") {
            $('#heart2').text("♥");
            like = 1;
            $('.num2').text(parseInt($(".num2").text()) + 1);
        } else {
            $('#heart2').text("♡");
            like = 0;
            $('.num2').text(parseInt($('.num2').text()) - 1);
        }
        $.ajax({
            type: "POST",
            url: "/php/updateLike.php",
            timeout: 10000,
            data: ({
                mbti: mbtiresult,
                id: x[1][0],
                like: like
            }),
            cache: false,
            dataType: "json",



        });
    });
    $('#heart3').click(function () {
        var like;
        if ($('#heart3').text() == "♡") {
            $('#heart3').text("♥");
            like = 1;
            $('.num3').text(parseInt($(".num3").text()) + 1);
        } else {
            $('#heart3').text("♡");
            like = 0;
            $('.num3').text(parseInt($('.num3').text()) - 1);
        }
        $.ajax({
            type: "POST",
            url: "/php/updateLike.php",
            timeout: 10000,
            data: ({
                mbti: mbtiresult,
                id: x[2][0],
                like: like
            }),
            cache: false,
            dataType: "json",
        });
    });
});
