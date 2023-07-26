const APIkey = "f766c6053e584e6aa9fbecc94271a8ed";
const ReqID = "4ffcac1c-b2fc-48ba-bd6d-b69d9942995a";
const projectName = "TEST";
const deploymentName = "0719";
const url = "https://kevin0932.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview";

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatContainer = document.getElementById('chatContainer');

    // Display user message
    const userMessage = document.createElement('div');
    userMessage.textContent = userInput.value;
    userMessage.classList.add('user-message');
    chatContainer.appendChild(userMessage);

    // Prepare payload
    const payload = {
        "kind": "Conversation",
        "analysisInput": {
            "conversationItem": {
                "id": "1",
                "text": userInput.value,
                "modality": "text",
                "participantId": "user1"
            }
        },
        "parameters": {
            "projectName": projectName,
            "verbose": true,
            "deploymentName": deploymentName,
            "stringIndexType": "TextElement_V8"
        }
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Ocp-Apim-Subscription-Key": APIkey,
            "Apim-Request-Id": ReqID,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        // Display bot message
        const botMessage = document.createElement('div');
      var topIntent = data.result.prediction.topIntent
      var reply = "test"
      
switch (topIntent) {
  case '個人簡介':
    reply = "我是 Alex。";
    break;
  case '介紹自己':
    reply = "讓我來介紹一下自己。";
    break;
  case '分享食品故事':
    reply = "我有個有趣的食品故事想要分享。";
    break;
  case '宣傳銷售產品':
    reply = "我有一個優良食品產品想要宣傳和推銷。";
    break;
  case '尋找優良食品故事':
    reply = "我正在尋找一些關於優良食品的故事和資訊。";
    break;
  case '打招呼':
    reply = "嗨！最近好嗎？";
    break;
  case '探索食品議題':
    reply = "我對特定的食品議題非常感興趣，想要參與討論。";
    break;
  case '查詢商品生產資訊':
    reply = "我想了解一下特定商品的生產過程和原材料資訊。";
    break;
  case '獲取食品推薦':
    reply = "我希望獲得一些推薦的優良食品或農產品。";
    break;
  case '瞭解合作機會':
    reply = "我對成為合作夥伴非常感興趣，想要了解更多合作機會。";
    break;
  case '瞭解食品價值觀':
    reply = "我想了解食品故事背後的價值觀、原則或宗旨。";
    break;
  case '解決消費者困境':
    reply = "我正在尋求一些建議或解決方案，以解決我在飲食方面遇到的困境。";
    break;
  default:
    reply = "抱歉，我無法理解您的意圖。";
    break;
}

      
      
        botMessage.textContent = reply;
        botMessage.classList.add('bot-message');
        chatContainer.appendChild(botMessage);
    });

    // Clear user input
    userInput.value = '';
}
