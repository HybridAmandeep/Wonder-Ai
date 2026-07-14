/**
 * WanderAI – Central Data Layer
 * Persisted in localStorage. Accessible globally via window.WanderData.
 */
(function() {
    const DESTINATIONS = [
        {
            id: "santorini",
            name: "Santorini",
            country: "Greece",
            price: 1299,
            duration: 5,
            rating: 4.9,
            reviewsCount: "2.4k",
            description: "Famous for its dramatic views, whitewashed houses with blue domes, active volcano, and stunning sunsets over the Aegean Sea.",
            image: "images/mountain_landscape.png", // Base image, we can enrich with online source or fallbacks
            category: "beach",
            bestSeason: "May to October",
            coordinates: { lat: 36.4166, lon: 25.4324 },
            activities: ["Sunset sailing in Oia", "Volcano & hot springs tour", "Wine tasting", "Akrotiri archaeological site tour"]
        },
        {
            id: "kyoto",
            name: "Kyoto",
            country: "Japan",
            price: 1599,
            duration: 7,
            rating: 4.8,
            reviewsCount: "1.8k",
            description: "The historical heart of Japan, famous for its thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses.",
            image: "images/travel_photography.png",
            category: "culture",
            bestSeason: "October to November (Autumn) & April (Cherry Blossoms)",
            coordinates: { lat: 35.0116, lon: 135.7681 },
            activities: ["Arashiyama Bamboo Grove walk", "Fushimi Inari Shrine hike", "Kinkaku-ji (Golden Pavilion) visit", "Traditional tea ceremony"]
        },
        {
            id: "maldives",
            name: "Maldives",
            country: "Maldives",
            price: 2199,
            duration: 6,
            rating: 4.9,
            reviewsCount: "3.1k",
            description: "A tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands. Renowned for its beaches, blue lagoons, and extensive reefs.",
            image: "images/airplane_map.png",
            category: "beach",
            bestSeason: "November to April",
            coordinates: { lat: 3.2028, lon: 73.2207 },
            activities: ["Snorkeling with manta rays", "Overwater villa stay", "Sunset dolphin cruise", "Private sandbar dinner"]
        },
        {
            id: "swiss-alps",
            name: "Swiss Alps",
            country: "Switzerland",
            price: 1899,
            duration: 5,
            rating: 4.7,
            reviewsCount: "1.2k",
            description: "Breathtaking mountain range offering world-class skiing, hiking, mountaineering, and scenic train rides through pristine valley landscapes and snow-capped peaks.",
            image: "images/minimal_ui_illustration.png",
            category: "adventure",
            bestSeason: "December to March (Skiing) & June to September (Hiking)",
            coordinates: { lat: 46.8182, lon: 8.2275 },
            activities: ["Jungfraujoch Sphinx Observatory visit", "Zermatt paragliding", "Glacier Express train journey", "Lake Geneva boat cruise"]
        },
        {
            id: "bali",
            name: "Bali",
            country: "Indonesia",
            price: 999,
            duration: 8,
            rating: 4.8,
            reviewsCount: "2.7k",
            description: "Known for its forested volcanic mountains, iconic rice paddies, beaches, coral reefs, and rich spiritual culture with thousands of unique temples.",
            image: "images/travel_photography.png",
            category: "nature",
            bestSeason: "April to October",
            coordinates: { lat: -8.4095, lon: 115.1889 },
            activities: ["Tegallalang Rice Terrace tour", "Uluwatu Temple sunset dance", "Scuba diving in Tulamben", "Mount Batur sunrise trek"]
        },
        {
            id: "reykjavik",
            name: "Reykjavik & Northern Lights",
            country: "Iceland",
            price: 1799,
            duration: 5,
            rating: 4.8,
            reviewsCount: "1.5k",
            description: "Experience the magic of Iceland. Discover geothermal geysers, black sand beaches, majestic waterfalls, and view the aurora borealis dancing across the arctic sky.",
            image: "images/mountain_landscape.png",
            category: "adventure",
            bestSeason: "September to April",
            coordinates: { lat: 64.1466, lon: -21.9426 },
            activities: ["Northern Lights hunting tour", "Golden Circle route tour", "Blue Lagoon thermal spa soak", "Black Sand Beach walk in Vik"]
        },
        {
            id: "petra",
            name: "Petra Ancient City",
            country: "Jordan",
            price: 1499,
            duration: 4,
            rating: 4.9,
            reviewsCount: "1.1k",
            description: "A famous archaeological site in Jordan's southwestern desert. Dating to around 300 B.C., it was the capital of the Nabataean Kingdom. It contains tombs and temples carved into pink sandstone cliffs.",
            image: "images/travel_photography.png",
            category: "culture",
            bestSeason: "March to May & September to November",
            coordinates: { lat: 30.3285, lon: 35.4444 },
            activities: ["Treasury (Al-Khazneh) walk", "Petra by Night candlelit tour", "Monastery hiking trail climb", "Wadi Rum desert jeep safari"]
        },
        {
            id: "banff",
            name: "Banff National Park",
            country: "Canada",
            price: 1399,
            duration: 6,
            rating: 4.8,
            reviewsCount: "1.9k",
            description: "Canada's oldest national park, nestled in the Rocky Mountains. Famous for its surreal turquoise glacial lakes (Lake Louise, Moraine Lake), abundant wildlife, and outdoor pursuits.",
            image: "images/minimal_ui_illustration.png",
            category: "nature",
            bestSeason: "June to August (Lakes) & December to April (Skiing)",
            coordinates: { lat: 51.4968, lon: -115.9281 },
            activities: ["Moraine Lake canoeing", "Banff Gondola ride", "Johnston Canyon ice walk", "Icefields Parkway road trip"]
        },
        {
            id: "cairo",
            name: "The Giza Pyramids & Cairo",
            country: "Egypt",
            price: 1199,
            duration: 5,
            rating: 4.7,
            reviewsCount: "2.1k",
            description: "Explore the ancient wonders of Egypt, including the Great Sphinx, the Giza Pyramids, and the vast historical treasures of the Grand Egyptian Museum on the banks of the Nile.",
            image: "images/travel_photography.png",
            category: "culture",
            bestSeason: "October to April",
            coordinates: { lat: 30.0444, lon: 31.2357 },
            activities: ["Giza Pyramids & Sphinx camel ride", "Nile River felucca cruise", "Khan el-Khalili bazaar shopping", "Egyptian Museum guided tour"]
        },
        {
            id: "queenstown",
            name: "Queenstown Adventure",
            country: "New Zealand",
            price: 1999,
            duration: 7,
            rating: 4.9,
            reviewsCount: "1.6k",
            description: "The adventure capital of the world, Queenstown sits on the shores of Lake Wakatipu against the dramatic Southern Alps. Popular for bungee jumping, jet boating, and skiing.",
            image: "images/airplane_map.png",
            category: "adventure",
            bestSeason: "December to February (Summer) & June to August (Winter)",
            coordinates: { lat: -45.0312, lon: 168.6626 },
            activities: ["Shotover Jet boat ride", "Milford Sound day tour", "Bungee jumping at Kawarau Bridge", "Coronet Peak night skiing"]
        },
        {
            id: "amalfi",
            name: "Amalfi Coast",
            country: "Italy",
            price: 1699,
            duration: 6,
            rating: 4.8,
            reviewsCount: "2.3k",
            description: "A 50-kilometer stretch of coastline along the southern edge of Italy's Sorrentine Peninsula. Famous for its sheer cliffs, rugged shoreline, pastel-colored fishing villages, and terraced vineyards.",
            image: "images/mountain_landscape.png",
            category: "beach",
            bestSeason: "May to September",
            coordinates: { lat: 40.6331, lon: 14.6027 },
            activities: ["Path of the Gods hike", "Positano boat charter", "Limoncello tasting in Amalfi", "Ravello villa gardens tour"]
        },
        {
            id: "serengeti",
            name: "Serengeti National Park",
            country: "Tanzania",
            price: 2499,
            duration: 6,
            rating: 4.9,
            reviewsCount: "1.4k",
            description: "A vast African savanna ecosystem renowned for its annual wildebeest migration, massive herds of zebras, gazelles, and the highest concentration of large predators in Africa.",
            image: "images/travel_photography.png",
            category: "nature",
            bestSeason: "January to March & June to October",
            coordinates: { lat: -2.1540, lon: 34.6857 },
            activities: ["Serengeti hot air balloon safari", "Game drive to track the Big Five", "Maasai village cultural visit", "Great Migration river crossing viewing"]
        }
    ];

    // Initialize local storage keys if they don't exist
    if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify([]));
    if (!localStorage.getItem('currentUser')) localStorage.setItem('currentUser', 'null');
    if (!localStorage.getItem('wishlist')) localStorage.setItem('wishlist', JSON.stringify([]));
    if (!localStorage.getItem('bookings')) localStorage.setItem('bookings', JSON.stringify([]));
    if (!localStorage.getItem('notifications')) {
        const welcomeNotifs = [
            {
                id: "notif_welcome",
                title: "Welcome to WanderAI!",
                message: "Start exploring destinations, build your dream itinerary, and book your next trip.",
                timestamp: new Date().toISOString(),
                unread: true,
                type: "welcome"
            }
        ];
        localStorage.setItem('notifications', JSON.stringify(welcomeNotifs));
    }

    // Main API object exported to window
    const WanderData = {
        // Destination List
        getDestinations: function() {
            return DESTINATIONS;
        },

        getDestinationById: function(id) {
            return DESTINATIONS.find(d => d.id === id) || null;
        },

        // User Auth
        signup: function(email, password, name = '') {
            const users = JSON.parse(localStorage.getItem('users'));
            if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
                return { success: false, message: "User with this email already exists." };
            }
            const newUser = {
                id: "user_" + Math.random().toString(36).substr(2, 9),
                email: email,
                password: password,
                name: name || email.split('@')[0],
                plan: "Explorer ($0/mo)",
                signupDate: new Date().toISOString()
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            this.setCurrentUser(newUser);

            // Trigger welcome notification
            this.addNotification(
                "Welcome to WanderAI!",
                `Hi ${newUser.name}, welcome aboard! Choose one of our premium plans to unlock advanced features.`,
                "welcome"
            );

            return { success: true, user: newUser };
        },

        login: function(email, password) {
            const users = JSON.parse(localStorage.getItem('users'));
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
            if (user) {
                this.setCurrentUser(user);
                return { success: true, user: user };
            }
            return { success: false, message: "Invalid email or password." };
        },

        logout: function() {
            localStorage.setItem('currentUser', 'null');
        },

        getCurrentUser: function() {
            const u = localStorage.getItem('currentUser');
            return u === 'null' ? null : JSON.parse(u);
        },

        setCurrentUser: function(user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            // Sync user data to users database if fields changed
            if (user) {
                const users = JSON.parse(localStorage.getItem('users'));
                const index = users.findIndex(u => u.id === user.id);
                if (index !== -1) {
                    users[index] = user;
                    localStorage.setItem('users', JSON.stringify(users));
                }
            }
        },

        updateUserPlan: function(planName) {
            const user = this.getCurrentUser();
            if (user) {
                user.plan = planName;
                this.setCurrentUser(user);
                this.addNotification(
                    "Plan Updated Successfully!",
                    `You are now subscribed to the ${planName} plan. Enjoy all its premium benefits!`,
                    "plan"
                );
                return true;
            }
            return false;
        },

        // Wishlist
        getWishlist: function() {
            return JSON.parse(localStorage.getItem('wishlist'));
        },

        toggleWishlist: function(destinationId) {
            const wishlist = this.getWishlist();
            const index = wishlist.indexOf(destinationId);
            let added = false;
            if (index === -1) {
                wishlist.push(destinationId);
                added = true;
                const dest = this.getDestinationById(destinationId);
                if (dest) {
                    this.addNotification(
                        "Added to Wishlist",
                        `${dest.name} has been added to your dream destinations list.`,
                        "wishlist"
                    );
                }
            } else {
                wishlist.splice(index, 1);
            }
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            return added;
        },

        isWishlisted: function(destinationId) {
            const wishlist = this.getWishlist();
            return wishlist.includes(destinationId);
        },

        // Bookings
        getBookings: function() {
            const user = this.getCurrentUser();
            if (!user) return [];
            const allBookings = JSON.parse(localStorage.getItem('bookings'));
            return allBookings.filter(b => b.userId === user.id);
        },

        addBooking: function(destinationId, startDate, endDate, guests, totalAmount, paymentDetails) {
            const user = this.getCurrentUser();
            if (!user) return { success: false, message: "User not logged in." };

            const dest = this.getDestinationById(destinationId);
            if (!dest) return { success: false, message: "Invalid destination." };

            const allBookings = JSON.parse(localStorage.getItem('bookings'));
            const newBooking = {
                id: "BK_" + Math.floor(100000 + Math.random() * 900000),
                userId: user.id,
                destinationId: destinationId,
                destinationName: dest.name,
                destinationImage: dest.image,
                startDate: startDate,
                endDate: endDate,
                guests: parseInt(guests) || 1,
                totalAmount: totalAmount,
                status: "upcoming", // upcoming, completed, cancelled
                bookingDate: new Date().toISOString()
            };

            allBookings.push(newBooking);
            localStorage.setItem('bookings', JSON.stringify(allBookings));

            this.addNotification(
                "Booking Confirmed!",
                `Your trip to ${dest.name} (${startDate} to ${endDate}) is confirmed. Booking ID: ${newBooking.id}`,
                "booking"
            );

            return { success: true, booking: newBooking };
        },

        // Notifications
        getNotifications: function() {
            return JSON.parse(localStorage.getItem('notifications')) || [];
        },

        addNotification: function(title, message, type = "info") {
            const notifications = this.getNotifications();
            notifications.unshift({
                id: "notif_" + Math.random().toString(36).substr(2, 9),
                title: title,
                message: message,
                timestamp: new Date().toISOString(),
                unread: true,
                type: type
            });
            localStorage.setItem('notifications', JSON.stringify(notifications));
            
            // Dispatch custom event for UI updates
            window.dispatchEvent(new CustomEvent('wanderNotifUpdate'));
        },

        markNotificationsAsRead: function() {
            const notifications = this.getNotifications();
            notifications.forEach(n => n.unread = false);
            localStorage.setItem('notifications', JSON.stringify(notifications));
            window.dispatchEvent(new CustomEvent('wanderNotifUpdate'));
        },

        clearNotifications: function() {
            localStorage.setItem('notifications', JSON.stringify([]));
            window.dispatchEvent(new CustomEvent('wanderNotifUpdate'));
        },

        // Search engine
        search: function(query, options = {}) {
            let results = DESTINATIONS;

            if (query && query.trim() !== '') {
                const q = query.toLowerCase().trim();
                results = results.filter(d => 
                    d.name.toLowerCase().includes(q) || 
                    d.country.toLowerCase().includes(q) ||
                    d.description.toLowerCase().includes(q)
                );
            }

            if (options.category && options.category !== 'all') {
                results = results.filter(d => d.category === options.category);
            }

            if (options.maxPrice) {
                results = results.filter(d => d.price <= options.maxPrice);
            }

            if (options.maxDuration) {
                results = results.filter(d => d.duration <= options.maxDuration);
            }

            if (options.minRating) {
                results = results.filter(d => d.rating >= options.minRating);
            }

            return results;
        },

        // Real-world Weather integration (OpenWeatherMap API + rich mock logic)
        getWeather: async function(destinationName, lat, lon) {
            try {
                const API_KEY = localStorage.getItem('OWM_API_KEY') || '56de75c604b901594ccf4153b827dbd2';
                
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
                if (!response.ok) throw new Error("API Limit or configuration error");
                
                const data = await response.json();
                return {
                    temp: Math.round(data.main.temp),
                    feelsLike: Math.round(data.main.feels_like),
                    description: data.weather[0].description,
                    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                    humidity: data.main.humidity,
                    windSpeed: Math.round(data.wind.speed * 3.6),
                    source: "live"
                };
            } catch (err) {
                const randomTempOffset = Math.floor(Math.random() * 5) - 2;
                let baseTemp = 20;
                let desc = "Clear sky";
                let iconCode = "01d";
                let humidity = 60;
                let wind = 12;

                const nameLower = destinationName.toLowerCase();
                if (nameLower.includes("swiss") || nameLower.includes("banff") || nameLower.includes("reykjavik")) {
                    baseTemp = nameLower.includes("reykjavik") ? 4 : 8;
                    desc = Math.random() > 0.5 ? "Light snow" : "Cloudy";
                    iconCode = "13d";
                    humidity = 78;
                } else if (nameLower.includes("maldives") || nameLower.includes("bali") || nameLower.includes("santorini") || nameLower.includes("amalfi")) {
                    baseTemp = 28;
                    desc = Math.random() > 0.7 ? "Scattered clouds" : "Sunny";
                    iconCode = "01d";
                    humidity = 65;
                } else if (nameLower.includes("cairo") || nameLower.includes("petra")) {
                    baseTemp = 32;
                    desc = "Hot and dry";
                    iconCode = "01d";
                    humidity = 30;
                } else if (nameLower.includes("kyoto") || nameLower.includes("queenstown")) {
                    baseTemp = 16;
                    desc = "Mild breeze";
                    iconCode = "02d";
                    humidity = 55;
                }

                return {
                    temp: baseTemp + randomTempOffset,
                    feelsLike: baseTemp + randomTempOffset - 1,
                    description: desc,
                    icon: `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
                    humidity: humidity,
                    windSpeed: wind,
                    source: "simulated"
                };
            }
        }
    };

    window.WanderData = WanderData;
})();
