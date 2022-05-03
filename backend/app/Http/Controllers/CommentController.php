<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CommentController extends BaseController
{
    public function __construct(Comment $model)
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
        $query    = request()->query('query', '');
        $pageSize = request()->query('size', 100);
        $blog_id  = request()->query('blog_container_id');
        $list = $this->model->index($query, $pageSize, $blog_id);
        return response()->success($list->toArray());
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
        try {
          $data = $this->validate(request(), [
              'blog_container_id' => 'required',
              'comment'           => 'required',
              'osName'            => 'required',
              'osVersion'         => 'required',
              'topic_title'       => 'required',
          ]);
      } catch (ValidationException $e) {
          return response()->error(500, $e->validator->errors(), 'error');
      }
      $data = $request->all();
      $this->model->store($data);
      return response()->success([]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
