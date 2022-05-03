<?php

namespace App\Providers;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class ResponseServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
        Response::macro('success', function ($data = '', $msg = 'success', $code = 200) {
          $resData = [
              'code' => $code,
              'msg' => $msg,
              'data' => $data
          ];
          return response()->json($resData);
        });
        Response::macro('error', function ($code, $msg = '', $data = '') {
          $resData = [
              'code' => $code,
              'msg' => $msg,
              'data' => $data
          ];
          return response()->json($resData);
        });
    }
}
