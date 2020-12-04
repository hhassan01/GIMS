# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

############# User Seeds ###############
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
    
    (rand(2) > 0) ? user_type = "Wholesaler" : user_type = "Manufacturer"
    
    User.create!(name:  name,
                 email: email,
                 password:              password,
                 password_confirmation: password,
                 user_type: user_type
                )
end

############# Products Seeds #############

24.times do |n|
    
    fruitBaskit      = Faker::Food.fruits
    ingredientBowl   = Faker::Food.ingredient
    vegetablesFable  = Faker::Food.vegetables
    cannabisJo       = Faker::Cannabis.strain
    spicesEast       = Faker::Food.spice 
    
    pandora = rand(49)
    
    case pandora
    when 0..9
        name = fruit
    when 10..19
        name = ingredient
    when 20..29
        name = vegetables
    when 30..39
        name = cannabis
    when 40..49
        name = spices
    end


    case rand(4)
    when 0
        category = fruit
    when 1
        category = ingredient
    when 2 
        category = vegetables
    when 3 
        category = strain
    when 4 
        category = spices
    end 

    description = Faker::Food.description
    price       = Faker::Number.within(range: 1..1000)
    min_amount  = Faker::Number.within(range: 12..50)

    Products.create!(name:  name,
                     description: description,
                     price:       price,
                     min_amount:  password,
                     category:    category
                    )
end 
