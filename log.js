/*
* @Author: Derek
* @Date:   2017-03-29 11:29:33
* @Last Modified by:   Derek
* @Last Modified time: 2017-03-29 12:20:22
*/
'use strict'
let log4js = require('log4js');
log4js.configure({

    appenders: [
        {
            type: 'console',
            category: "console"

        }, //控制台输出
        {
            type: "file",
            filename: './access.log',
            pattern: "_yyyy-MM-dd",
            maxLogSize: 20480,
            backups: 3,
            category: 'dateFileLog'

        }//日期文件格式
    ],
    replaceConsole: true,   //替换console.log
    levels:{
        dateFileLog: 'debug',
        console: 'debug'
    }
});


let dateFileLog = log4js.getLogger('dateFileLog');
let consoleLog = log4js.getLogger('console');
exports.logger = dateFileLog;


exports.use = function(app) {

    app.use(log4js.connectLogger((  app.get('env') === 'development'   ||  app.get('env') === 'qa') ? consoleLog : consoleLog, {level:'INFO', format:':method :url'}));
}
