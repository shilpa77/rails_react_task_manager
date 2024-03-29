# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
10.times do |n|
  Task.create(title: "Task-#{n}", description: "DESC-#{n}", status:  [0,1,2].sample, due_date: Time.now + 3.days)
end