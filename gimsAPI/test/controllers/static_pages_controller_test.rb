require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @basic_title = "Juke Box"
  end

  #test "should get root" do
  #  get root_path
  #  assert_response :success
  #end

  test "should get home" do
    get root_path
    assert_response :success
    assert_select "title", "#{@basic_title}"
  end

  test "should get help" do
    get help_path
    assert_response :success
    assert_select "title", "Help | #{@basic_title}"
  end

  test "should get about" do
    get about_path
    assert_response :success
    assert_select "title", "About | #{@basic_title}"
  end

  test "shout get contact" do
    get contact_path
    assert_response :success
    assert_select "title", "Contact | #{@basic_title}"
  end

end
