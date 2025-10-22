let express = require('express');
let router = express.Router();

const publicAddress = "0xEcc179a1b25Dad72D022CD830F9d26221fcA8A81";
const privateKey = "<YOUR_PK>";

router.get('/', function(req, res) {
    res.render('index', {
        balance: getBalance(publicAddress),
        error: req.flash('error'),
        success: req.flash('success'),
        address: publicAddress
    });
});

router.post('/', function (req, res) {
    let ethAmount = req.body.amount;
    let address = req.body.address;

    if (ethAmount === undefined || ethAmount === "") {
        req.flash('error', "The amount to sent must be given.");
        res.redirect("/");
        return;
    }

    if (isNaN(ethAmount)) {
        req.flash('error', "The amount must be numeric.");
        res.redirect("/");
        return;
    }

    if (address === undefined || address === "") {
        req.flash('error', "The recipient address must be given.");
        res.redirect("/");
        return;
    }

    // TODO: Verify if the address is a valid ETH Address

    try {
        let txId = sendEthereum(address, ethAmount);
        req.flash('success', ethAmount + " ETH sent successfully to " + address
            + ". <a target='_blank' href='https://sepolia.etherscan.io/tx/" + txId + "'>Transaction #"
            + txId + "</a>.");
        res.redirect("/");
    } catch (e) {
        req.flash('error', e.message);
        res.redirect("/");
    }
});

function getBalance(address) {
    return parseFloat("0.0").toFixed(5);
}

function sendEthereum(toAddress, ethAmount) {
    // TODO: Transaction
    return "0xDEAD000000000000";
}

module.exports = router;
