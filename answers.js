
//variable for the GPT3 answers
let answerGPT;
let answerfinal;
//firebase database intialise
let database;

//setting up firebase in the client
 function setup(){
database = firebase.database();

async function GPTAnswer(){
  // let allanswers = selectAll('spanAns')
  // for (var i=0;i<allanswers.length;i++){
  //   allanswers[i].remove();
  // }
    let ref = database.ref('answers')
    ref.orderByKey().startAt("-MU8aTYxRZzTRFoaMgQA").on('child_added',async (snapshot) => {
      var data = snapshot.val();
      let keys = Object.keys(data)
       answerGPT = data.name;
        
       questionprompt = data.question;
       if(data.startedAt){

         console.log(data.startedAt, new Date(data.startedAt*1000))
       }
       spl = answerGPT.split(". ");
          if(spl.length > 1){
            spl.pop();
            fStop = ". ";
            joiner = join(spl,fStop);
            finalAns = joiner+fStop;
          } else {
            finalAns = answerGPT;
          }
          
      //  console.log(finalAns)
          // console.log("new key should be: " + data.key)
          // console.log("Previous Post ID: " + prevChildKey);
          const ques = createP("Question: ").addClass("qna");
          var li_q = createP(data.question+"\n").addClass("db");  
          
          const answers = createP("Answer: ").addClass("qna");
          var li_a = createP(finalAns).addClass("dba");  

          if(data.startedAt){
            timestamp = data.startedAt
            GPTdate = new Date(timestamp)
            var year = GPTdate.getFullYear();
            var month = GPTdate.getMonth() + 1;
            var day = GPTdate.getDate();
            var hours = GPTdate.getHours();
            var minutes = GPTdate.getMinutes();

            formattedDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes;
            //var date = new Date(timestamp * 1000);
            // formattedDate = addDate.getFullYear()
            const dateAnswered = createP("Date answered: ").addClass("qna-date");
            var li_date = createP(formattedDate).addClass("dbdate")
            date_set = dateAnswered.parent(setDiv) 
            date_set2 = li_date.parent(setDiv) 
          }
;  

        setDiv = createDiv().addClass("set-order")
        q_set = ques.parent(setDiv);
        q_set2 =  li_q.parent(setDiv);
        a_set= answers.parent(setDiv);
        a_set2=  li_a.parent(setDiv);
          
        // reverseSet = createDiv().addId("reverse-order")
        setDiv.parent("reverse-order")
     
  });
  };

  
GPTAnswer();
 }
  

