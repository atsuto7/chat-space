class Api::MessagesController < ApplicationController
  def index
    
    message = Message.find(params[:id])
    group = message.group
    group_messages = group.messages
    @messages = group_messages.where('id > ?', params[:id])
    respond_to do |format|
      format.json
    end
  end
end  
