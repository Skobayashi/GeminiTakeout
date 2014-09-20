<?php


class IndexController extends \Zend_Controller_Action
{

    public function indexAction ()
    {
        // クライアントセッション情報を削除する
        if (isset($_SESSION['client'])) {
            unset($_SESSION['client']);
        }
    }



    public function settingAction ()
    {
        // クライアント情報をセッションに保存する
        $request = $this->getRequest();
        $client  = $request->getParam('client');
        $_SESSION['client'] = $client;
    }
}
