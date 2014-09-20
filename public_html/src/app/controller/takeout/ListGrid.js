/**
 * TAKEOUT.controller.takeout.ListGrid
 *
 * @author suguru
 **/
Ext.define('TAKEOUT.controller.takeout.ListGrid', {

    extend: 'Ext.app.Controller',

    refs: [{
        ref: 'Form', selector: 'takeout-SettingForm'
    }, {
        ref: 'Grid', selector: 'takeout-ListGrid'
    }],


    init: function () {
        var me = this;

        me.control({
            'takeout-ListGrid ': {
                itemcontextmenu: function (view, record, item, index, e, opt) {
                    var menu = Ext.create('Ext.menu.Menu', {
                        items: [{
                            text: 'ダウンロード',
                            handler: function () {
                                me.downloadCsv();
                            }
                        }]
                    });

                    e.stopEvent();
                    menu.showAt(e.getXY());
                }
            }
        });
    },



    /**
     * CSVダウンロード
     *
     * @author suguru
     **/
    downloadCsv: function () {
        var me = this,
            form = me.getForm();

        var mask = new Ext.LoadMask(Ext.getBody(), {
            msg: 'waiting....'
        });

        if (form.getForm().isValid()) {
            mask.show();
            var values = form.getForm().getValues();

            Takeout.generateCsv({
                values: values
            }, function (response) {
                mask.hide();

                if (response.success) {
                    var el = Ext.get('takeout-download-container'),
                        url = '/download/listcsv/unique/'+response.unique;

                    el.createChild({
                        tag: 'iframe',
                        border: '0',
                        frameborder: '0',
                        style: 'display:none;',
                        src: url
                    });
                }
            });
        }
    }
    

});
