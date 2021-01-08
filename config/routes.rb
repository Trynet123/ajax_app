Rails.application.routes.draw do
  root to: 'posts#index'
  post 'posts', to: 'posts#create'
  get 'posts/:id', to: 'posts#checked'
  # メモをクリックした際に/posts/:idというエンドポイントへアクセス
end