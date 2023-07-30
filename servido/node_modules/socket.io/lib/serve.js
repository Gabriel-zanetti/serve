
      
            alert("inicio");
          var socket = io.connect("http://192.168.1.159:8080");
          socket.on("g@g", function (data) {
        alert(data);
         
          });
           alert("fecho");
        