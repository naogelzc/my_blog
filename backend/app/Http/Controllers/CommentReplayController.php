<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

use \App\Models\Comment;
use \App\Models\CommentReply;

class CommentReplayController extends BaseController
{
    public function __construct(CommentReply $model)
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
              'blog_container_id' => 'required',
          ]);
      } catch (ValidationException $e) {
          // dd($e->validator->errors()->messages());
          return response()->error(500, $e->validator->errors()->messages()['blog_container_id'][0], '');
      }
      $list = $this->model->reply($data['blog_container_id']);
      return response()->success(['list' => $list]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request 
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      try {
          $data = $this->validate(request(), [
              'comment_id'        => 'required',
              'comment'           => 'required',
              'osName'            => 'required',
              'osVersion'         => 'required',
              'topic_title'       => 'required',
              'blog_container_id' => 'required',
          ]);
      } catch (ValidationException $e) {
          return $this->error(500, [
              'valida' => $e->validator->errors()
          ], 'error');
      }

      $data = $request->all();
      $this->model->add($data);
      return response()->success([]);
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
