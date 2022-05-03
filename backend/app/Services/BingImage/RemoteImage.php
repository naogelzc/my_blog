<?php

namespace App\Services\BingImage;

class RemoteImage
{

    public static function getOne()
    {
        $str = file_get_contents('http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1'); //读取必应api，获得相应数据
        $str = json_decode($str,true);

        return $str['images'][0];
    }


    public static function getOneUrl(): string
    {
        $image = static::getOne();
        return 'http://cn.bing.com'.$image['url'];
    }

    /**
     * 远程抓取图片并保存
     * @param $url string 图片url
     * @param $filename string 保存名称和路径
     */
    public static function grabImage(string $url, string $filename = "")
    {
        if ($url == "") return false; //如果$url地址为空，直接退出
        if ($filename == "") //如果没有指定新的文件名
        {
            $ext      = strrchr($url, ".");  //得到$url的图片格式
            $filename = date("Ymd") . $ext;  //用天月面时分秒来命名新的文件名
        }
        ob_start();         //打开输出
        readfile($url);     //输出图片文件
        $img = ob_get_contents();   //得到浏览器输出
        ob_end_clean();             //清除输出并关闭
        $size = strlen($img);       //得到图片大小
        $fp2  = @fopen($filename, "a");
        fwrite($fp2, $img);         //向当前目录写入图片文件，并重新命名
        fclose($fp2);
        return $filename;           //返回新的文件名
    }
}
