class Product < ApplicationRecord
	belongs_to :user

	validates :name,  presence: true, length: { maximum: 50 }
	
	validates :description, length: { maximum: 500 }
	validates :price, presence: true
	validates :min_amount, presence: true 
end
