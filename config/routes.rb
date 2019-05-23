Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
<<<<<<< HEAD
  root 'groups#index'
  resources :users, only: [:edit, :update] do
  collection do
    get 'search'
  end
end
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
 end
end
=======
  root 'messages#index'
end
>>>>>>> parent of 1250d8b... Merge pull request #3 from atsuto7/Ajax
