module Api
	module V1
		class UsersController < ApplicationController
			#before_action :logged_in_user,    only:   [:edit, :index, :destroy]
			#before_action :correct_user,      only:   [:edit, :update]
			#before_action :admin_user,        only:   [:destroy]
			before_action :authorize_request, except: [:create, :index, 
												:delete]
			#helper_method :cookies	

			def index
				#@users = User.where(activated: true).paginate(page: params[:page])
				@users = User.all
				render json: {
					status: 'SUCCESS', 
					message:'Listed users', 
					data: @users
				}, status: :ok

			end

			def show
				@user = User.find(params[:id])
				render json: {
					status: 'SUCCESS', 
					message:'Listed users', 
					data: @user
				}, status: :ok
			end

			def new
				@user = User.new
			end

			#POST/users
			def create
				@user = User.new(user_params)
				if @user.save
					render json: {
						status: 'SUCCESS', 
						message:'User Account Created', 
						data: @user
					}, status: :ok
				else
					render json: {
						status: 'ERROR', 
						message:'Could not create user account',
						errors: @user.errors.full_messages
					}, status: :unprocessable_entity
				end
			end

			def edit
				@user = User.find(params[:id])
			end

			#does not work for now.
			#PUT /users/{id} 
			def update
				@user = User.find(params[:id])
				if @user.update_attributes(user_params)
					#handle update
					#flash[:success] = "Profile Updated!"
					#redirect_to @user
					render json: {
						status: 'SUCCESS', 
						message:'Updated user info', 
						data: @users
					}, status: :ok
				else
					# render 'edit'
					render json: {
						status: 'ERROR', 
						message:'Info not updated',
						errors: @user.errors.full_messages
					}, status: :unprocessable_entity
				end
			end

			def destroy
				User.find(params[:id]).destroy
				# flash[:success] = "Kicked Out!"
				# redirect_to users_url
				render json: {
					status: 'SUCCESS', 
					message:'Deleted User', 
					data: @users
				}, status: :ok
			end

			private

			def user_params
				params.permit(:name, :email, :password, :password_confirmation, :user_type)
			end

			#adding before filter
			#Confirms the user is logged in
			def logged_in_user
				unless logged_in?
					store_location
					#flash[:danger] = "Please log in first"
					#redirect_to login_url
				end
			end

			#confirms correct user
			def correct_user
				@user = User.find(params[:id])
				#redirect_to(root_url) unless current_user?(@user) (non api code)
				current_user?(@user)
			end

			#def set_user
			#	@user = User.find(params[:id])
			#end
			#confirms the admin user
			def admin_user
				#redirect_to(root_url) unless current_user.admin? (non api code)
				current_user.admin?
			end
		end
	end
end