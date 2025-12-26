const firebaseConfig = {
  apiKey: "AIzaSyBexfDOFUrIE5xkdfFC6dpWzYTmuuTpDi0",
  authDomain: "fh-chat-da54b.firebaseapp.com",
  projectId: "fh-chat-da54b",
  databaseURL: "https://fh-chat-da54b-default-rtdb.firebaseio.com"
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const UID = "User_" + Math.floor(Math.random() * 1000);
document.getElementById('login-btn').onclick = () => {
    const inputPass = document.getElementById('pass-field').value;
    if (btoa(inputPass) === "MDcwOQ==") {
        document.getElementById('login-overlay').style.display = 'none';
        startApp();
    } else { alert("الرمز خطأ!"); }
};
function startApp() {
    db.ref("chat").on("child_added", (snapshot) => {
        const data = snapshot.val();
        const flow = document.getElementById('chat-flow');
        const div = document.createElement('div');
        div.className = `bubble ${data.u === UID ? 'me' : 'other'}`;
        if(data.t === 'txt') div.innerText = data.v;
        else if(data.t === 'img') div.innerHTML = `<img src="${data.v}" style="width:100%; border-radius:10px;">`;
        flow.appendChild(div);
        flow.scrollTop = flow.scrollHeight;
    });
    document.getElementById('send-btn').onclick = () => {
        const inp = document.getElementById('main-input');
        if(inp.value.trim()) { db.ref("chat").push({ u: UID, t: 'txt', v: inp.value }); inp.value = ''; }
    };
}
