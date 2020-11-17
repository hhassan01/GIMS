class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.float :total_amount
      t.string :order_status
      t.string :ship_address
      t.integer :quantity
      t.date :delivered_at

      t.timestamps
    end
  end
end
