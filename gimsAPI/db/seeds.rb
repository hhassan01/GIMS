# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(name:  "Admin User",
             email: "admin@gims.com",
             password:              "admin25",
             password_confirmation: "admin25",
             user_type: "Distributor",
             admin: true,
            )

24.times do |n|
    name  = Faker::Name.name
    email = "example-#{n+1}@gims.com"
    password = "password"
    user_type = "Wholesaler"
    User.create!(name:  name,
                 email: email,
                 password:              password,
                 password_confirmation: password,
                 user_type: user_type
                )
end