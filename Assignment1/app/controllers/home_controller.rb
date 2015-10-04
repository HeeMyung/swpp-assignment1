class HomeController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def index
  end

  def logout
    redirect_to(:action => :index)
  end

  def loggedon
    @user = User.find_by(username: params[:username])
    render 'login'
  end

  def login
    @user = User.find_by(username: params[:userinfo][:username])
    @error = nil
    if @user == nil || @user.password != params[:userinfo][:password]
      @error = "Invalid username and password combination. Please try again."
    end
    if @error == nil
      @user.logincount += 1
      @user.save
      redirect_to ({:action => :loggedon,
                    :username => @user.username})
    else
       redirect_to ({:action => :index,
                     :error => @error})
    end
  end

  def create
    @user = User.find_by(username: params[:userinfo][:username])
    errorMsg = nil
    if @user != nil
      errorMsg = 'This user name already exists. Please try again.'
    else
      if params[:userinfo][:username].length < 5 || params[:userinfo][:username].length > 20
        errorMsg = 'The user name should be 5~20 characters long. Please try again.'
      elsif params[:userinfo][:password].length < 8 || params[:userinfo][:password].length > 20
        errorMsg = 'The password should be 8~20 characters long. Please try again.'
      else
        @user = User.new(user_params)
        @user.logincount = 1
        @user.save
      end
    end

    if errorMsg == nil
      redirect_to(:action => :loggedon, 
                  :username => @user.username)
    else
      redirect_to(:action => :index,
                  :error => errorMsg)
    end
  end

  private
    def user_params
      params.require(:userinfo).permit(:username, :password)
    end
end
