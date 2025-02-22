const restaurant = require('../modules/restaurant');

module.exports = {

    addRestaurent: async (req, res) => {
       console.log("Received request for  addRestaurent");
        const { title, time, imageUrl, owner, code, logoUrl, coords } = req.body;

        if (!title || !time || !imageUrl || !owner || !logoUrl || !code
            || !coords || !coords.latitude || !coords.longitude || !coords.address || !coords.title) {

            return res.status(400).json({ status: false, message: "You have missing field" });

        }

        try {
            const newRestaurent = new restaurant(req.body);
            await newRestaurent.save();
            res.status(200).json({ status: true, message: "Restaurentr added successfully" });

        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });

        }
    },

    getRestaurentById: async (req, res) => {
        const id = req.params.id;
        try {
            const restaurantId = await restaurant.findById(id);
            res.status(200).json(restaurantId);
        } catch (error) {
            res.status(500).json({status: false, message : error.message});
        }
    },

    getRandomeRestaurents: async (req, res) => {
        const code = req.params.code;
        try {
            let randomRes = [];
            if (code) {
                randomRes = await restaurant.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } }
                ])
            }

            if (randomRes.length == 0) {
                randomRes = await restaurant.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } }
                ])
            }

            res.status(200).json(randomRes);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getAllNearByRestaurents: async (req, res) => {

        const code = req.params.code;
        try {
            let nearByRes = [];
            if (code) {
                nearByRes = await restaurant.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $project: { __v: 0 } }
                ])
            }

            if (nearByRes.length == 0) {
                nearByRes = await restaurant.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $project: { __v: 0 } }
                ])
            }

            res.status(200).json(nearByRes);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },



};