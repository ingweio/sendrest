var send = require("./index");

send.email({
	template : "hackernews",
	subject: "Greetings #{name}",
	params : { "name" : "Sam" }
}).to("sample@gmail.com").from("company@domain.com").done();

send.email({
	template : "bitcoin",
	subject: "Greetings #{name}",
	params : { "name" : "John" },
	api : {
		url : "https://api.coindesk.com/v1/bpi/historical/close.json",
		method : "GET"
	}
}).to("sample@gmail.com").from("company@domain.com").done(function(){
	console.log("Done");
});


send.log({
	template : "log",
	subject: "Update Done",
	params : { "time" : "20/20/20" , "server" : "local" }
}).done(function(){
	console.log("Done");
});

send.sms({
	template : "log",
	params : { "time" : "20/20/20" , "server" : "local" }
}).future({
	when : ["in 300 seconds"],
	dieout : 2,
	start : "in 60 seconds"
}).to("+NUMBER").from("+NUMBER").done(function(){
	console.log("done");
});

send.email({
	template : "hackernews",
	subject: "Greetings #{name}",
	params : { "name" : "Neo" },
	api : {
		url : "https://api.coindesk.com/v1/bpi/historical/close.json",
		method : "GET"
	}
}).future({
	when : ["in 1 day"],
	dieout : 60,
	start : "in 2 hours"
}).to("sample@gmail.com").from("company@domain.com").done(function(){
	console.log("done");
});
