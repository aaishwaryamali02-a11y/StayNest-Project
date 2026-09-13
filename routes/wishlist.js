const express=require("express");
const router=express.Router();
const User=require("../models/user");
const {isLoggedIn}=require("../middleware");


router.get("/",isLoggedIn,async(req,res)=>{
  const user=await User.findById(req.user._id).populate("wishlist");

  res.render("listings/wishlist.ejs",{
    wishlist:user.wishlist
  });
});

router.post("/:listingId",isLoggedIn,async(req,res)=>{
  const {listingId}=req.params;
  const user=await User.findById(req.user._id);

  if(!user.wishlist.includes(listingId)){
    user.wishlist.push(listingId);
    await user.save();
  }

  res.json({success:true});
});

router.delete("/:listingId",isLoggedIn,async(req,res)=>{
  const {listingId}=req.params;
  const user=await User.findById(req.user._id);

  user.wishlist=user.wishlist.filter(
    id=>id.toString()!==listingId
  );

  await user.save();

  res.json({success:true});
});

module.exports=router;