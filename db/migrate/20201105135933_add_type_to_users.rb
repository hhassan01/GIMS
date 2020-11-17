class AddTypeToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :user_type, :string, default: "Wholesaler"
  end
end
