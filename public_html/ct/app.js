

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
    controllers: TAKEOUT.Controllers,
    launch: function () {
    }
});


