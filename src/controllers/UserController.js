const axios = require('axios'); 
const User = require('../models/user');
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
    //index, show, store, update, destroy
    async index(request, response) {
        const users = await User.find();
        // const userConverter = row => (
        //     row.map(user => {
        //         {
        //             id: user._id,
        //             name: user.user_name
        //         }
        //     })
        //     );

        const retornoMap = users.map(user => {
            return {
                        id: user._id,
                        name: user.user_name
                    };
        })

        return response.json(retornoMap);
    },

    async findByNameAndPassword(request, response) {
        const { user_name, user_password } = request.body;

        const userConverter = row => ({
            id: row._id,
            name: row.user_name
        });

        let user = await User.findOne({ user_name, user_password });

        if(!user) { 
            response.status(400).json(`Erro ao buscar o usuário!`);
        } else {
            return response.json(userConverter(user));
        }
    },

    async store(request, response) {
        const userConverter = row => ({
            id: row._id,
            name: row.user_name
        });

        const { user_name, user_password } = request.body;
        
        let user = await User.findOne({ user_name });

        if(!user) {
                
            user = await User.create({
                user_name,
                user_password
            })
        }
           
        return response.json(userConverter(user));
    }
}