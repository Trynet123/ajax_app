class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

  def checked
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
