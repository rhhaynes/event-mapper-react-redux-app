Rails.application.routes.draw do
  scope '/api' do
    get '/hurricanes/:yr' => 'hurricanes#show'
    get '/volcanoes/:ltr' => 'volcanos#show'
  end
end
