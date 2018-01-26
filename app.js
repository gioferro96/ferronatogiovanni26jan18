
const express = require('express'),
    bodyParser = require('body-parser');

const app = express();
const checker = require('./checker.js');
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 5000));




// a useless function that returns a fixed object. you can use it, if you want, for testing purposes
app.get('/count',function (req, res) {
    res.json({count: 3})
});
app.post('/check', (req,res)=>{
	let url = req.body.url;
	let invParam = req.body.invocationParameters;
	let expRes = req.body.expectedResultData;
	let expStatus = req.body.expectedResultStatus;
	console.log("url to check: "+url);
	const risp = checker(url,invParam,expRes,expStatus);
	risp.then(a => {
		console.log("done fetching");
		res.json(a);
	})
	.catch(error => {
		//handle errors thrown in the previous .then
        console.log(error);
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
