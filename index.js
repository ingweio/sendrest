var api = require('api-chain');
var request = require("request");
var BASE = "https://app.send.rest/api/v1/"

function del(job, next) {
    if (!(process.env.cheetahKey && process.env.cheetahToken)) return;
    var options = {
        method: 'DELETE',
        url: BASE + 'job/' + job,
        headers: {
            'Cache-Control': 'no-cache',
            'cheetah-key': process.env.cheetahKey,
            'cheetah-token': process.env.cheetahToken
        }
    };

    request(options, function(error, response, body) {
        if (error) cb(error, null);
        else if (response.statusCode != 200) cb(response.statusCode, null);
        else cb(null, body);
    });

}


function templates(next) {
    if (!(process.env.cheetahKey && process.env.cheetahToken)) return;
    var options = {
        method: 'GET',
        url: BASE + 'templates',
        headers: {
            'Cache-Control': 'no-cache',
            'cheetah-key': process.env.cheetahKey,
            'cheetah-token': process.env.cheetahToken
        }
    };

    request(options, function(error, response, body) {
        if (error) cb(error, null);
        else if (response.statusCode != 200) cb(response.statusCode, null);
        else cb(null, body);
    });
}


function email(obj, next) {
    if (!(process.env.cheetahKey && process.env.cheetahToken)) return;
    ingwe.template = obj.template;
    ingwe.subject = obj.subject;
    ingwe.params = obj.params;
    ingwe.api = obj.api;
    ingwe.medium = "mail"
    next();
}

function sms(obj, next) {
    if (!(process.env.cheetahKey && process.env.cheetahToken)) return;
    ingwe.template = obj.template;
    ingwe.subject = obj.subject;
    ingwe.params = obj.params;
    ingwe.api = obj.api;
    ingwe.medium = "sms";
    next();
}

function webhook(obj, next) {
    if (!(process.env.cheetahKey && process.env.cheetahToken)) return;
    ingwe.template = obj.template;
    ingwe.subject = obj.subject;
    ingwe.params = obj.params;
    ingwe.api = obj.api;
    ingwe.medium = "hook";
    next();
}

function log(obj, next) {
    if (!(process.env.cheetahKey && process.env.cheetahToken)) return;
    ingwe.template = obj.template;
    ingwe.subject = obj.subject;
    ingwe.params = obj.params;
    ingwe.api = obj.api;
    ingwe.medium = "log";
    next();
}

function to(to, next) {
    if (!(process.env.cheetahKey && process.env.cheetahToken)) return;
    ingwe.to = to;
    next();
}

function from(from, next) {
    if (!(process.env.cheetahKey && process.env.cheetahToken)) return;
    ingwe.from = from;
    next();
}

function future(obj, next) {
    if (!(process.env.cheetahKey && process.env.cheetahToken)) return;
    ingwe.when = obj.when;
    ingwe.dieout = obj.dieout;
    ingwe.start = obj.start;
    ingwe.now = obj.now;
    next();
}

function done(cb, next) {
    if (!(process.env.cheetahKey && process.env.cheetahToken)) return;
    var options = {
        method: 'POST',
        url: BASE + 'job',
        json: true,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            'cheetah-key': process.env.cheetahKey,
            'cheetah-token': process.env.cheetahToken
        },
        body: {
            type: ingwe.when ? "future" : "now",
            to: ingwe.to ? ingwe.to : "",
            from: ingwe.from ? ingwe.from : "",

            when: ingwe.when ? ingwe.when : "",
            start: ingwe.start ? ingwe.start : null,
            now: ingwe.now ? ingwe.now : false,
            dieout: ingwe.dieout ? ingwe.dieout : null,
            
            template: {
                name: ingwe.template ? ingwe.template : "",
                medium: ingwe.medium,
                subject: ingwe.subject ? ingwe.subject : "",
                params: ingwe.params ? ingwe.params : {},
                api: ingwe.api ? ingwe.api : null
            }
        }
    }
    request(options, function(error, response, body) {
        if(cb){
            if (error) cb(error, null);
            else if (response.statusCode != 200) cb(response.statusCode, null);
            else cb(null, body);
        }
    });

    next();
}

var ingwe = {
    delete: del,
    email: email,
    sms: sms,
    webhook: webhook,
    templates: templates,
    log: log,
    to: to,
    from: from,
    future: future,
    done: done
};

module.exports = api.create(ingwe);