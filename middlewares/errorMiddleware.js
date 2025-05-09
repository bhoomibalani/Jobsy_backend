//error middleware || next  funtion

const errorMiddleware=(err,req,res,next)=>{
    console.log(err)
    res.status(500).send({
        success:false,
        message:'something went wrng',
        err,
    });
};

export default errorMiddleware;