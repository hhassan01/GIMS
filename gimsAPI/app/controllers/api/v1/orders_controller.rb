module Api
	module V1
		class OrdersController < ApplicationController
			def index
        		@orders = Order.all
		        render json: {
			        status: 'SUCCESS',
			        message: 'Listed All Orders',
			        data: @orders
		        }, status: :ok
		    end

			def show
				@orders = Order.find(params[:id])
				render json: {
					status: 'SUCCESS', 
					message:'Listed Orders', 
					data: @order
				}, status: :ok
			end

			def new
				@order = Order.new
			end

			def create
				@order = Order.new(order_params)
				if @order.save
				render json: {
					status: 'SUCCESS', 
					message:'Order Made', 
					data: @order
				}, status: :ok
			else
				render json: {
					status: 'ERROR', 
					message:'Could not add new Order',
					errors: @order.errors.full_messages
				}, status: :unprocessable_entity
				end
			end

			def edit
				@order = Order.find(params[:id])
			end

			def update
				@order = Order.find(params[:id])
				if @order.update_attributes(order_params)  
					render json: {
						status: 'SUCCESS', 
						message:'Updated Order info', 
					data: @orders
				}, status: :ok
				else
				render json: {
					status: 'ERROR', 
					message:'Order not updated',
					errors: @order.errors.full_messages
				}, status: :unprocessable_entity
				end
			end

			def destroy
				Order.find(params[:id]).destroy
				render json: {
					status: 'SUCCESS', 
					message:'Deleted Order', 
					data: @orders
				}, status: :ok
			end

			private

			def order_params
				params.permit(:total_amount, :order_status, :ship_address, :quantity,
							  :delivered_at, :product_id, :user_id)
			end
		end
	end
end
