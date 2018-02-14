https://send.rest
![Alt text](send-rest.png?raw=true "Send-Rest")

    var send = require("send-rest");

    send.email({
        template : "hackernews",
        subject: "Greetings #{name}",
        params : { "name" : "Johnatthan" }
    }).to("user@gmail.com").from("f1@company.io").done(function(err,ing){
        if(err) {
            console.log("err");
        }
        else console.log(ing);
    });

    send.email({
        template : "hackernews",
        subject: "Greetings #{name}",
        params : { "name" : "Sean" }
    }).future({
        when : "in 1 day", // send everyday
        dieout : 60, // for next 60 days
        start : "in 2 hours", // start job in 2 hours
        now : false // dont send now
    }).to("user@gmail.com").from("f1@company.io").done(function(err,ing){
        console.log(ing);
    });


#####Methods
    send.delete

    send.email.to.from.future.done
    send.email.to.from.done
    
    send.log.to.from.future.done
    send.log.to.from.done
    
    send.sms.to.from.future.done
    send.sms.to.from.done
    
    send.webhook.to.from.future.done
    send.webhook.to.from.done
    
    Email/Log/SMS/Webhook accepts following parameters
        template 
            // template name on send.rest
        subject 
            // subject 
        params 
            // parameters in subject and template
        api 
            // API in har1.2 format will be called and variables will be replaced in template

    future accepts following parameters
        when
            // array or string value, support chrono format
        dieout
            // how many times job should run
        start
            // after how much time job should start
        now
            // is sending now required