angular.module('pb').controller('userViewDeleteTeamCtrl', ['$modal', '$state', '$stateParams', function ($modal, $state, $stateParams) {
    //var instance = $modal.open({
    //    templateUrl: 'Scripts/app/user/views/deleteTeam.html',
    //    controller: function () {

    //    }
    //});

    //instance.result.then(function (selectedItem) {

    //}, function () {
    //    console.log('closed');

    //    $state.go('userView', { id: $stateParams.id });
    //});

    var result = window.confirm('Are you sure?');
    //console.log('result: ', result);

    if (result) {
        console.log('delete it');
    } else {
        console.log('cancel');
        $state.go('userView', { id: $stateParams.id });
    }
}]);