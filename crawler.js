const axios = require('axios')
url = 'https://www.luxstay.com/api/'
getRoomSeed = async(url) => {
    try {
        rooms_dataset = []
        for (let page = 1; page <= 450; page++) {
            console.log(`${page}/450`)
            res_overall = await axios.get(`${url}search`, { params: { page: page } })
            data_overall = res_overall.data.data
                // console.log(data_overall[0].id)
                // room = data_overall[1]
                // room_id = room.id
                // res_details = await axios.get(`${url}rooms/${room_id}`, { detailed: true })
                // console.log(res_details.data.data)
            for (room in data_overall) {
                room_id = data_overall[room].id
                res_details = await axios.get(`${url}rooms/${room_id}`, { params: { detailed: true } })
                data_details = res_details.data.data
                    // console.log(data_details)
                rd = {}
                rd["num_bedrooms"] = data_details.num_bedrooms
                rd["num_bathrooms"] = data_details.num_bathrooms
                rd["num_beds"] = data_details.num_beds
                rd["area"] = data_details.area
                rd["maximum_guests"] = data_details.maximum_guests
                rd["rating"] = data_details.rating
                rd["review_count"] = data_details.review_count
                rd["price"] = data_details.price.data
                rd["amenities"] = {}
                facilities = ["Wifi", "TV", "Ban công", "Điều hòa", "Máy giặt", "Lò vi sóng", "Tủ lạnh"]
                for (f in facilities) {
                    rd["amenities"][facilities[f]] = false
                }
                amenities = data_details.amenities.data
                for (a in amenities) {
                    ame = amenities[a]
                    if (facilities.includes(ame.name)) {
                        rd["amenities"][ame.name] = true
                    }
                }
                // rd["amenities"]["Wifi"] = false
                //console.log(rd)
                rooms_dataset.push(rd)
            }
        }
        const fs = require('fs');
        const jsonRoomsDataset = JSON.stringify(rooms_dataset);

        fs.writeFile("./roomDataset.json", jsonRoomsDataset, 'utf8', function(err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    } catch (exception) {
        console.log(exception)
    }

}

getRoomSeed(url)