(function() {
    'use strict';

    angular
        .module('app')
        .config(translateConfig);

    /* @ngInject */
    function translateConfig(triSettingsProvider, APP_LANGUAGES) {
        var now = new Date();
        // set app name & logo (used in loader, sidemenu, footer, login pages, etc)
        triSettingsProvider.setName('FOP');
        triSettingsProvider.setCopyright('&copy;' + now.getFullYear() + ' fop.com.br');
        triSettingsProvider.setLogo('assets/images/logo.png');
        // set current version of app (shown in footer)
        triSettingsProvider.setVersion('2.3.0');

        // setup available languages in triangular
        for (var lang = APP_LANGUAGES.length - 1; lang >= 0; lang--) {
            triSettingsProvider.addLanguage({
                name: APP_LANGUAGES[lang].name,
                key: APP_LANGUAGES[lang].key
            });
        }
    }
})();
