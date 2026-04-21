const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");
const Fuse = require("fuse.js");
const { v4: uuidv4 } = require("uuid");
const Child = require("../models/Child");

// Register Child API
router.post("/register", async (req, res) => {
  try {
    const { name, guardianName, guardianAdharCardNumber, dob, phone, location } = req.body;

    // 🔥 STEP 1: Normalize data (important)
    const normalizedName = name.toLowerCase().trim();
    const normalizedGuardian = guardianName.toLowerCase().trim();

    // 🔥 STEP 2: Check duplicate
    const existing = await Child.findOne({
      name: normalizedName,
      guardianName: normalizedGuardian,
      guardianAdharCardNumber: guardianAdharCardNumber,
      phone: phone
    });

    if (existing) {
      return res.status(400).json({
        message: "⚠️ Child already exists",
        data: existing
      });
    }

    // 🔥 STEP 3: Generate UCI
    const uci = "UCI-" + uuidv4().slice(0, 8);

    // 🔥 STEP 4: Save new child
    const newChild = new Child({
      uci,
      name: normalizedName,
      guardianName: normalizedGuardian,
      guardianAdharCardNumber,
      dob,
      phone,
      location,
      vaccinations: []
    });

    await newChild.save();

    res.json({
      message: "Child registered successfully",
      uci,
      data: newChild
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//fetch child uci route

router.get("/:uci", async (req, res) => {
  try {
    const child = await Child.findOne({ uci: req.params.uci });

    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    res.json(child);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//generate qr code route
router.get("/qr/:uci", async (req, res) => {
  try {
    const { uci } = req.params;

    const qrData = `http://localhost:5000/api/child/${uci}`;

    const qrImage = await QRCode.toDataURL(qrData);

    res.json({
      uci,
      qr: qrImage
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Smart Search API


router.post("/search", async (req, res) => {
  try {
    const { name, guardianName,guardianAdharCardNumber, phone, dob, location } = req.body;

    const children = await Child.find();

    // 👉 Check how many fields are filled
    const filledFields = [name, guardianName, guardianAdharCardNumber, phone, dob, location].filter(Boolean);

    let results = [];

    // 🔥 CASE 1: Multiple fields → strict filtering
    if (filledFields.length > 1) {
      results = children.filter(child => {
        let score = 0;

        if (name && child.name.toLowerCase().includes(name.toLowerCase())) score++;
        
        if (guardianName && child.guardianName.toLowerCase().includes(guardianName.toLowerCase())) score++;
        if (guardianAdharCardNumber && child.guardianAdharCardNumber === guardianAdharCardNumber) score++;
        if (phone && child.phone.includes(phone)) score++;
        if (location && child.location.toLowerCase().includes(location.toLowerCase())) score++;

  return score >= 3; // at least three matches
});
    }

    // 🔥 CASE 2: Single field → fuzzy search
    else if (filledFields.length === 1) {
      const fuse = new Fuse(children, {
        keys: ["name", "guardianName","guardianAdharCardNumber", "phone", "location"],
        threshold: 0.4
      });

      results = fuse.search(filledFields[0]).map(r => r.item);
    }


    // If Fuse used → extract item
if (filledFields.length === 1) {
  return res.json(results.map(r => r.item));
}

// Otherwise direct results
return res.json(results);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const children = await Child.find().sort({ createdAt: -1 });
    res.json(children);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); 


// ✅ VERY IMPORTANT LINE
module.exports = router;