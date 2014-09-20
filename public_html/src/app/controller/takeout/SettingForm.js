/**
 * TAKEOUT.controller.takeout.SettingForm
 *
 * @author suguru
 **/
Ext.define('TAKEOUT.controller.takeout.SettingForm', {

    extend: 'Ext.app.Controller',

    refs: [{
        ref: 'Form', selector: 'takeout-SettingForm'
    }, {
        ref: 'Grid', selector: 'takeout-ListGrid'
    }],


    init: function () {
        var me = this;

        me.control({
            'takeout-SettingForm button[action="back"]': {
                click: function () {
                    history.back();
                }
            },

            'takeout-SettingForm button[action="submit"]': {
                click: me.submit
            }
        });
    },




    /**
     * フォーム送信処理
     *
     * @author suguru
     **/
    submit: function () {
        var me = this,
            form = me.getForm();

        if (form.getForm().isValid()) {
            var values = form.getForm().getValues(),
                grid = me.getGrid();

            if (grid) {
                // グリッドの必要なカラムを取得する
                Takeout.getColumns({
                    values: values
                }, function (response) {
                    var fields = response.fields,
                        columns = response.columns;

                    // ストアを再設定する
                    var store = grid.buildStore(fields);
                    store.proxy.extraParams.values = values;
                    grid.setValues(values);
                    grid.reconfigure(store, columns);


                    // データロード
                    grid.getStore().load();
                });
            }
        }
    }

});
