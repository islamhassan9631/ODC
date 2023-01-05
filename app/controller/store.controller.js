const { models } = require("mongoose")
const storeModel = require("../../db/models/store.model")
const Myhelper=require("../helper")
class Store{
    static addstore = async(req,res)=>{
        try{
            const store = new storeModel({
                userId: req.user._id,
                ...req.body
            })
            await store.save()
            Myhelper.reshandlar(res, 200, true, store, "added")

        }
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }
    }
    static mystore = async(req,res)=>{
        try{ 
            
            await req.user.populate("mystore")
            Myhelper.reshandlar(res, 200, true, {
                store: req.user.store,
                user: req.user
            }, "added")
}
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }

    }
    static Allstore=( async (req, res) => {
        
        try {
           let store = await storeModel.find()
           
             
            
            Myhelper.reshandlar(res, 200, true, {
                store
            }, "dane")
        }
        catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)

        }
    })
}

module.exports = Store;