<?php


namespace Takeout\Factory;


/**
 * Modelクラス群
 *
 * @author app2641
 **/
use Takeout\Model\IndexGroupModel;


/**
 * Queryクラス群
 *
 * @author app2641
 **/
use Takeout\Model\Query\IndexGroupQuery;


/**
 * Columnクラス群
 *
 * @author app2641
 **/
use Takeout\Model\Column\IndexGroupColumn;

class ModelFactory extends AbstractFactory
{
    
    /////////////////////
    // Model
    /////////////////////
    
    public function buildIndexGroupModel ()
    {
        return new IndexGroupModel;
    }
    



    /////////////////////
    // Query
    /////////////////////

    public function buildIndexGroupQuery ()
    {
        return new IndexGroupQuery;
    }
    



    /////////////////////
    // Column
    /////////////////////

    public function buildIndexGroupColumn ()
    {
        return new IndexGroupColumn;
    }
    
}
