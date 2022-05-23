const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const fs = require('fs');
const community = new SteamCommunity();

const TIME = 1000 * 60; //sets time (1000 is one second) 
const files = fs.readdirSync('./avatars'); //gets table with all files
const format = 'jpg'; //sets files format (all files have to be the same format)

//login details
const name = process.env['login']; 
const password = process.env['password']; 
const secret = process.env['shared_secret'];

 
const details = {
  accountName: name,
  password: password,
  twoFactorCode: SteamTotp.generateAuthCode(secret)
};

 

community.login(details,(err) =>{
  if(err){
    console.log(err);
  } else {
    console.log(`Logged into Steam via steam-community to ${details.accountName} account`);
    console.log(`Loaded ${files.length} avatars`);
    avatar_change();
  }
});


function avatar_change(){
  let counter = 0;
  setInterval(() =>{
    
    community.uploadAvatar(`./avatars/${files[counter]}`, format, (err) =>{
      if(err){
        console.log(err);
      }else{
        console.log(`Changed avatar to: ${files[counter]}`);
        
        counter += 1;
        if(counter == files.length){
          counter = 0;
        }
        
      }
    });

  }, TIME);
}
