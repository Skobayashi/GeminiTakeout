
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext': '/ext/src',
        'Ext.ux': '/src/ux',
        'TAKEOUT': '/src/app'
    }
});


Ext.application({
    controllers: TAKEOUT.Controllers,
    launch: function () {

        if (Ext.get('database-selector')) {
            // Database選択コンボボックス表示
            Ext.create('TAKEOUT.view.menu.DatabaseSelector', {
                renderTo: 'database-selector'
            });
        
        } else {
            // テイクアウト
            Ext.create('TAKEOUT.view.takeout.Panel', {
                renderTo: 'takeout-container'
            });
        }
    }
});


