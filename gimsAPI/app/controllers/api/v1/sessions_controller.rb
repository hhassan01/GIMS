module Api
	module V1
		class SessionsController < ApplicationController		
			before_action :authorize_request, except: [:create, :destroy]

			def new
			end

			# POST /auth/login
			def create
				@user = User.find_by(email: params[:email].downcase)
				if @user&.authenticate(params[:password])
					#if user.activated?
					#	log_in user
					#	params[:session][:remember_me] == '1' ? remember(user) : forget(user)
					#	redirect_back_or user
					#else
					#	message = "Account not activated. Check your email for activation link"
					#	#message += "#{UserMailer.accout_activation}"
					#	flash[:warning] = message
					#	redirect_to root_url
					#end
					token = JsonWebToken.encode(user_id: @user.id)
					time = Time.now + 24.hours.to_i
					render json: { 
						token: token, 
						exp: time.strftime("%m-%d-%Y %H:%M"),
						email: @user.email,
						name: @user.name, 
						user_id: @user.id,
						user_type: @user.user_type
					}, status: :ok
				else
					render json: { error: 'unauthorized' }, status: :unauthorized
				end
			end

			def destroy
				log_out if logged_in?
				redirect_to root_url
			end
		end
	end
end