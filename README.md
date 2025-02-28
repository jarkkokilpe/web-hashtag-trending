# web-hashtag-trending

It's the #TRENDING app to visualize social media trends on the map!

# Why?

I think it is fascinating to know what are the peak events at the moment and where are they located. This could be done by some plain data table but there is a catch with that. Since we tend to be visual beings it is crucially different to look at a visual graph to understand certain events than just look at table of numbers location names. You get the info by both ways, but you _learn_ and really understand it completely different and quicker way by visual graphs and presentations. That's why I wanted to do a little proto demo to bring the idea up and alive at least in some level.

# Usage

First of all, the data showing in the map is by no means real, but it is fake data. The randomizer module in the backend keeps it "alive" for the demo purposes.

You can pan and scroll the map. If you scroll a little bit closer, the US states appears on the map too. Further development idea could be to bring up the US counties too when zoomed close enough, but that would depend on the specific base map, because e.g. the OSM map could be used also.

The countries (or areas) and the bubbles on the map are clickable. By clicking a country you just zoom and center it - nothing special. By clicking the bubble on the map, the infobox of the country shows up on the right hand side of the screen. The infobox contains certain details of the country and posts "coming" from there (again; made up mock data is used, not the real one).

On the left side, there is a sidebar component that shows and sorts the data. The bubble size tells you obviously the same the graphical way. There are also three modes that can be activated; 
* "Volume" is the raw total volume and bubbles are corresponding sizes
* "Density" is kind of "index" calculated with posts/day/country (different for every country) and the population of the country. With that mode, the smaller countries don't get lost among the data volumes of big countries.
* "Change" is the delta i.e. the difference between two previous values. If we are growing, the bubble is green and if falling, it is red. I.e. if there is a big red circle, the "happening" is drying up and with a big green bubble there is something about to happen (or just started to happen).

As said above - the bubble sizes follows these "mode" changes. The bubble's color will change to green if the trend is growing and red if trend is dropping.

# Frontend
A basic React/TypeScript implementation with help of d3.js to create a minimalistic and responsive custom map. Map is rather heavy especially for low-end machines, and as was said in the further back, optionally a lot lighter OSM based map with suitable themed (e.g. MapBox & dark-v10) tilelayer could be used.

# Backend
NestJS based implementation was chosen because of the TypeScript's safe approach continuum from the frontend.For data caching; Redis integration is coming up - to get broader averagings from wider datasets in use.

# Other notes
This application is a prototype version only and it is lacking many possible features. The basic features are not perfectly crafted either. The main focus was to deliver the idea to a somewhat concrete form.

Docker support and CI/CD shipping are about to come. The demo is tested mainly with Firefox.
