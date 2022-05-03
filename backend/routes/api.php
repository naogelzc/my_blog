<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
  'prefix' => 'front',
  'middleware' => 'throttle:60'
], function () {
  Route::resource('tag', \App\Http\Controllers\TagController::class);
  Route::resource('blog_container', \App\Http\Controllers\BlogContainerController::class);
  Route::put('blog_view_count/{id}', [\App\Http\Controllers\BlogViewCountController::class, 'update']);
  Route::resource('bing_image', \App\Http\Controllers\BingImageController::class);
  Route::resource('comment', \App\Http\Controllers\CommentController::class);
  Route::resource('comment_replay', \App\Http\Controllers\CommentReplayController::class);
  Route::resource('contact', \App\Http\Controllers\ContactController::class);
  Route::resource('captcha', \App\Http\Controllers\CaptchaController::class);
});