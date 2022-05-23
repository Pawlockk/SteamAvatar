const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const community = new SteamCommunity();

 
const details = {
  accountName: process.env['login'] ,
  password: process.env['password'],
  twoFactorCode: SteamTotp.generateAuthCode(process.env['shared_secret'])
};

 

community.login(details,(err) =>{
  if(err){
    console.log(err);
  } else {
    console.log('Logged into Steam via steam-community');
    avatar_change();
  }
});



function avatar_change(){
  var avatar = 1;
  setInterval(async () =>{
    
    community.uploadAvatar(`./avatars/${avatar}.jpg`,'jpg',(err) =>{
      if(err){
        console.log(err);
      }else{
        console.log(`Changed avatar to: ${avatar}.jpg`)
      }
    });
    
    avatar += 1;
    if(avatar > 3){
      avatar = 1;
    }

  }, 60000);
}




const http = require('http');
http.createServer((req, res) => {
  res.write("OK");
  res.end();
}).listen(3000);