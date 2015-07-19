# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150719054657) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "contributors", force: true do |t|
    t.string   "uuid"
    t.string   "name"
    t.integer  "project_id"
    t.integer  "user_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.boolean  "admin",      default: false
  end

  create_table "integrations", force: true do |t|
    t.string   "service"
    t.integer  "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "languages", force: true do |t|
    t.string   "name"
    t.string   "color"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "frameworks", default: [], array: true
  end

  create_table "projects", force: true do |t|
    t.string   "title"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "uuid"
    t.string   "repo_name"
    t.text     "description"
    t.integer  "vote_count"
    t.integer  "user_id"
    t.string   "license"
    t.integer  "status"
    t.boolean  "anon",             default: false
    t.string   "langs_and_frames", default: [],                     array: true
    t.integer  "contributors",     default: [],                     array: true
    t.string   "privacy",          default: "request"
  end

  add_index "projects", ["anon"], name: "index_projects_on_anon", using: :btree
  add_index "projects", ["license"], name: "index_projects_on_license", using: :btree
  add_index "projects", ["privacy"], name: "index_projects_on_privacy", using: :btree
  add_index "projects", ["status"], name: "index_projects_on_status", using: :btree

  create_table "users", force: true do |t|
    t.string   "uuid"
    t.string   "username"
    t.string   "email"
    t.string   "name"
    t.string   "gh_username"
    t.string   "password"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "pic"
    t.integer  "upvoted",     default: [],              array: true
    t.integer  "following",   default: [],              array: true
  end

  add_index "users", ["gh_username"], name: "index_users_on_gh_username", using: :btree
  add_index "users", ["name"], name: "index_users_on_name", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", using: :btree

end
