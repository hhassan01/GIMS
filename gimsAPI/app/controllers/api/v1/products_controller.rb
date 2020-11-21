module Api
  module V1
    class ProductsController < ApplicationController
      def index
        @products = Product.all
        render json: {
          status: 'SUCCESS',
          message: 'Listed Products',
          data: @products
        }, status: :ok
      end

      def show
        @product = Product.find(params[:id])
        render json: {
          status: 'SUCCESS', 
          message:'Listed Products', 
          data: @product
        }, status: :ok
      end

      def new
        @product = Product.new
      end

      def create
        @product = Product.new(product_params)
        if @product.save
          render json: {
            status: 'SUCCESS', 
            message:'Product Added', 
            data: @product
          }, status: :ok
        else
          render json: {
            status: 'ERROR', 
            message:'Could not add Product',
            errors: @product.errors.full_messages
          }, status: :unprocessable_entity
        end
      end

      def edit
        @product = Product.find(params[:id])
      end

      def update
        @product = Product.find(params[:id])
        if @product.update_attributes(product_params)  
          render json: {
            status: 'SUCCESS', 
            message:'Updated Product info', 
            data: @products
          }, status: :ok
        else
          render json: {
            status: 'ERROR', 
            message:'Product not updated',
            errors: @product.errors.full_messages
          }, status: :unprocessable_entity
        end
      end

      def destroy
        Product.find(params[:id]).destroy
        render json: {
          status: 'SUCCESS', 
          message:'Deleted Product', 
          data: @products
        }, status: :ok
      end
      
      private

      def product_params
        params.permit(:name, :description, :price, :min_amount, :user_id, :category)
      end
    end
  end
end
