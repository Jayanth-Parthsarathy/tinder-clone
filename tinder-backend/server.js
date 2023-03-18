import express from "express";
import mongoose from "mongoose";
import Cors from 'cors'
import Cards from './dbCards.js'
import urlencoded from "body-parser";
const app = express();
app.use(express.urlencoded({extended:false}))
const port = 8001;
const connection_url = `<your-mongo-db-url>`;
app.use(express.json());
app.use(Cors());
mongoose.connect(connection_url);
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post('/tinder/cards', async (req, res) => {
  const card = new Cards({
    name: req.body.name,
    imgUrl: req.body.imgUrl,
  });
  try {
    const newCard = card.save();
    res.status(201).send(card);
  }
  catch (err) {
    res.status(500).send(err);
  }
});
app.delete("/tinder/cards/:id", async(req, res)=>{
  await Cards.deleteOne({_id:req.params.id});
  res.status(200).send("deleted");  
})

app.get('/tinder/cards', async (req, res) => {
  try {
    const cards = await Cards.find({});
    res.status(200).send(cards);
  }
  catch (err) {
    res.status(500).send(err);
  }
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
