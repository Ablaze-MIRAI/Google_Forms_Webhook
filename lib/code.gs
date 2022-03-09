//------------CONFIG------------
const WEBHOOK = "";
const MAX_LENGTH = 300;
const REMAIN_LENGTH = true;
const USER_NAME = "Google Forms";
const COLOR = 11374079;
//------------------------------

const Form_Event = (e) =>{
  const Form_Data = Create_Form_Data(e, COLOR);
  Send_Discord(Form_Data, USER_NAME,WEBHOOK);
};

const Send_Discord = (Embeds, NAME, WEBHOOK_URL) =>{
  const payload = {
    username: NAME,
    "embeds": Embeds
  };
  
  let res = UrlFetchApp.fetch(WEBHOOK_URL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  });
};

const Create_Form_Data = (event, color) =>{
  const itemResponse = event.response.getItemResponses();
  let Send_Data = [
    {
      "color": color,
      "fields": []
    }
  ];
  for (let i = 0; i < itemResponse.length; i++){    
    const formData = itemResponse[i];
    const title = formData.getItem().getTitle();
    let response = formData.getResponse();
    const response_length = response.length;
    if(response === "" || response == null){
      response = "<未入力>"
    }
    if(MAX_LENGTH !== null && MAX_LENGTH < response_length){
      response = response.slice(0, MAX_LENGTH);
      if(REMAIN_LENGTH){
        response += `(残り${response_length - MAX_LENGTH}文字)`;
      }else{
        response += "...";
      }
    }

    Send_Data[0].fields.push({
      "name": title,
      "value": "```" + response + "```"
    });
  }
  console.log(JSON.stringify(Send_Data));
  return Send_Data;
};
