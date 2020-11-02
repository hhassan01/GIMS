module Api
	module V1
		class AccountActivationsController < ApplicationController
			def edit
				user = User.find_by(email: params[:email])
				if user && !user.activated? && user.authenticated?(:activation, params[:id])
					user.activate
					#log_in user
					#flash[:success] = "Your Account has been Activated"
					#redirect_to user
					render json: {
						message: "Account has been activated"
					}, status: :ok
				else
					#flash[:danger] = "Invalid Activation Link"
					#redirect_to root_url
					render json: { error: 'Invalid Activation Link'}, staus: :unauthorized
				end
			end
		end
	end
end