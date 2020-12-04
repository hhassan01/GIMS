class Order < ApplicationRecord
	belongs_to :user
	#belongs_to :product
	#or
	#had_many :products
end
