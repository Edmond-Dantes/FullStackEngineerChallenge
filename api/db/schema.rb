# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_12_102822) do

  create_table "employees", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "performance_review_feedbacks", force: :cascade do |t|
    t.integer "performance_review_id", null: false
    t.integer "employee_id", null: false
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["employee_id"], name: "index_performance_review_feedbacks_on_employee_id"
    t.index ["performance_review_id"], name: "index_performance_review_feedbacks_on_performance_review_id"
  end

  create_table "performance_reviews", force: :cascade do |t|
    t.integer "employee_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["employee_id"], name: "index_performance_reviews_on_employee_id"
  end

  add_foreign_key "performance_review_feedbacks", "employees"
  add_foreign_key "performance_review_feedbacks", "performance_reviews"
  add_foreign_key "performance_reviews", "employees"
end
