const { get, trusted } = require('mongoose');
const food = require('../modules/food');
const { search, patch } = require('../routes/category');


module.exports = {

    addFood: async (req, res) => {
        const { title, foodTags, category, code, restaurant, description, time, price, addituves, imageUrl } = req.body;

        if (!title || !foodTags || !category || !code || !restaurant || !description || !time || !price || !addituves || !imageUrl) {
            return res.status(400).json({ status: false, message: "You have missing field" });
        }
        try {
            const newFood = new food(req.body);
            await newFood.save();
            res.status(201).json({ status: true, message: "Food added successfully" });

        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    },

    getFoodById: async (req, res) => {
        const id = req.params.id;
        try {
            const foodId = await food.findById(id);
            res.status(200).json(foodId);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getRandomFoods: async (req, res) => {
        const code = req.params.code;
        try {
            let foods = [];
            if (code) {
                foods = await food.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } }
                ])

                res.status(200).json(foods);
            }

            if (food.length == 0) {
                foods = await food.aggregate([
                    { $match: { isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } }
                ])

                res.status(200).json(foods);
            }
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getFoodsByRestaurent: async (req, res) => {
        const resId = req.params.id;
        try {
            const food = await food.find({ restaurant: resId });
            res.status(200).json(food);

        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }

    },

    getFoodsByCategoryAndCode: async (req, res) => {
        const { code, category } = req.params;
        try {
            const foods = await food.aggregate([
                {
                    $match: {
                        category: category,
                        code: code,
                        isAvailable: true
                    }
                },
                {
                    $project: { __v: 0 }
                }
            ]);

            if (food.length == 0) {
                res.status(200).json([]);
            }

            res.status(200).json(food);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }

    },

    searchFoods: async (req, res) => {
        const search = req.params.search;
        if(!search){
            return res.status(400).json({status: false, message: "You have missing field"});

        }
        try {
            const foods = await food.aggregate([
                {
                    $search: {
                        index: "foods",
                        text: {
                            query: search,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                },
                { $project: { __v: 0 } }
            ]);
            res.status(200).json(foods);

        } catch (error) {
            res.status(500).json({ status: 500, message: error.message })
        }
    },

    getRandomFoodsByCategoryAndCode : async (req, res) => {
        const { code, category } = req.params;
        try {
            let foods;

            foods = await food.aggregate([
                {
                    $match: {
                        category: category,
                        code: code,
                        isAvailable: true
                    }
                },
                { $sample: { size: 10 }
             }
            ]);

            if(!foods || foods.length == 0){
                foods = await food.aggregate([
                    {
                        $match: {
                           
                            isAvailable: true
                        }
                    },
                    { $sample: { size: 10}
                 }
                ]);

            }
        } catch (error) {
            
        }

    }





}


