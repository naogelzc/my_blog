<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Mail;
use App\Models\Contact;

class ContactController extends Controller
{
    public function __construct(Contact $model)
    {
      $this->model = $model;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        try {
          $data = $this->validate(request(), [
              'username' => 'required',
              'email' => 'required',
              'detail' => 'required',
              'verifyCode' => 'required',
              'key' => 'required'
          ]);
        } catch (ValidationException $e) {
          // dd($e->validator->errors()->messages());
          return response()->error(500, $e->validator->errors()->messages(), '');
        }
        if (!app('captcha')->check_api($data['verifyCode'], $data['key'])){
          return response()->error(500, 'invalid varify code');
        }
        $this->model->add($data);
        Mail::raw("发件人:".$data['username'].", 邮箱:".$data['email'].", 详情:".$data['detail'],function (\Illuminate\Mail\Message $message){
          $message->subject('Blog Contact')->to('naogelzc@163.com');
        });
        return response()->success();
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
