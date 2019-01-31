// 框架引入
var express = require('express');
var app = express();

var Agenda = require('agenda');
var Agendash = require('agendash');
var L = require('nirvana-logger')('agenda')

// agenda初始化，并连接MongoDB
var agenda = new Agenda({db: {address: 'mongodb://localhost:27017/myNewDatabase',collection: 'agendaJobs'}});

// 定义一个测试任务
agenda.define('testJob', function (job, done) {
    try {
        L('hello',job.attrs.data, new Date())
        done()
    }catch (err) {
        done(new Error(err))
    }
})

// agenda框架启动
agenda.on('ready', function () {
    L("====>>>agenda启动成功<<<<===");
    agenda.start();
})

// Agendash UI界面
app.listen(3000);
app.use('/dash', Agendash(agenda));