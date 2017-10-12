var GetUserMediaToText = require('getusermedia-to-text')
var path = require('path')
var speechClient = new GetUserMediaToText({
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
speechClient.on('error', ()=>speechClient.start())
speechClient.on('status', console.log)
speechClient.on('listening', function (isListening) {
  isListening ? console.log('Listening!') : statusOn ? speechClient.start() : console.log('Stopped Listening!');
})
speechClient.on('data', data => {
  if (data.results[0] && data.results[0].transcript)
    console.log(data.results[0].transcript)
});

function listen() {
  speechClient.start();
  statusOn = true;
}
function stop(){
  speechClient.stop();
  statusOn = false;
}
let control1 = document.querySelector('button#start');
control1.addEventListener('click', listen);
let control2 = document.querySelector('button#stop');
control2.addEventListener('click', stop);