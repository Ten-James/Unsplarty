import { useState, useContext } from 'react';
import { DataContext } from './App';
import { write } from '../firebase';

const get3Themes = () => {
	// find api for that
	const themes = [
		'Civilization',
		'Buildings and Structures',
		'Agricultural Buidings',
		'Barns and Farms',
		'Greenhouses',
		'Sheds',
		'Silos',
		'Wineries',
		'Architectural Details',
		'Altars',
		'Arches',
		'Atriums',
		'Balconies and Porches',
		'Bas Reliefs',
		'Bells',
		'Ceilings',
		'Smoke Stacks',
		'Cloisters',
		'Columns',
		'Corridors',
		'Courtyards',
		'Crosses',
		'Decorative Pools',
		'Domes',
		'Doors',
		'Facades',
		'Galleries',
		'Gates',
		'Grids',
		'Kivas',
		'Ladders',
		'Moats',
		'Mural Decor',
		'Roofs',
		'Stained Glass',
		'Staircases',
		'Stupas',
		'Tombs',
		'Tumulus',
		'Walls',
		'Water Wheels',
		'Windows',
		'Architectural Materials',
		'Adobe Buildings',
		'Brick Buildings',
		'Concrete Buildings',
		'Glass Buildings',
		'Half Timbered Buildings',
		'Marble Buildings',
		'Metal Buildings',
		'Brightly painted buildings',
		'Sandstone Buildings',
		'Whitewashed Buildings',
		'Wooden Buildings',
		'Architectural Styles',
		'Antebellum Architecture',
		'Art Deco Architecture',
		'Baroque Architecture',
		'Chinese Classical Architecture',
		'Gothic Architecture',
		'Greek Architecture',
		'Islamic Architecture',
		'Medieval Architecture',
		'Modern Architecture',
		'Neo Classical Architecture',
		'Pueblo Architecture',
		'Renaissance Architecture',
		'Roman Architecture',
		'Romanesque Architecture',
		'Victorian Architecture',
		'Bridges',
		'Aqueducts',
		'Arched Metal Bridges',
		'Concrete Bridges',
		'Covered Bridges',
		'Footbridges',
		'Mobile Bridges',
		'Stone Bridges',
		'Suspension Bridges',
		'Wooden Bridges',
		'Buildings in the distance',
		'Historic Buildings',
		'Bathhouses',
		'Belfries',
		'Capitols and Parliaments',
		'Castles',
		'Chateaux',
		'City Halls',
		'Courthouses',
		'Custom Houses',
		'Forts',
		'Ghost Towns',
		'Halls',
		'Historic Mines',
		'Hospices',
		'Mausoleums',
		'Old Western Buildings',
		'Palaces',
		'Pavilons',
		'Prisons',
		'Ramparts and Towngates',
		'Industrial Buildings',
		'Dams',
		'Mills',
		'Power Plants',
		'Refineries',
		'Shipyards',
		'Interiors',
		'Lighthouses',
		'Monuments',
		'Colonades',
		'Fountains',
		'Megaliths',
		'Memorials',
		'Monumental Arches',
		'Monumental Columns',
		'Monumental Statues',
		'Obelisks',
		'Towers',
		'Open Structures',
		'Carousels',
		'Cranes',
		'Drying Racks',
		'Fences',
		'Ferris Wheels',
		'Gazebos',
		'Lifeguard Towers',
		'Tents',
		'Water Towers',
		'Public Buildings',
		'Airports',
		'Aquariums',
		'Boathouses',
		'Casinos',
		'Commercial Buildings',
		'Conservatories of Flowers',
		'Fire Lookouts',
		'High Rise Buildings',
		'Hotels',
		'Mountain Huts',
		'Museums',
		'Observatories',
		'Post Offices',
		'Restaurants and Bars',
		'Schools and Universities',
		'Shopping Malls',
		'Skyscrapers',
		'Stadiums',
		'Stations',
		'Stores',
		'Studios',
		'Theatres and Opera Houses',
		'Visitor Centers',
		'Religious Buildings',
		'Abbeys',
		'Basilicas',
		'Caodai Temples',
		'Cathedrals',
		'Chapels',
		'Churches',
		'Confucius Temples',
		'Hindu Temples',
		'Mahayana Buddhist Temples',
		'Missions',
		'Monasteries',
		'Mormon Temples',
		'Mosques',
		'Pagodas',
		'Shrines',
		'Taoist Temples',
		'Theravada Buddhist Temples',
		'Traditional Asian Temples',
		'Residences',
		'Appartment Buildings',
		'Cabins',
		'Houseboats',
		'Houses',
		'Huts',
		'Mansions',
		'Pueblos',
		'Stilt Houses',
		'Townhouses',
		'Ruins',
		'Anasazi Ruins',
		'Archeological Sites',
		'Asian Ruins',
		'Champa Ruins',
		'Greek Architecture',
		'Khmer Temples',
		'Medieval Ruins',
		'Recent Ruins',
		'Roman Architecture',
		'Economy',
		'Agriculture',
		'Agricultural Buidings',
		'Agricultural Equipment',
		'Berry Fields',
		'Cotton Growing',
		'Cultivated Fields',
		'Cultivated Terraces',
		'Drying Food',
		'Floating Gardens',
		'Flower Nurseries',
		'Hay Fields',
		'Livestock',
		'Orchards',
		'Pastures',
		'Rice Fields',
		'Taro Cultivation',
		'Vegetables',
		'Vineyards',
		'Commerce',
		'Art Galleries',
		'Floating Markets',
		'Public Markets',
		'Shopping Districts',
		'Shopping Malls',
		'Stores',
		'Street Vending',
		'Commercial Fishing',
		'Communications',
		'Energy',
		'Dams',
		'Petroleum Industry',
		'Power Lines',
		'Power Plants',
		'Wind Power',
		'Food',
		'Bakeries',
		'Food Close Ups',
		'Food Preparation',
		'Food Stores',
		'Food Vending',
		'Fruit Stands',
		'Halloween Pumpkins',
		'Red Peppers',
		'Restaurants and Bars',
		'Forestry',
		'Industrial Shipping',
		'Machines and Industry',
		'Mining',
		'Historic Mines',
		'Open Pit Mines',
		'Textiles',
		'Clothing',
		'Cotton Growing',
		'Silk',
		'Traditional Medicine',
		'Man-made spaces',
		'Cemeteries',
		'Cities From Above',
		'Gardens',
		'Basins',
		'Decorative Flowers',
		'Decorative Plants',
		'Formal Gardens',
		'Indoor Gardens',
		'Lawns',
		'Urban Parks',
		'Yards',
		'Zen Gardens',
		'Hillside Towns',
		'Lights',
		'Building Lights',
		'Candles',
		'Cave Lights',
		'Christmas Lights',
		'Fire',
		'Fireworks',
		'Illuminated Buildings',
		'Lamps (by daylight)',
		'Lanterns',
		'Neon Lights',
		'Street Lights',
		'Recreational spaces',
		'Amusement Parks',
		'Public benches',
		'Boardwalks',
		'Campgrounds',
		'Ice Rings',
		'Overlooks',
		'Trails',
		'Walkways',
		'Roads',
		'Border Crossings',
		'Road curves',
		'Gravel Roads',
		'Highways',
		'Parking Lots',
		'Rural and scenic roads',
		'Rural Landscapes',
		'Skylines',
		'Steps',
		'Tunnels',
		'Urban spaces',
		'Alleys',
		'Chinatowns',
		'Coblestone pavement',
		'Covered Passages',
		'Plazas',
		'Sidewalks',
		'Streets',
		'Villages',
		'Structures near water',
		'Canal Locks',
		'Canals',
		'Decks',
		'Harbors',
		'Marinas',
		'Piers',
		'Quays',
		'Beach resorts',
		'Swimming Pools',
		'Waterfronts',
		'Objects',
		'Barrels',
		'Beach Unbrellas',
		'Buoys',
		'Ceramics',
		'Clocks',
		'Clothing',
		'Crab Traps',
		'Crafts',
		'Flags',
		'Folk Art',
		'Furniture',
		'Incense',
		'Inscriptions',
		'Laundry',
		'Misc Man Made Things',
		'Petroglyphs and Pictographs',
		'Pictures',
		'Rock Piles',
		'Signs',
		'Statues',
		'Buddha Statues',
		'Misc Buddhist Statues',
		'Monumental Statues',
		'Nativity',
		'Ritual Statues',
		'Sculptures',
		'Totem Poles',
		'Weapons',
		'Wrecks',
		'Religion',
		'Buddhism',
		'Buddha Statues',
		'Buddhist Caves',
		'Buddhist Monks',
		'Gompas',
		'Mahayana Buddhist Temples',
		'Misc Buddhist Statues',
		'Pagodas',
		'Stupas',
		'Theravada Buddhist Temples',
		'Zen Gardens',
		'Caodai',
		'Christianity',
		'Abbeys',
		'Basilicas',
		'Cathedrals',
		'Chapels',
		'Christian Cemeteries',
		'Christian Clergy',
		'Christian Monasteries',
		'Churches',
		'Crosses',
		'Missions',
		'Mormon Temples',
		'Nativity',
		'Hinduism',
		'Islam',
		'Islamic Monuments',
		'Mosques',
		'Muslim Cemeteries',
		'Muslim People',
		'Judaism',
		'Polynesian Religions',
		'Shintoism',
		'Traditional Asian Religions',
		'Transportation',
		'Small Planes',
		'ATVs',
		'Autos',
		'Bicycles',
		'Boats',
		'Barges',
		'Cargo Boats',
		'Coracle Boats',
		'Cruise Ships',
		'Ferries',
		'Fishing Boats',
		'Floating Markets',
		'Gondolas',
		'Historic Boats',
		'Houseboats',
		'Long Tail Boats',
		'Outrigger Canoes',
		'Riverboats',
		'Rowboats',
		'Sailboats',
		'Small Boats',
		'Tour Boats',
		'Warships',
		'Yachts',
		'Busses',
		'Cable-cars and Trams',
		'Carriages and Horses',
		'Classic Cars',
		'Cyclos and tuk-tuks',
		'Motorbikes',
		'Roads',
		'RVs',
		'Snowcoaches and Snowmobiles',
		'Space Travel',
		'Subway',
		'Taxis',
		'Traffic',
		'Traffic Light Blurs',
		'Trains and railroad',
		'Trucks',
		'Nature',
		'Animals and Wildlife',
		'Animal Tracks',
		'Birds',
		'Cormorants',
		'Ducks',
		'Geese',
		'Misc Birds',
		'Pelicans',
		'Pigeons',
		'Seabirds',
		'Swans',
		'Wading Birds',
		'Bones and Antlers',
		'Dead Animals',
		'Fish',
		'Cold Water Fish',
		'Koi Fish',
		'Salmon',
		'Tropical Fish',
		'Insects',
		'Mammals',
		'Bears',
		'Black Bears',
		'Brown Bears',
		'Grizzly',
		'Pandas',
		'Big Horn Sheep',
		'Bisons',
		'Caribous',
		'Critters',
		'Dall Sheep',
		'Deer',
		'Elks',
		'Horses',
		'Kangaroos',
		'Koalas',
		'Misc Mammals',
		'Monkeys',
		'Moose',
		'Mountain Goats',
		'Pronghorns',
		'Sacred Cows',
		'Marine Life',
		'Elephant Seals',
		'Harbor Seals',
		'Invertebretes',
		'Jellyfish',
		'Marine Mammals',
		'Sea Lions',
		'Whales',
		'Pets',
		'Reptiles',
		'Atmosphere and Sky',
		'Alpenglow',
		'Aurora Borealis',
		'Cloudless Sky',
		'Clouds',
		'Fog',
		'Moon',
		'Rain',
		'Sea of Clouds',
		'Stars',
		'Storms',
		'Sun',
		'Sunrays',
		'Sunrises',
		'Sunsets',
		'Twilight',
		'Environments',
		'Deserts',
		'Grasslands',
		'High Altitude',
		'Middle Mountain',
		'North Woods',
		'Oasis',
		'Subtropics',
		'Timberline',
		'Tropics',
		'Tundra',
		'Wetlands',
		'Flowers',
		'Alpine Flowers',
		'Beargrass',
		'Brittlebush',
		'Cactus Blooms',
		'Coreopsis Flowers',
		'Daffodils',
		'Daisies',
		'Dalhias',
		'Decorative Flowers',
		'Desert Gold',
		'Fireweed',
		'Flower Carpets',
		'Iceplant',
		'Irises',
		'Lupine',
		'Misc Wildflowers',
		'Morning Glories',
		'Mustard Flowers',
		'Orchids',
		'Cymbidium',
		'Orchid Species',
		'Paintbrush',
		'Poppies',
		'Rododendrons',
		'Roses',
		'Sunflowers',
		'Trillium',
		'Tropical Flowers',
		'Tulips',
		'Yucca Blooms',
		'Freshwater',
		'Braided Rivers',
		'Cascades',
		'Flooded Plains',
		'Islets In Lakes',
		'Lakes',
		'Ponds',
		'Natural Pools',
		'Potholes',
		'Rainbows',
		'Rivers',
		'Streams',
		'Swamps',
		'Waterfalls',
		'Whitewater',
		'Geology',
		'Badlands',
		'Canyons',
		'Dry Washes',
		'Gorges',
		'Large Canyons',
		'Narrows',
		'Slot Canyons',
		'Caves',
		'Flats',
		'Gravel Bars',
		'Meadows',
		'Mud Playas',
		'Plains',
		'Plateaus',
		'Salt Flats',
		'Valley Bottoms',
		'Hills',
		'Karstic Hills',
		'Mountains',
		'Distant Ranges',
		'Forested Peaks',
		'Moraines',
		'Mountain Vistas',
		'Ridges',
		'Rocky Peaks',
		'Snowy Peaks',
		'Valleys',
		'Petrified Wood',
		'Rock Formations',
		'Alcoves',
		'Balanced Rocks',
		'Boulders',
		'Caprocks',
		'Cliffs',
		'Concretions',
		'Desert Varnish',
		'Hoodoos',
		'Mesas and Buttes',
		'Monoliths',
		'Natural Arches',
		'Natural Bridges',
		'Outcrops',
		'Pinnacles',
		'Rock Domes',
		'Rock Towers',
		'Rock Walls',
		'Scree',
		'Slabs',
		'Stones',
		'Swirls',
		'Terraces',
		'Rock Types',
		'Ash',
		'Basalt',
		'Bentonite',
		'Caliche',
		'Dried Mud',
		'Gneiss',
		'Granite',
		'Hardened Lava',
		'Limestone',
		'Mudstone',
		'Obsidian',
		'Ochre',
		'Rhyolite',
		'Sandstone',
		'Travertine',
		'Tufa',
		'Sand Dunes',
		'Pink Sand Dunes',
		'White Sand Dunes',
		'Yellow Sand Dunes',
		'Slopes',
		'Volcanic Landforms',
		'Ash',
		'Cinder Cones',
		'Craters',
		'Dormant Volcanoes',
		'Geysers',
		'Hardened Lava',
		'Hot Springs',
		'Lava Flows',
		'Lava Tubes',
		'Obsidian',
		'Pumice',
		'Sulfur Deposits',
		'Thermal Basins',
		'Thermal Pools',
		'Thermal Steam',
		'Volcanic Devastation',
		'Volcanic Plumes',
		'Ice and Snow',
		'Frost',
		'Frozen Water Bodies',
		'Frozen Waterfalls',
		'Glaciers',
		'Crevasses',
		'Mountain Glaciers',
		'Seracs',
		'Tide Water Glaciers',
		'Hail',
		'Icebergs',
		'Icicles',
		'Misc Ice',
		'Neves',
		'Permanent Snow',
		'Seasonal Snow',
		'Seascapes',
		'Bays',
		'Beaches',
		'Black Sand Beaches',
		'Gravel Beach',
		'Sandy Beaches',
		'Blowholes',
		'Coastlines',
		'Coral',
		'Driftwood',
		'Fjords',
		'Islands',
		'Lagoons',
		'Open Seas',
		'Pointed Rocks',
		'Sea Arches',
		'Seacaves',
		'Seacliffs',
		'Sea in the distance',
		'Seashells',
		'Seastacks',
		'Seaweed',
		'Tidal Flats',
		'Tidepools',
		'Turquoise Seas',
		'Waves and Surf',
		'Seasons',
		'Autumn',
		'Spring',
		'Summer',
		'Winter',
		'Vegetation',
		'Aquatic Plants',
		'Bald Cypress',
		'Mangroves',
		'Misc Aquatic Plants',
		'Nenuphars',
		'Reeds',
		'Sawgrass',
		'Seaweed',
		'Bamboo',
		'Blossoms',
		'Cherry Blossoms',
		'Dogwood Blossoms',
		'Misc Blossoms',
		'Redbud Blossoms',
		'Carnivorous Plants',
		'Desert Plants',
		'Agaves',
		'Cholla Cactus',
		'Cryptobiotic Soil',
		'Joshua Trees',
		'Misc Cactus',
		'Ocatilos',
		'Organ Pipe Cactus',
		'Palo Verde',
		'Saguaro Cactus',
		'Sotols',
		'Succulents',
		'Yuccas',
		'Epiphytes',
		'Bromeliads',
		'Lichen',
		'Moss',
		'Spanish Moss',
		'Fall Colors',
		'Ferns',
		'Forests',
		'Bare Forests',
		'Boreal Forests',
		'Burned Forests',
		'Conifer Forests',
		'Giant Tree Forests',
		'Temperate Forests',
		'Temperate Rainforests',
		'Tropical Forests',
		'Tropical Rainforests',
		'Grasses',
		'Lianas',
		'Mushrooms',
		'Shrubs',
		'Berries',
		'Coreopsis Plant',
		'Manzanita',
		'Mesquite',
		'Misc Bushes',
		'Sagebrush',
		'Silversword',
		'Tree Parts',
		'Branches',
		'Pine cones',
		'Fruits',
		'Leaves',
		'Roots',
		'Trunk',
		'Trees',
		'Aspens',
		'Bald Cypress',
		'Banyan Trees',
		'Birch Trees',
		'Bristlecone Pine',
		'Conifers',
		'Cottonwoods',
		'Cypress Mediterranean',
		'Cypress Monterey and California',
		'Elm Trees',
		'Eucalyptus',
		'Fallen Trees',
		'Junipers',
		'Koa Trees',
		'Maple Trees',
		'Misc Trees',
		'Oak Trees',
		'Olive Trees',
		'Palm Trees',
		'Pandanus',
		'Pine Trees',
		'Redwoods',
		'Sequoias',
		'Spruce Trees',
		'Tree Skeletons',
		'Undergrowth',
		'Vines',
		'Wilderness',
		'Aerial Views of Nature',
		'Close Ups of Nature',
		'Intimate Landscapes',
		'Underwater Views',
		'Wild Scenics',
		'People and Activities',
		'Artists',
		'Cineasts',
		'Craftmen',
		'Dancers',
		'Musicians',
		'Painters',
		'Performers',
		'Photographers',
		'Children',
		'Babies',
		'Boys',
		'Girls',
		'Couples',
		'Crowds',
		'Daily Activities',
		'People Buying and Selling',
		'People Carrying Things',
		'People Celebrating',
		'People Doing Agricultural Work',
		'People Eating',
		'People Exercising',
		'People In Worship',
		'People Looking',
		'People Playing',
		'People Reading',
		'People Riding',
		'People Sleeping',
		'People Talking',
		'People Walking and Strolling',
		'People Working',
		'Families',
		'People in the distance',
		'Men',
		'Monks and Priests',
		'Outdoor Recreation',
		'Backpacking',
		'Bathing and Swimming',
		'People on the beach',
		'Campfires',
		'Camping',
		'Dog Mushing',
		'Fishing',
		'Paragliding and Hang-gliding',
		'Hiking',
		'People riding horses',
		'Hunting',
		'Ice Climbing',
		'Mountaineering',
		'Paddling',
		'Canoes',
		'Kayaks',
		'Rafts',
		'Rowing',
		'Rock Climbing',
		'Scuba Diving and Snorkling',
		'Skiing',
		'Surfing',
		'Portraits',
		'Ethnic groups',
		'African American People',
		'American Old-Timers',
		'Arab Bedouin People',
		'Asian Hill Tribe People',
		'Burmese People',
		'Chinese People',
		'Eskimo and Native Americans',
		'Hispanic People',
		'Indian People',
		'Japanese People',
		'Khmer Children',
		'Naxi People',
		'Pacific Islanders',
		'Thai People',
		'Uniformed People',
		'Graduates',
		'Park Rangers',
		'Schoolchildren',
		'Soldiers and Guards',
		'Weddings',
		'Women',
		'Styles',
		'Aerial Views',
		'Close Ups',
		'Elevated Views',
		'Ground Views',
		'Inside',
		'Long Exposure',
		'Looking Up',
		'Night',
		'Nobody',
		'Outside',
		'Reflexions',
		'Scenics Skyless',
		'Scenics with Sky',
		'Studio',
	];

	return [themes[Math.floor(Math.random() * themes.length)], themes[Math.floor(Math.random() * themes.length)], themes[Math.floor(Math.random() * themes.length)]];
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ThemeSelect = () => {
	const { setImage, setGameState, setFakeImage, amIChooser } = useContext(DataContext);
	const [themes, setThemes] = useState<string[]>(get3Themes());

	const Handler = async (theme: string) => {
		setGameState('playing');
		write('theme', theme);
		const res1 = await fetch('https://source.unsplash.com/random/?' + theme);
		await sleep(1000);
		const res2 = await fetch('https://source.unsplash.com/random/?' + theme);
		await sleep(1000);
		const res3 = await fetch('https://source.unsplash.com/random/?' + theme);
		await sleep(1000);
		const res4 = await fetch('https://source.unsplash.com/random/?' + theme);

		setImage(res1.url);
		setFakeImage([res2.url, res3.url, res4.url]);
	};

	return (
		<>
			<h1>Theme Select</h1>
			{amIChooser ? <div>{themes && themes.map((theme) => <button onClick={() => Handler(theme)}>{theme}</button>)}</div> : <p>Waiting for chooser to choose</p>}
		</>
	);
};

export default ThemeSelect;
