class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    # メモ作成時に未読の情報を保存
    post = Post.create(content: params[:content], checked: false)

    # レスポンスをJSONに変更
    render json:{ post: post }
  end

  def checked
    # binding.pry
    # params[:id]には"${postId}"

    # 既読したメモのid
    post = Post.find(params[:id])
    if post.checked 
      post.update(checked: false)
      # 既読を解除するためにfalseへ変更
    else
      post.update(checked: true)
      # 既読にするためtrueへ変更
    end

    item = Post.find(params[:id])
    # 更新したレコード
    render json: { post: item }
    # JSON形式（データ）としてchecked.jsに返却
  end
end
