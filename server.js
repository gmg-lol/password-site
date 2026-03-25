const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 🔥 여기 수정
mongoose.connect("mongodb+srv://gmg-lol:growyourgarden1234@cluster0.tzs9uah.mongodb.net/secureDB?retryWrites=true&w=majority")
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
  try {
    await Data.deleteMany();
    await Data.create({ content: req.body.content });
    res.send("저장 완료");
  } catch (err) {
    console.error("❌ 저장 에러:", err);
    res.status(500).send("서버 에러");
  }
});
// 불러오기
app.get("/get", async (req, res) => {
  try {
    const data = await Data.findOne();
    res.json(data);
  } catch (err) {
    console.error("❌ 불러오기 에러:", err);
    res.status(500).send("서버 에러");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("서버 실행됨"));