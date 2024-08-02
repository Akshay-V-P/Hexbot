const messageArea = document.getElementById("message-area")
const inputBox = document.getElementById("input-box")
const sendBtn = document.getElementById("sent-btn")
const aiMsg = document.getElementById("ai-message")
let msgValue

const API_KEY = "AIzaSyBl5RNJS7KtG7pBs82mxtUxzI5HRIRhh84"
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

const generateResponse = async (reciveDiv) => {


    try {
        const response = await fetch(API_URL, {
            method: "POST" ,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                contents:[
            {role: "user",
                parts:[{text: msgValue}]}]
            })
        })
        console.log(msgValue)

        const data = await response.json()
        console.log(data)
        let apiresponse = data.candidates[0].content.parts[0].text || "Sorry, I didn't get that.";
        console.log("api: " + apiresponse)
        reciveDiv.innerText = apiresponse

        
    }catch (error) {
        console.error("Error generating response:", error);
        reciveDiv.innerText = "Sorry, something went wrong.";
    }finally{
        messageArea.scrollTop = messageArea.scrollHeight
    }
}


inputBox.addEventListener("keypress", function(event){
    if (event.key ==="Enter"){
        sendMessage()
    }else{return}
})
sendBtn.addEventListener("click", sendMessage)

function sendMessage(){
    if (inputBox.value == "") {
        return
    }else{
        msgValue = inputBox.value
        let sendDiv = document.createElement("div")
        sendDiv.textContent = msgValue
        sendDiv.classList.add("user-message")
        messageArea.appendChild(sendDiv)
        messageArea.scrollTop = messageArea.scrollHeight
        inputBox.value = ""
        reciveMessage()
    }
}

function reciveMessage() {
    let reciveDiv = document.createElement("div")
    reciveDiv.innerHTML = "Thinking...."
    reciveDiv.classList.add("ai-message")
    messageArea.appendChild(reciveDiv)
    setTimeout(() => {
        generateResponse(reciveDiv)
    }, 100);
    


    
}
