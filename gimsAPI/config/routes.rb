Rails.application.routes.draw do
	#pre-api routes
	#root 'static_pages#home'

	#get    '/help',    to: 'static_pages#help'
	#get    '/about',   to: 'static_pages#about'
	#get    '/contact', to: 'static_pages#contact'
	#get    '/signup',  to: 'users#new'
	#post   '/signup',  to: 'users#create'
	#get    '/login',   to: 'sessions#new'
	#post   '/login',   to: 'sessions#create'
	#delete '/logout',  to: 'sessions#destroy'
	namespace 'api' do
		namespace 'v1' do
			resources :users
			resources :products
			resources :orders
			post '/login', to: 'sessions#create'
			#resources :sessions
		end
	end
	# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
