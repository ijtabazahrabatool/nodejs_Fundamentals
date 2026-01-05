const { nanoid } = require("nanoid");
const URL = require('../models/url');
const { rmSync } = require("fs");
 

async function handleGenerateNewShortURL(req , res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'})
    const shortID = nanoid(8);

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitedHistory: [], 
        createdBy: req.user._id,
    });
    return res.render("home", { id: shortID, });
    
}

async function handleGetAnalytics(req , res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks: result.visitedHistory.length , analytics: result.visitedHistory })
}

async function handleShortUrlRedirect(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitedHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    if (!entry) return res.status(404).json({ error: "Short URL not found" });

    let url = entry.redirectURL;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "http://" + url;
    }

    res.redirect(url);
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleShortUrlRedirect,
}