'use strict';

var generators = require('yeoman-generator');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var chalk = require('chalk');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        this.option('skip-welcome-message', {
            desc: 'Skips the welcome message',
            type: Boolean
        });

    },

    prompting: function () {
        if (!this.options['skip-welcome-message']) {
            this.log(yosay('\'Allo \'allo! Out of the box I include the base framework of umifApp to start your app.'));
        }

        var prompts = [{
            type: 'list',
            name: 'mainAppId',
            message: '请选择轻应用类型',
            choices: [{
                name: '工业平板应用',
                value: 'umifhd'
            }, {
                name: '手持PDA应用',
                value: 'umifpda'
            }, {
                name: '安卓TV应用',
                value: 'umiftv'
            }]
        }, {
            type: 'input',
            name: 'appId',
            message: '轻应用ID',
            default: 'Demo'
        }, {
            type: 'input',
            name: 'appName',
            message: '轻应用名称',
            default: '示例应用'
        }, {
            type: 'input',
            name: 'appVersion',
            message: '轻应用版本号',
            default: '1.0.0'
        }];

        return this.prompt(prompts).then(function (answers) {
            this.mainAppId = answers.mainAppId;
            this.appId = answers.appId;
            this.appName = answers.appName;
            this.appVersion = answers.appVersion;
        }.bind(this));
    },

    writing: {
        gulpfile: function () {
            this.fs.copy(
                this.templatePath('app.json'),
                this.destinationPath('app.json')
            );
        },
        styles: function () {
            this.fs.copy(
                this.templatePath('style.css'),
                this.destinationPath('css/style.css')
            );
        },
        tpls: function () {
            var appType = this.mainAppId.toLowerCase().substring(4),
                homeTplName = 'home';
            if (appType === 'tv') {
                homeTplName += 'tv';
            }
            this.fs.copyTpl(
                this.templatePath(homeTplName + '.html'),
                this.destinationPath('tpls/home.html'), {
                    appName: this.appName
                }
            );
        },
        scripts: function () {
            var appType = this.mainAppId.toLowerCase().substring(4);
            this.fs.copyTpl(
                this.templatePath('app.js'),
                this.destinationPath('js/app.js'), {
                    mainAppId: this.mainAppId,
                    appId: this.appId,
                    appType: appType.toUpperCase(),
                    servicePre: appType === 'tv' ? 'tv' : 'iman'
                }
            );
            this.fs.copyTpl(
                this.templatePath('controllers.js'),
                this.destinationPath('js/controllers/controllers.js'), {
                    appId: this.appId
                }
            );
            this.fs.copyTpl(
                this.templatePath('homeCtrl.js'),
                this.destinationPath('js/controllers/homeCtrl.js'), {
                    appId: this.appId
                }
            );
            this.fs.copyTpl(
                this.templatePath('directives.js'),
                this.destinationPath('js/directives/directives.js'), {
                    appId: this.appId
                }
            );
            this.fs.copyTpl(
                this.templatePath('filters.js'),
                this.destinationPath('js/filters/filters.js'), {
                    appId: this.appId
                }
            );
            this.fs.copyTpl(
                this.templatePath('services.js'),
                this.destinationPath('js/services/services.js'), {
                    appId: this.appId
                }
            );
            this.fs.copyTpl(
                this.templatePath('utility.js'),
                this.destinationPath('js/utility/utility.js'), {
                    appId: this.appId
                }
            );
        }
    },

    end: function () {
        var tips =
            '\n' +
            chalk.green('您的应用生成成功！') +
            '\n';

        this.log(tips);
    }
});
