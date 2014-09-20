

Ext.ns('TAKEOUT');

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext': '/ext/src',
        'Ext.ux': '/src/ux',
        'TAKEOUT': '/src/auth'
    }
});


// Ext.direct.Providerの設定
Ext.direct.Manager.addProvider(TAKEOUT.REMOTING_API);

Ext.application({
    controllers: TAKEOUT.Controllers,
    launch: function () {
        // Elがあるかどうか
        if (Ext.get('auth-login-container')) {
        }
    }
});

