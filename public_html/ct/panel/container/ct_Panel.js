

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext': '/ext/src',
        'Ext.ux': '/src/ux',
        'TAKEOUT': '/src/app'
    }
});


Ext.direct.Manager.addProvider(TAKEOUT.REMOTING_API);
Ext.application({
    controllers: [
    ],
    launch: function () {
        var panel = Ext.create('TAKEOUT.view.container.Panel', {
            width: 550,
            height: 400,
            renderTo: 'render-component'
        });
    }
});

