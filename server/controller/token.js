const axios = require("axios");

const createToken = async (req, res, next) => {
  const secret = "eVWd0mDs0reU7BWz";
  const consumer = "3ZLKV9lxrSWYNAhyTtrcJZIdtccBcN7x";
  const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");
  await axios
    .get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
    )
    .then((data) => {
      token = data.data.access_token;
      console.log(data.data);
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
};

const postStk = async (req, res) => {
  const shortCode = 4119567;
  const phone = req.body.phone.substring(1);
  const amount = req.body.amount;
  const passkey =
    "5c973b3b8967d889259776b058248347962926aea0943773301f482cb35db058";
  const url = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);
  const password = new Buffer.from(shortCode + passkey + timestamp).toString(
    "base64"
  );
  const data = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: 1000,
    PartyA: `254${phone}`,
    PartyB: shortCode,
    PhoneNumber: `254${phone}`,
    CallBackURL: "http://ambyachievers.org/path",
    AccountReference: "Mpesa",
    TransactionDesc: "stk push",
  };

  await axios
    .post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((data) => {
      console.log(data);
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
};

module.exports = { createToken, postStk };