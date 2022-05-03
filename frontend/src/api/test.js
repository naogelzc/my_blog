import request from '@/utils/request'

const url = {
  getTag: '/front/tag',
  categories: '/front/blog_container',
  viewCount: '/front/blog_view_count',
  comment: '/front/comment',
  commentReply: '/front/comment_replay',
  getImage: '/front/bing_image',
  contact: '/front/contact',
  captcha: '/front/captcha',
}

export function getTag() {
  return request({
    url: url.getTag,
    method: 'get',
  })
}

export function categories(params) {
  return request({
    url: url.categories,
    method: 'get',
    params,
  })
}

export function viewCount(params) {
  return request({
    url: url.viewCount,
    method: 'put',
    params,
  })
}

export function getComment(params) {
  return request({
    url: url.comment,
    method: 'get',
    params,
  })
}

export function postComment(data) {
  return request({
    url: url.comment,
    method: 'post',
    data,
  })
}

export function getCommentReply(params) {
  return request({
    url: url.commentReply,
    method: 'get',
    params,
  })
}

export function postCommentReply(data) {
  return request({
    url: url.commentReply,
    method: 'post',
    data,
  })
}

export function getImage() {
  return request({
    url: url.getImage,
    method: 'get',
  })
}

export function contact(params) {
  return request({
    url: url.contact,
    method: 'get',
    params,
  })
}

export function captcha() {
  return request({
    url: url.captcha,
    method: 'get',
  })
}
