



var db = {
  notification:false,
  scaner:function() {



    cordova.plugins.barcodeScanner.scan(
      function (result) {
        if(!result.cancelled)
        {
          if(result.format == "QR_CODE")
          {
            function RetornaDataHoraAtual(){
              var dNow = new Date();
              var localdate = dNow.getDate() + (dNow.getMonth()+1) +  dNow.getFullYear() + dNow.getHours() + dNow.getMinutes();
              return localdate;
            }
            var hora = RetornaDataHoraAtual();
            navigator.notification.prompt("digite o nome do dispositivo",  function(input){

             if (input.buttonIndex == 1) {

              sd.gravar(`<nav class="navbar navbar-dark " id="`+hora+`z" style="width: 100%;"><h6 id="`+hora+`z2">`+input.input1+`</h6>
                <ul class="nav justify-content-end">
                <li class="nav-item">
                <a class="nav-link" target="_self" onclick="db.deletar('`+hora+`z')" > 
                <img src="img/lixeira.png" style="height:30px; width:30px;" ></a>
                </li>
                <li class="nav-item">

                `+result.text+` <img src="img/conectar.png" style="height:30px; width:30px;" ></a>
                </li>
                </ul>

                </nav>`);
            }
          }, 'Registro',  ['Ok','Cancelar'],   'Dispositivo'     );




          }
        }
      },
      function (error) {
        alert("Scanning failed: " + error);
      },
         {
          preferFrontCamera  : false , //  iOS e Android  
          showFlipCameraButton  : true , //  iOS e Android  
          showTorchButton  : true , //  iOS e Android  
          torchOn : true , //  Android, inicie com a tocha ligada (se disponível)  
          saveHistory : true , //  Android, salvar histórico de varredura (padrão falso)  
          prompt  : "Direcione ao codigo do dispositivo" , //  Android  
          resultDisplayDuration : 500 , //  Android, exibe o texto digitalizado para X ms. 0 suprime totalmente, padrão 1500  
          formatos  : " QR_CODE, PDF_417 " , //  padrão: todos exceto PDF_417 e RSS_EXPANDED  
          orientação  : " paisagem " , //  apenas Android (retrato | paisagem), por defeito unset por isso gira com o dispositivo  
          disableAnimations  : false , //  iOS  
          disableSuccessBeep : false //  iOS e Android  
      }

      );
  },


  deletar: function(id){


    function onConfirm(buttonIndex) {
      if (buttonIndex == 2) {
        var l = '<script>$("#'+id+'").remove();</script>';
        sd.gravar(l);
      }


    }

    navigator.notification.confirm(
    'deseja deletar registro ?', // message
     onConfirm, // callback to invoke with index of button pressed
    'Remover ',           // title
    ['Nao','Sim']     // buttonLabels

    );


  },
  conectar: function(chave, progeto,reles,alarmes){


    db.chave= chave;
    db.progeto=progeto;
    db.reles=reles;
    db.alarmes=alarmes;
    var s =`<script> db.conectar('`+chave+`', '`+progeto+`','`+reles+`','`+alarmes+`');</script>`;

    sd.gravar2(s);




    cordova.plugins.backgroundMode.overrideBackButton();

    cordova.plugins.backgroundMode.on('activate', function(){

      db.notification=true;
      cordova.plugins.autoStart.enable();
      
    });
    cordova.plugins.backgroundMode.on('deactivate', function(){

      db.notification=false;

    });





    $("#app").html('');
    $("#menu").html(`<nav class="navbar navbar-dark " style="width:100%; background: red; ">
      <img onclick="location.href='http://www.zanettiautomarketing.com.br'" src="img/logo.png" style="height:40px; width:40px;" >
      <a class="nav-link" target="_self" onclick="sd.gravar2('')" > <img src="img/voltar.png" style="height:40px; width:40px;" ></a></nav>`);

    $('body').append(`<script>var config = {
      //arduino-95757
      apiKey: "`+chave+`",
      authDomain: "`+progeto+`.firebaseapp.com",
      databaseURL: "https://`+progeto+`.firebaseio.com",
      storageBucket: "`+progeto+`.appspot.com",

    };
    firebase.initializeApp(config);


    </script>`);

    for(var i = 0 ; i<reles;i++){

      $("#app").append(`<div class="toast"  role="alert" aria-live="assertive" style="width: 60%;"   aria-atomic="true">
        <div class="toast-header"  >
        <span id="rele`+(i+1)+`"><img src="img/carregar.gif" style="height:100px; width:100px;" ></span>
        <strong class="mr-auto" id="nome`+(i+1)+`">Rele`+(i+1)+`</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true" onclick="db.renomear('`+(i+1)+`')"><img src="img/editar.png" style="height25px; width:25px;" ></span>
        </button>
        </div>
        </div>
        <br><br>`);



      $('body').append(`
        <script>
        var nome`+(i+1)+` = firebase.database().ref('nome`+(i+1)+`');
        nome`+(i+1)+`.on('value', function(snapshot) {
          let n`+(i+1)+` = snapshot.val();
          $("#nome`+(i+1)+`").html(n`+(i+1)+`);
          db.nome = n`+(i+1)+`;
        });


        var rele`+(i+1)+` = firebase.database().ref('status`+(i+1)+`');
        rele`+(i+1)+`.on('value', function(snapshot) {
          let r`+(i+1)+` = snapshot.val();
          if (r`+(i+1)+`==true) {
            rele.rele(true,`+(i+1)+`);
            if (db.notification == true) {
              cordova.plugins.notification.local.schedule({
                title: db.nome,
                text: 'ligado',
                smallIcon: 'res://calendar',
                icon: 'https://firebasestorage.googleapis.com/v0/b/arduino-95757.appspot.com/o/l1.png?alt=media&token=3c00ddb7-6948-479d-ba6e-b85d169d940d'
              });
            }
          }else{
            rele.rele(false,`+(i+1)+`);
            if (db.notification == true) {
              cordova.plugins.notification.local.schedule({
                title: db.nome,
                text: 'desligado',
                smallIcon: 'res://calendar',
                icon: 'https://firebasestorage.googleapis.com/v0/b/arduino-95757.appspot.com/o/l0.png?alt=media&token=aeb51d79-750b-4d74-a7db-1ef606eb2a44'
              });
            }
          }
        });
        </script>
        `);

    }





  },
  renomear: function(n){
   navigator.notification.prompt("digite o nome do dispositivo",  function(input){
    if (input.buttonIndex == 1) {
     firebase.database().ref('nome'+n).set(input.input1);
   }

 }, 'Registro',  ['Ok','Cancelar'],   ''     );
 },

 chave:"", 
 progeto:"",
 reles:0,
 alarmes:0,
 nome:"",

};

