class Myhelper{
    static  reshandlar=(res,statusCode,apisStatus,data,message )=>{
        return res.status(statusCode).send({
            apisStatus,data,message
        })
    }
}
module.exports=Myhelper