const User = require("../../model/User");

const handleAgregarAlCarrito = async (req, res) => {
  try {
    const item = req.body;
    const foundUser = await User.findOne({ username: req.user }).exec();
    if (!foundUser) return res.sendStatus(403);
    foundUser.ordersMade.push(item); // Add the product to the user's cart
    await foundUser.save();
    res.json({ response: "Done" });
  } catch (error) {
    // ... error handling ...
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = { handleAgregarAlCarrito };
