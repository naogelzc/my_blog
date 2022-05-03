<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BingImage\RemoteImage;

class BingImageController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return response()->success([
          'url' => RemoteImage::getOneUrl()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $path = public_path('temp');   //设置图片缓存文件夹
        $filename = date("Ymd") . '.jpg';  //用年月日来命名新的文件名

        $siam_img = RemoteImage::getOne();
        $imgurl = RemoteImage::getOneUrl();

        $img = RemoteImage::grabImage($imgurl, $path.'/'.$filename); //读取并保存图片

        $handle = fopen( public_path()."/dat.txt", "a");    //用于存放图片信息，如果不需要保存图片的相关信息，可以把下面这些去掉。
        if ($handle){
            $copyright     = $siam_img['copyright'];    //说明
            $startdate     = $siam_img['startdate'];
            $fullstartdate = $siam_img['fullstartdate'];
            $enddate       = $siam_img['enddate'];
            $urlbase       = $siam_img['urlbase'];
            $copyrightlink = $siam_img['copyrightlink'];
            $quiz          = $siam_img['quiz'];
            $wp            = $siam_img['wp'];
            $hsh           = $siam_img['hsh'];
            $drk           = $siam_img['drk'];
            $top           = $siam_img['top'];
            $bot           = $siam_img['bot'];
            $tempArr = array("imgurl"        => $imgurl, "copyright" => $copyright, "startdate" => $startdate,
                             "fullstartdate" => $fullstartdate, "enddate" => $enddate, "urlbase" => $urlbase,
                             "copyrightlink" => $copyrightlink, "quiz" => $quiz, "wp" => $wp,
                             "hsh"           => $hsh, "drk" => $drk, "top" => $top, "bot" => $bot);   //将相关信息放进数组中
            fwrite($handle, json_encode($tempArr) ."
"); //最终以json格式保存在文本文档中
            fclose($handle);

            return response()->success([]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
