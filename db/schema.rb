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

ActiveRecord::Schema.define(version: 20160206101502) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: true do |t|
    t.string   "uuid"
    t.text     "text"
    t.integer  "project_id"
    t.integer  "user_id"
    t.integer  "vote_count"
    t.integer  "feed"
    t.integer  "parent_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_destroyed", default: false
  end

  create_table "contributors", force: true do |t|
    t.string   "uuid"
    t.integer  "project_id"
    t.integer  "user_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.boolean  "admin",      default: false
  end

  create_table "delayed_jobs", force: true do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "delayed_jobs", ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree

  create_table "evolutions", force: true do |t|
    t.string   "uuid"
    t.integer  "project_id"
    t.integer  "user_id"
    t.text     "text"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_destroyed", default: false
  end

  create_table "implementations", force: true do |t|
    t.string   "uuid"
    t.integer  "project_id"
    t.boolean  "is_owner",             default: false
    t.boolean  "done",                 default: false
    t.boolean  "seeking_contributors", default: false
    t.text     "description"
    t.string   "slack_url"
    t.string   "hipchat_url"
    t.json     "irc"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.boolean  "is_destroyed",         default: false
    t.integer  "vote_count",           default: 0
    t.string   "main_url"
    t.string   "title"
  end

  create_table "integrations", force: true do |t|
    t.string   "service"
    t.integer  "project_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "key"
    t.string   "url"
    t.json     "irc",        default: {}
    t.integer  "users",      default: [],              array: true
  end

  create_table "languages", force: true do |t|
    t.string   "name"
    t.string   "color"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "frameworks", default: [], array: true
  end

  create_table "pending_requests", force: true do |t|
    t.integer  "requested_asset"
    t.integer  "requester_id"
    t.integer  "project_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "uuid"
    t.integer  "responder_id"
    t.boolean  "response"
    t.boolean  "response_seen",   default: false
    t.boolean  "request_seen",    default: false
    t.datetime "responded_at"
  end

  create_table "projects", force: true do |t|
    t.string   "title"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "uuid"
    t.string   "repo_name"
    t.text     "description"
    t.integer  "vote_count"
    t.integer  "user_id"
    t.integer  "status"
    t.boolean  "anon",               default: false
    t.string   "langs_and_frames",   default: [],                 array: true
    t.string   "license",            default: [],                 array: true
    t.string   "privacy",            default: [],                 array: true
    t.boolean  "was_pulled",         default: false
    t.text     "subtitle"
    t.boolean  "is_destroyed",       default: false
    t.integer  "comments_count",     default: 0
    t.integer  "contributors_count", default: 0
    t.string   "domains",            default: [],                 array: true
    t.string   "seeking",            default: [],                 array: true
    t.boolean  "up_for_grabs",       default: false
  end

  add_index "projects", ["anon"], name: "index_projects_on_anon", using: :btree
  add_index "projects", ["status"], name: "index_projects_on_status", using: :btree

  create_table "suggestions", force: true do |t|
    t.string   "uuid"
    t.integer  "user_id"
    t.text     "text"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "uuid"
    t.string   "username"
    t.string   "email"
    t.string   "name"
    t.string   "gh_username"
    t.string   "password"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "pic"
    t.integer  "upvoted_projects",        default: [],              array: true
    t.integer  "following",               default: [],              array: true
    t.integer  "starred",                 default: [],              array: true
    t.integer  "upvoted_comments",        default: [],              array: true
    t.integer  "upvoted_implementations", default: [],              array: true
  end

  add_index "users", ["gh_username"], name: "index_users_on_gh_username", using: :btree
  add_index "users", ["name"], name: "index_users_on_name", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", using: :btree

end
