angular.module('pb').filter('prettyDate', function () {
    return function ( input ) {
        return moment(input).startOf('minute').fromNow();
    }
});