document.addEventListener('DOMContentLoaded',()=>{
    const socket = io.connect('http://localhost:3000');
    const newsContents = document.querySelector('.news-contents');
    const getNews = async () => {
        try{
            const response = await fetch('http://newsapi.org/v2/everything?q=xiaomi&from=2020-11-01&sortBy=publishedAt&apiKey=3373e35ea37143c6b478c8fb5e90ce43');
            const data = response.json();
            return data;
        }catch(err){
            console.log(err.message);
        }
        
    }
    getNews().then(data => {
        data.articles.map(article => {
            const div = document.createElement('div');
            div.className = 'news-contents-each';
            const h3 = document.createElement('h3');
            h3.textContent = article.title;
            const p = document.createElement('p');
            p.textContent = article.description;
            div.appendChild(h3);
            h3.style.textDecoration = "underline";
            div.appendChild(p);
            newsContents.appendChild(div);
        })
    });

    const form = document.forms[0];
    form.addEventListener('submit',e => {
        e.preventDefault();
        const username = e.target.username.value;
        const message = e.target.message.value;
        socket.emit('chat',{username,message});
    });

    const chats = document.querySelector('.chats');
    socket.on('chat',data =>{
        const username = data.username;
        const message = data.message;
        const div = document.createElement('div');
        div.className = 'chat-each';
        

        const p1 = document.createElement('p');
        p1.className = "chat-each-username";
        p1.textContent = username;
        div.appendChild(p1);

        

        const p2 = document.createElement('p');
        p2.className = "chat-each-message";
        p2.textContent = `  ${message}`;
        p2.style.color = 'red';
        div.appendChild(p2);

        chats.appendChild(div);

    })
        
})