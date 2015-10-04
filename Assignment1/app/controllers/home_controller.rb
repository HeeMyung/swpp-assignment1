class HomeController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def index
  end

  def login
    @user = User.find_by(username: params[:username])
    error_code = 0
    if @user == nil || @user.password != params[:password]
      error_code = -4
    end
    if error_code == 0
      @user.logincount += 1
      @user.save
      render json: {:user_name => @user.username,
                    :login_count => @user.logincount}
    else
      render json: {:error_code => error_code, :user_name => params[:username]}
    end
  end

  def create
    @user = User.find_by(username: params[:username])
    error_code = 0
    if @user != nil
      error_code = -3
    else
      if params[:username].length < 5 || params[:username].length > 20
        error_code = -1
      elsif params[:password].length < 8 || params[:password].length > 20
        error_code = -2
      else
        @user = User.new
        @user.username = params[:username]
        @user.password = params[:password]
        @user.logincount = 1
        @user.save
      end
    end

    if error_code == 0
      render json: {:user_name => @user.username,
                    :login_count => @user.logincount}
    else
      render json: {:error_code => error_code}
    end
  end

  def clear_all
    User.destroy_all
    render plain: 'OK'
  end
end
