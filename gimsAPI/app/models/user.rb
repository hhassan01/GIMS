class User < ApplicationRecord

	before_save   :downcase_email
	
	validates :name,  presence: true, length: { maximum: 50 }
	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
	validates :email, presence: true, length: { maximum: 255 }, 
					  format: { with: VALID_EMAIL_REGEX}, 
					  uniqueness: { case_sensitive: false }
	has_secure_password
	validates :password, presence: true, length: { minimum: 6 }, allow_nil: true 

	has_many :products, dependent: :destroy
	has_many :orders

	# Returns the hash digest of the given string.
	def User.digest(string)
		cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
													  BCrypt::Engine.cost
		BCrypt::Password.create(string, cost: cost)
	end

	#returns a radom token (for making cookies)
	def User.new_token
		SecureRandom.urlsafe_base64
	end

	# Returns true if the given token matches the digest.
	def authenticated?(attribute, token)
		digest = send("#{attribute}_digest")
		return false if digest.nil?
		BCrypt::Password.new(digest).is_password?(token)
	end

	def forget
		update_attribute(:remember_digest, nil)
	end

	#sends passwrd reset email
	def send_password_reset_email
		UserMailer.password_reset(self).deliver_now
	end

	#returns true of password expired
	def password_reset_expired?
		reset_sent_at < 2.hours.ago
	end

	private

	#lower cases the emails
	def downcase_email
		#self.email = email.downcase This is fine but the next one is cooler
		self.email = email.downcase
	end
end	