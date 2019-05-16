<%= mainAppId %>.registerModule('<%= appId %>', [
    '<%= appId %>.controllers',
    '<%= appId %>.services',
    '<%= appId %>.filters',
    '<%= appId %>.directives',
    '<%= appId %>.utility', {
        files: [
            <%= mainAppId %>.getAbsolutePath('js/utility/utility.js', '<%= appId %>'),
            <%= mainAppId %>.getAbsolutePath('js/services/services.js', '<%= appId %>'),
            <%= mainAppId %>.getAbsolutePath('js/directives/directives.js', '<%= appId %>'),
            <%= mainAppId %>.getAbsolutePath('js/controllers/controllers.js', '<%= appId %>'),
            <%= mainAppId %>.getAbsolutePath('js/filters/filters.js', '<%= appId %>'),
            <%= mainAppId %>.getAbsolutePath('js/controllers/homeCtrl.js', '<%= appId %>')
        ],
        serie: true,
        cache: false
    }])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('<%= appId %>', {
                url: '/<%= appId %>',
                templateUrl: <%= mainAppId %>.getAbsolutePath('tpls/home.html', '<%= appId %>'),
                controller: '<%= appId %>.homeCtrl'
            });
    }]);
