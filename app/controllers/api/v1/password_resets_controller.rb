module Api
	module V1
		class PasswordResetsController < ApplicationController
			before_action :get_user,         only: [:edit, :update]
			before_action :valid_user,       only: [:edit, :update]
			before_action :check_expiration, only: [:edit, :update]

			def new
		  	end

		  	def create
		  		@user = User.find_by(email: params[:email])
		  		if @user
		  			@user.create_reset_digest
		  			@user.send_password_reset_email
		  			#flash[:info] = "Email sent with pass reset instructions"
		  			#redirect_to root_url
		  			render json: {
		  				message: "Email sent with password reset instructions"
		  			}
		  		else
		  			#flash.now[:danger] = "Invalid email. Not found"
		  			#render 'new'
		  			render json: {
		  				message: "Invalid email. Not found"
		  			}
		  		end
		  	end

		  	def edit
		  	end

			def update
				if @user.update_attributes(user_params)
					#log_in @user
					#flash[:success] = "Password Reset!"
					#redirect_to @user
					render json: {
						message: "Password Reset!"
					}
				else
					render 'edit'
				end
			end

			private

			def user_params
				params.permit(:password, :password_confirmation)
			end

			def get_user
				@user = User.find_by(email: params[:email])
			end

			#confirms a valid user
			def valid_user
				unless (@user && @user.activated? && @user.authenticated?(:reset, params[:id]))
					#redirect_to root_url
					render json: :unauthorized
				end
			end

			def check_expiration
				if @user.password_reset_expired?
				#	flash[:danger] = "Password reset has been expired"
				#	redirect_to new_password_reset_url
					render json: :Expired
				end
			end
		end
	end
end