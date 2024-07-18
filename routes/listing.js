const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingCotroller = require("../controllers/listing.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage})


router
    .route("/")
    .get(wrapAsync (listingCotroller.index))
    .post( 
        isLoggedIn,
      
        upload.single('listing[image]'),
        validateListing,
        wrapAsync (listingCotroller.createListing)
    );
// New route
router.get("/new", isLoggedIn, listingCotroller.renderNewForm);

router.
    route("/:id")
    .get(wrapAsync (listingCotroller.showListing)
    )
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync (listingCotroller.updateListing)
    )
    .delete( 
        isLoggedIn,
        isOwner,
        wrapAsync (listingCotroller.deleteListing)
    )

// Edit Route
router.get("/:id/edit", 
    isLoggedIn,
    isOwner,
    wrapAsync (listingCotroller.renderEditForm));



module.exports = router;