import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({
  
  'pushQuestions': function(questionInfo) {
    
      console.log("value od unitno is "+questionInfo.unitno);    
      Data.update(
                 {unitno: questionInfo.unitno},
                 {
                     $push: {
                         "q": {
                             "para": questionInfo.para,
                                "ques": [{                      
                                    "A": {
                                        "q1": questionInfo.q1,
                                        "a1": questionInfo.a1
                                    },
                                    "B": {
                                        "q2": questionInfo.q2,
                                        "a2": questionInfo.a2
                                    },
                                    "C": {
                                        "q3": questionInfo.q3,
                                        "a3": questionInfo.a3
                                    },
                                    "D": {
                                        "q4": questionInfo.q4,
                                        "a4": questionInfo.a4
                                    }
                                }]
                         }
                     }
                 }
             );
         
             console.log("End of push function server side");
  },
  
  'textToSpeech': function(val) {
    $speechInput = $("#speech");
    var text = $speechInput.val();
      $.ajax({
        type: "POST",
        url: baseUrl + "query/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "ocp-apim-subscription-key": subscriptionKey
        },
        data: JSON.stringify({q: text, lang: "en"}),

        success: function(data) {
          prepareResponse(data);
        },
        error: function() {
          respond(messageInternalError);
        }
      });
  }
  
  
});


