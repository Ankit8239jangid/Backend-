
/*
 *! This is the Promises methode to create a waper function */

const asyncHandler = (reqHandler) => {
    return (req, res, next) => {
      Promise.resolve(reqHandler(req, res, next)).catch(next);
    };
  };
  

export {asyncHandler}



/*
 *! This is the Try catch methode to create a waper function */

// const asyncHandler = (fn) => async (req ,res ,next) => {
//     try {

//         await fn(req , res , next )
        
//     } catch (error) {

//         res.send(error.code || 500).json({
//             success : false,
//             message : err.message,

//         })
        
//     }
// }

// export {asyncHandler}


