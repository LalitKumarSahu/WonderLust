module.exports = (fn) =>{ // ye req,res,next ko accept krega
  return (req, res,next) =>{ // ek new fcn jo req,res,next ko accept krega
    fn(req,res,next).catch(next); // ek promise return karta hai agr error hai to catch kar dega
  }
}