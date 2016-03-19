angular.module('pb').factory('RoleFactory', ['auth', 'store', function ( auth, store ) {

    var _data = {
        adminRoleName: 'SiteAdmin'
    };

    function isAdmin () {

        if ( !auth.profile ) return false;
        if ( !auth.profile.user_metadata ) return false;
        if ( !angular.isArray(auth.profile.user_metadata.roles) ) return false;

        return auth.profile.user_metadata.roles.indexOf(_data.adminRoleName) > -1;
    }

    function isMine ( id ) {

        if ( isAdmin() )
            return true;

        if ( id == void 0 )
            return false;

        if ( store.get('pbUserId') == id )
            return true;

        return false;
    }

    return {
        isAdmin: isAdmin,
        isMine: isMine
    };
}]);