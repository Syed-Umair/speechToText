var GetUserMediaToText = require('getusermedia-to-text')
var path = require('path')
var s2t = new GetUserMediaToText({
  projectId: 'speechtotext-1505930986650',
  keyFilename: path.join(__dirname, 'auth.json'),
  request: {
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 44100,
      languageCode: 'en-US'
    },
    singleUtterance: false,
    interimResults: false,
    verbose: true
  }
})
var statusOn = false;
s2t.on('error', ()=>s2t.start())
s2t.on('status', console.log)
s2t.on('listening', function (isListening) {
  isListening ? console.log('Listening!') : statusOn ? s2t.start() : console.log('Stopped Listening!');
})
s2t.on('data', data => {
  if (data.results[0] && data.results[0].transcript)
    console.log(data.results[0].transcript)
});

function listen() {
  s2t.start();
  statusOn = true;
}
function stop(){
  s2t.stop();
  statusOn = false;
}
let control1 = document.querySelector('button#start');
control1.addEventListener('click', listen);
let control2 = document.querySelector('button#stop');
control2.addEventListener('click', stop);