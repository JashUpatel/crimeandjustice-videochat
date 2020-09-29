navigator.webkitGetUserMedia({video: true, audio: true}, function(stream){
    var Peer = require('simple-peer')
    var peer = new Peer({
      initiator: location.hash === '#init',
      trickle: false,
      stream: stream
    })

    peer.on('signal', function(data){
      document.getElementById('yourid').value = JSON.stringify(data)

    })

    document.getElementById('connect').addEventListener('click', function(){
      var otherid = JSON.parse(document.getElementById('otherid').value)
      peer.signal(otherid)})

    document.getElementById('send').addEventListener('click',function(){

      var yourmessage = document.getElementById('yourmessage').value
      peer.send(yourmessage)
      //yourmessage=""

    })

    peer.on('data', function(data){
      document.getElementById('message').textContent += data +'\n'
    })

    peer.on('stream', function(stream){
      var video= document.createElement('video');
      var divv = document.getElementById("vid");
      // var tbid= document.getElementById('myTable').getElementsByTagName('tbody')[0];
      // var newRow   = tableRef.insertRow();
      // var newCell  = newRow.insertCell(0);
      // //var newText  = document.createTextNode('New row');
       divv.appendChild(video);



      //document.body.appendChild(video);
      //divv.innerHTML+=video;
      video.srcObject=stream;
      video.play()
    })

}, function(err){
  console.error(err)
})
