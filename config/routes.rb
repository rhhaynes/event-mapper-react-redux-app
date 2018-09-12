Rails.application.routes.draw do
  scope '/api' do
    get  '/locations' => 'locations#index'
    post '/locations' => 'locations#create'
    get  '/hurricanes/:yr' => 'hurricanes#show'
    get  '/volcanoes/:ltr' => 'volcanos#show'
  end
end
