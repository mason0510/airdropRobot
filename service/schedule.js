var schedule = require('node-schedule');

// function scheduleRecurrenceRule(){
// //
// //     var rule = new schedule.RecurrenceRule();
// //     // rule.dayOfWeek = 2;
// //     // rule.month = 3;
// //     // rule.dayOfMonth = 1;
// //     // rule.hour = 1;
// //     // rule.minute = 42;
// //     rule.second = 0;
// //
// //     schedule.scheduleJob(rule, function(){
// //         console.log('scheduleRecurrenceRule:' + new Date());
// //     });
// //
// // }
// // scheduleRecurrenceRule();

function scheduleCronstyle(){
    schedule.scheduleJob('1-50 * * * * *', function(){
        console.log('scheduleCronstyle:' + new Date());
    });
}

scheduleCronstyle();