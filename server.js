const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 🔥 여기 수정
mongoose.connect("mongodb+srv://gmg-lol:growyourgarden1234@cluster0.tzs9uah.mongodb.net/secureDB")
  .then(() => {
    console.log("✅ DB 연결 성공");
  })
  .catch(err => {
    console.error("❌ DB 연결 실패:", err);
  });

// 데이터 모델
const Data = mongoose.model("Data", {
  content: String
});

// 저장
app.post("/save", async (req, res) => {
  await Data.deleteMany();
  await Data.create({ content: req.body.content });
  res.send("저장 완료");
});

// 불러오기
app.get("/get", async (req, res) => {
  const data = await Data.findOne();
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("서버 실행됨"));