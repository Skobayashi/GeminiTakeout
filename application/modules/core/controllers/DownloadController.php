<?php


class DownloadController extends \Zend_Controller_Action
{

    /**
     * CSVリストダウンロード処理
     *
     * @author suguru
     **/
    public function listcsvAction ()
    {
        // ビューのレンダリングを無効化
        $this->view->layout()->disableLayout();
        $this->_helper->viewRenderer->setNoRender();


        $request = $this->getRequest();
        $path = '/tmp/'.$request->getParam('unique').'_gemini_takeout.csv';

        if(file_exists($path)) {
            $contents  = file_get_contents($path);

            unlink($path);
            header(sprintf('Content-Disposition: attachment; filename="%s"', 'list.csv'));
            header('Content-Type: text/csv;');
            echo $contents;

        } else {
            echo 'csv file is not found!';
        }
    }
}
