class Api::MessagesController < ApplicationController
  def index
    group_messages = Message.where(params[:group_id])
    @messages = group_messages.where('id > ?', params[:id])
    respond_to do |format|
      format.json
    end
  end
end  
