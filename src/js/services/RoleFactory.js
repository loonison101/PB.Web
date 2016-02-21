angular.module('pb').factory('RoleFactory', ['OidcManager', 'auth', 'store', function ( OidcManager, auth, store ) {

    var _data = {
        adminRoleName: 'SiteAdministrator'
    };

    function isAdmin () {

        return false;

        if ( !OidcManager.profile )
            return false;

        if ( !OidcManager.profile.role )
            return false;

        if ( angular.isArray(OidcManager.profile.role) ) {
            return OidcManager.profile.role.indexOf(_data.adminRoleName) > -1
        } else {
            return OidcManager.profile.role == _data.adminRoleName;
        }
    }

    function isMine ( id ) {

        //if (id != void 0)
        //console.log('ismine id', id);

        if ( isAdmin() )
            return true;
        //return true;
        //console.log('the id fro role manger is:', id);
        if ( id == void 0 )
            return false;

        //if ( OidcManager.profile.sub == id )
        if ( store.get('pbUserId') == id )
            return true;

        return false;
    }

    return {
        isAdmin: isAdmin,
        isMine: isMine
    };
}]);