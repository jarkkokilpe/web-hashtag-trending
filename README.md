# #TRENDING APP!

Yes, it's the #TRENDING app to visualize social media trends on the map!

# Why?

It is fascinating to discover what the peak events are at the moment and where they are taking place. While this information could be presented in a plain data table, there is a catch: humans are inherently visual beings. The way we understand and process information changes significantly when presented with a visual graph compared to a table of data. Both formats provide the same information, but visual graphs and presentations are far easier to digest, allowing us to learn and process new information more quickly. Machines and AI can use those data tables. 

That's why I wanted to do a little proto demo to bring the idea up and alive in some form. This kind of visual information could have some practical usage too - other than just plain "it's fascinating".

# Data

First of all, the data showing in the map is by no means real - it is fake mock data. That said; the data is in the same format with XAPI trends, and therefore the app's backend is technically capable to fetch the data from the real data source. 

The randomizer module in the backend keeps the data "alive" for the demo purposes. The mock data covers only handful (couple of dozens) locations on the map, but it is purely for demonstration purposes only. The data fetch cycle is also much shorter than in reality it would be with real API data. The changes in the real data would happen in much slower tempo.

# Usage

You can pan and scroll the map. If you scroll a little bit closer from the initial state, the US states appear on the map too. Further development idea could be to bring up the US counties too - when zoomed close enough, but that would depend on the specific base map, because e.g. the OSM map could be used also.

The countries (or areas) and the bubbles on the map are clickable. By clicking a country you just zoom and center it - nothing special. By clicking the bubble on the map, the infobox of the country shows up on the right hand side of the screen. The infobox contains certain details of the country and posts "coming" from there (again; made up mock data is used, not the real one). Very small areas (micro states) don't have their own areas drawn on the map, but there are only bubbles representing them.

On the left side, there is a sidebar component that shows and sorts the data. The bubble size tells you obviously the same the graphical way. There are also three modes that can be activated; 
* "Volume" is the raw total volume and bubbles are corresponding sizes
* "Density" is kind of "index" calculated with posts/day/country (different for every country) and the population of the country. With that mode, the smaller countries don't get lost among the data volumes of big countries.
* "Change" is the delta i.e. the difference between two previous values. If we are growing, the bubble is green and if falling, it is red. I.e. if there is a big red circle, the "happening" is drying up and with a big green bubble there is something about to happen (or just started to happen).

Only those areas that are visible within the viewport are listed in the data grid/table.

As said above - the bubble sizes follows these "mode" changes. The bubble's color will change to green if the trend is growing and red if trend is dropping. The change has to be at least somewhat significant that bubble changes its color (there is a little threshold filtering that). Otherwise the bubble stays neutral colored - blue in this case.

# Frontend

A basic React/TypeScript implementation with help of d3.js to create a minimalistic and responsive custom map. Map is rather heavy especially for low-end machines, and as was said in the further back, optionally a lot lighter OSM based map with suitable themed (e.g. MapBox & dark-v10) tilelayer could be used.

# Backend

NestJS based implementation was chosen because of the TypeScript's safe approach continuum from the frontend.For data caching; Redis integration is coming up - to get broader averagings from wider datasets in use.

# Ideas/updates/bugs

* Add mobile device support
* Possibility to change mode to broader averaging (e.g. average of 3, 5, 10 last values etc.) - further data caching with e.g. Redis
* More detailed trend list per area visible to the infobox
* Include some website/X post links regarding the event
* Add OSM support for performance
* Add the US counties to map to increase the accuracy (depends on woeid accuracy)
* Add some bigger cities to the map
* Include AI analysis (events/region/situation of the whole world etc.)
* Add #FEARING map mode - filter chaos/unrest/demostration/war etc. related words from the trends and generate heatmap where all this is happening - it is kinda fun but at the same time it is the reality
* With #FEARING mode, the basic mode could be more lighter and when FEAR mode activates, the theme would get more dark + glowing red heatmap shows up to cover the crisis zones
* There could be some other "modes" also (e.g. sports related filtering etc)
* HTTPS not implemented yet
* Docker support and CI/CD shipping not implemented yet
* Tech integration/convertion if merged to a some other, broader system (e.g. REST -> GraphQL)
* The US area's (the whole country - visible when zoomed out) data is not consisted of the US states data ATM, it is just a separate individual data for the demo - just a note if one wonder why it behaviors like that
* Panning has no limits ATM
* Area populations (used in calculations) are obsolete information - beyond more than a decade. Need to update.
  
# Other notes

This application is a prototype version only and it is lacking many possible features. The basic features are not perfectly crafted either so expect minor bugs here and there. The main focus was to deliver the idea to a somewhat concrete form.

The demo is developed/tested mainly with a PC and Firefox setup. No mobile device support yet.

General sequence diagram can be found from root: trending-app-drawio.png
