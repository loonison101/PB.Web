angular.module('pb').factory('NavigationFactory', ['$state', function ($state) {

    function MenuItem (isActive, name, uiSrefName) {
        this.isActive = isActive;
        this.name = name;
        this.uiSrefName = uiSrefName;
    }

    function setActiveByName(name){
        angular.forEach(_data.menuItems, function (item) {
            if (item.name == name)
                item.isActive = true;
            else
                item.isActive = false;
        });
    }

    function setActive(menuItem, collapsed) {
        //console.log('collapsed', collapsed);
        //collapsed = !collapsed;
        //angular.forEach(_data.menuItems, function (item) {
        //    if (item.name == menuItem.name)
        //        item.isActive = true;
        //    else
        //        item.isActive = false;
        //});
    }

    var _data = {
        menuItems: [
            new MenuItem(true, 'Home', 'home'),
            new MenuItem(false, 'Teams', 'teamsView'),
            new MenuItem(false, 'Players', 'players')
        ],
        showNav: false
    };

    setActiveByName($state.current.name);

    return {
        menuItems: _data.menuItems,
        setActive: setActive,
        showNav: _data.showNav
    }
}]);