const nodemailer = require('nodemailer');
const User = require('../schema/User');
const conf = require ('../config/configuration.json');
const { v4: uuidv4 } = require('uuid');

const template = (firstName, link) => {
  return (
    `<!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style type="text/css">
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
        }
        table {
          border-collapse: collapse !important;
        }
        body {
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
        }
        .confirmButton{
          border-radius: 5px;
        }
        .confirmButton:hover{
          background-color: gray;
        }
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }
        @media screen and (max-width:600px) {
          h1 {
            font-size: 32px !important;
            line-height: 32px !important;
          }
        }
        div[style*="margin: 16px 0;"] {
          margin: 0 !important;
        }
      </style>
    </head>

    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td bgcolor="#FFA73B" align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                      <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Hello ${firstName}</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                    </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td bgcolor="#ffffff" align="left">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                <table border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                  <br><br>
                                    <td class="confirmButton" align="center" bgcolor="#FFA73B"><a href="${link}" target="_blank" style="font-size: 20px; color: #ffffff; text-decoration: none; padding: 15px 25px">Confirm your Email</a></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                        </table>
                    </td>
                  </tr>
              </table>
            </td>
          </tr>
          <tr>
          </tr>
      </table>
    </body>
    </html>`
  );
};

let random, host, link;

exports.sendEmail = async (req, res, next) => {
  try{
    const  transporter = nodemailer.createTransport(conf.smtpServer);
    random = uuidv4();
    host = req.get('host');
    link = `http://${host}/users-api/email/verify?id=${random}_${req.body.email}`;

    const mailOptions = {
      from: conf.smtpServer.from,
      to: req.body.email,
      subject: 'Confirm Your Email',
      html: template( req.body.firstName, link )
    };

    const sendDone = await transporter.sendMail(mailOptions);
    if(!sendDone) {
      transporter.close();
      return false;
    }
    
    transporter.close();
    if(!req.body.verifyAfterCreate) return true;
    return res.json({status: 'done'});
    
  } catch (err){
    return next(err);
  }
};

exports.verifyEmail = async(req, res, next) => {
  try{
    if(`${req.protocol}://${req.get('host')}` === `http://${host}`){
      if(req.query.id.split('_')[0] === random){

        const email = req.query.id.split('_')[1];
        const user = await User.updateOne({email}, {$set: {isEmailVerify: true }});
        if(!user) return res.json({status: false, message: 'You are not registered with this email'});
        return res.json(`Your email is successfuly verifyed`);

      } else {
        return res.json({status: false, message: 'Your email is not verifyed'});
      }
    } else {
      return res.json({status: false, message: 'Please check the link is corrent or not'});
    }
  } catch (err) {
    return next(err);
  }
};