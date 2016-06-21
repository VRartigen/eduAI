import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({
  
  'pushQuestions': function(questionInfo) {
    
      console.log("value od unitno is "+questionInfo.unitno);
     // Data.findOne()
    
      Data.update(
                 {unitno: questionInfo.unitno},
                 {
                     $push: {
                         "q": [{
                             "para": questionInfo.para,
                                "ques": {                      
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
                                    },
                                    "E": {
                                        "q5": questionInfo.q5,
                                        "a5": questionInfo.a5
                                    }
                                }
                         }]
                     }
                 }
             );
    /*
      Data.update(
                 {unitno: questionInfo.unitno},
                 {
                     $push: {
                         "question": {
                             para: questionInfo.para,
                                ques: {                      
                                    A: {
                                        q1: questionInfo.q1,
                                        a1: questionInfo.a1
                                    },
                                    B: {
                                        q2: questionInfo.q2,
                                        a2: questionInfo.a2
                                    },
                                    C: {
                                        q3: questionInfo.q3,
                                        a3: questionInfo.a3
                                    },
                                    D: {
                                        q4: questionInfo.q4,
                                        a4: questionInfo.a4
                                    },
                                    E: {
                                        q5: questionInfo.q5,
                                        a5: questionInfo.a5
                                    }
                                }
                         }
                     }
                 }
             ); */
             
             console.log("End of push function server side");
    
    
  }
  
  
});