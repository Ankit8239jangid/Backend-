import multer from "multer"  

const storage = multer.diskStorage({
    discription:function(req, file , cb){
        cb(null, "./public/temp")
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }           

})

const upload = multer({storage:storage})

export default upload