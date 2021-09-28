
    function TIME (){
        var time=document.getElementById("t");
        time.innerHTML=`${new Date().toLocaleTimeString()}`;
        }
        setInterval(TIME,1000)
        
        var time=document.getElementById("d")
        time.innerHTML=`${new Date().toLocaleDateString()}`;
        
        document.querySelector(".fa-redo-alt").addEventListener("click",()=>{
            location.reload()})
        
            document.querySelector(".fa-window-maximize").addEventListener("click",()=>{
                window.open()})
        
                document.querySelector(".fa-window-restore").addEventListener("click",()=>{
                    resizeWindow()
                    console.log("clicked")
        
                })
                    function resizeWindow(){ 
                   window.open(" ", "", "width=300, height=200")
                    }
        
            
        var body = document.querySelector("body")
            var Toggle = document.querySelector(".toggle");
                    
            Toggle.onclick = function (){
                body.classList.toggle("light");
            }



            chrome.storage.sync.get("todo", (data) => {
                if(data.todo){
                data.todo.map((data)=>{
            const ul = document.querySelector("ul");
            const li = document.createElement("li");
            const btn_del = document.createElement("button");
            li.dataset.id = data.id;
            li.innerHTML=` <input type="checkbox" >${data.todo} <span style="font-size: 10px; padding: 10px;">(${data.date})</span> `
             btn_del.innerHTML = `<i class="fas fa-trash" ></i>`
            btn_del.setAttribute("id",`${data.id}`)
            btn_del.addEventListener("click", () => removeItem(li));
            li.append(btn_del);
            ul.append(li);
           console.log(data.todo);
                })
            }
        })

        const removeItem = (e) => {
            e.parentNode.removeChild(e);
           
            const dataId = e.dataset.id;
           
            chrome.storage.sync.get({ todo: [] }, function (items) {
              const updatetodo = items.todo.filter((item) => item.id != dataId);
              chrome.storage.sync.set({ todo: updatetodo });
            });
           };
           

         
           
    // form submit
           
        document.querySelector("#todo_form").onsubmit=(event)=>{
            event.preventDefault()
       let todo = document.querySelector("#todo_input").value;
       var input_Ele={
           todo:todo,
           date:new Date().toLocaleDateString(),
           id:Date.now()
       }
       chrome.storage.sync.get("todo", function (result) {
        if (result.todo) {
          chrome.storage.sync.set({ todo: [...result.todo, input_Ele] },()=>{
              location.reload();
          });   
          }
      });
        }

              

                