const { } = require('express');
const nodemailer = require('nodemailer');

const createTrans = () => {
  let config = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "storeyogui@gmail.com",
      pass: "vqaakjjyngyzuhnv"
    }
  });
  return config;
  /*
  const opciones = {
      from: 'YoguiStore',
      subject: body.asunto,
      to: body.email,
      text: body.mensaje
  };
  config.sendMail(opciones, function (error, result) {
      if (error) return res.json({ ok: false, msg: error })
      return res.json({
          ok: true,
          msg: result
      })
  });*/
}

const send = async (req, res) => {
  let body = req.body;
  const transporter = createTrans();
  const info = await transporter.sendMail({
    from: 'Yoguistore recibo <storeyogui@gmail.com>', // sender address
    to: body.email, // list of receivers
    subject: body.asunto, // Subject line
    text: body.mensaje, // plain text body,
    html: body.html
  }, function (error, result) {
    if (error) return res.json({ ok: false, msg: error })
    return res.json({
      ok: true,
      msg: result
    })
  }
  )
}

module.exports = {
  send
}