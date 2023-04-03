const Dealer = require('../models/dealerModel')
const Products = require('../models/productModel')

const dealerCtrl = {
    getDealers: async(req, res) =>{
        try {
            const dealers = await Dealer.find()
            res.json(dealers)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createDealer: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update dealer
            const {name} = req.body;
            const dealer = await Dealer.findOne({name})
            if(dealer) return res.status(400).json({msg: "This Dealer already exists."})

            const newDealer = new Dealer({name})

            await newDealer.save()
            res.json({msg: "Created a dealer"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteDealer: async(req, res) =>{
        try {
            const products = await Products.findOne({dealer: req.params.id})
            if(products) return res.status(400).json({
                msg: "Please delete all products with a relationship."
            })

            await Dealer.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Dealer"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateDealer: async(req, res) =>{
        try {
            const {name} = req.body;
            await Dealer.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a Dealer"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = dealerCtrl