const accountSid = 'AC3b5298491a56794adb339a2d377ed1a5';
const authToken = '60e7029c1cb311877561d06ebc0865ba';

const client = require('twilio')(accountSid, authToken);

client.messages.create({
    to: '+639156876676',
    from: '+14193181319',
    body: ' '+
    'Good Day! Your Lanzones Infestation Issue has been Resolved!'
})
.then((message) => console.log(message.sid));