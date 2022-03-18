//aim to open and type log in details automatically thorugh this code on hackerrank
//also new - query selector - in webscarping using cheerio

const puppeteer = require('puppeteer')
const loginLink = "https://www.hackerrank.com/auth/login"
const codeFile = require('./3_solutions')
var robotjs = require("robotjs");

//now to login we need to sign up -- use a temp email from https://temp-mail.org/en/ - make acc using this
let email = 'sitaco8057@goonby.com'
let password = 'try@123'

let page;

let browserWillBeLAunchedPromise = puppeteer.launch({
    headless: false ,  
    defaultViewport: null, 
    rgs: ['--start-maximized'] 
})  

browserWillBeLAunchedPromise.then(function (browserInstance){
    //to make new Tab
    let newTabPromise = browserInstance.newPage()
    return newTabPromise;
}).then(function (newTab){
    console.log('new tab opened')
    page = newTab
    let pageWillOpenPromise = newTab.goto(loginLink)
    return pageWillOpenPromise
}).then(function(){      //type method expects three things - selector of input field  , what to write , delay (delay is given beacuse some sites have bots to check if suddenly written they can make it out that a machine did this and not let you proceed (not a robot))           
    let typeEmailPromise = page.type("input[id='input-1']" , email , {delay: 50} ) //50 milisecond
    return typeEmailPromise
}).then(function(){ //now typing password
    let typePasswordPromise = page.type("input[id='input-2']" , password , {delay  :50 })
    return typePasswordPromise

}).then(function(){   //now clicking the login button
    let logInPromise = page.click("button[data-analytics='LoginPassword']" , {delay : 50})
    return logInPromise
}).then (function (){//now fully logging in automatically - now solving first problem - by lickcing algortihms
    let clickAlgoPromise = waitAndClick("li:nth-child(1) > a > div > div"   ,  page ) //gives error because login pomise resolves but loader start - then statement doesnt stop - but page not reached - so after clicking log in we should wait before cheching next selector - use wait and click - implement by us only not inbuilt - instead of click
    return clickAlgoPromise;
}).then(function (){
    let clickWarmUp = waitAndClick("div:nth-child(4) > div.filters > div > div > div:nth-child(1) > div > div > label > div.checkbox-wrap > input",page)
    return clickWarmUp;
}).then( function (){
    // QUERY SELECTOR _ IMP SEE -  $$ is sign for query selector all 
    let challengesArr = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled") //getting list of questions
    return challengesArr
}).then (function (questionsArr){ //challenges arr pass karo
    console.log("no of questions " + questionsArr.length)
    let questionWillBeSolvedPromise = questionSolver(page, questionsArr[0], codeFile.answers[0])
    return questionWillBeSolvedPromise;
})
//now we solve all the questions code answer is in solutions file we'll import it herre and in array in same order we have code there

function waitAndClick(selector, cPage){
    return new Promise (function (resolve, reject){
        let waitForModalPromise = cPage.waitForSelector(selector)  //wait for selector will page until this selector is visible
        waitForModalPromise.then(function (){
            let clickModalPromise = cPage.click(selector, {delay : 50})
            return clickModalPromise
        }).then (function () {
            resolve()
        }).catch(function (){
            reject()
        })
    })
}

// function questionSolver(page, question, answer){
//     // console.log('in func')
//     return new Promise(function (resolve, reject){
//         // console.log('in promise')
//         let questionWillBeClickedPromise = question.click()
//         // console.log('no error so far')
//         questionWillBeClickedPromise.then(function(){
//             //for going to page before selecting box
//             let waitForEditorPromise = waitAndClick('monaco-editor.no-user-select.mac.vs' , page);
//             return waitForEditorPromise;
//         }).then(function(){
//             console.log('page changed')
//             let checkPromise = waitAndClick(".checkbox-input" , page)
//             return checkPromise //wait and click will check on all pages and sirf itne se warmup wali jagah solve box check ho jayega because waha bhi same selector - so we tell it to search from Q wala page - select answer input wali jagah first becaue woh kahi aur repreat nahi ho raha hoga the do this uper wala then function is that
//             // return page.click(".checkbox-input")
//         }).then(function(){
            
//             return page.waitForSelector(".text-area.custominput")
//         }).then(function(){
//             // console.log('custom text area selected')
//             return page.type(".text-area.custominput",answer,{delay:10})
//         }).then(function(){
//             //now puppeteer has keyboard func from where you can type like func - down press hold (down heps in holding two keys as we need ctrl A ctrl c ctrl v to copy)
//             //KEYBOARD CAN BE AUTOMATED
//             let ctrlIsPressedPromise = page.keyboard.down('Meta')
//             return ctrlIsPressedPromise;
//         }).then(function(){
//             let AisPressedPromise = page.keyboard.press('A' ,{delay: 20})
//             return AisPressedPromise;
//         }).then(function(){
//             let XisPressedPromise =  page.keyboard.press('X',{delay: 20})
//             return XisPressedPromise
//         }).then(function(){
//             let ctrlIsReleasedPromise = page.kkeyboard.up('Meta')
//             return ctrlIsReleasedPromise;
//         }).then(function(){
            
//         }).then(function(){
//             //getting to editor
//             let waitForEditorPromise = waitAndClick('.monaco-editor.no-user-select.vs',page);
//             return waitForEditorPromise;
//         }).then(function(){
//             let ctrlHoldPromise = page.keyboard.down('Meta')
//             return ctrlHoldPromise;
//         }).then(function(){
//             let AisPressedPromise = page.keyboard.press('A' ,{delay: 20})
//             return AisPressedPromise;
//         }).then(function(){
//             let VisPressedPromise =  page.keyboard.press('V')
//             return VisPressedPromise
//         }).then(function(){
//             return page.click('.hr-monaco__run-code',{delay:20})
//         }).then (function () {
//             resolve()
//         }).catch(function (err){
//             console.log(err)
//         })
//     })
// }

function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
      let questionWillBeClickedPromise = question.click();
      questionWillBeClickedPromise
        .then(function () {
        //for going to page before selecting box
          let waitForEditorPromise = waitAndClick(
            ".monaco-editor.no-user-select.vs",
            page
          );
          return waitForEditorPromise;
        })
        .then(function () {
          return waitAndClick(".checkbox-input", page);
        })
        .then(function () {
          return page.waitForSelector(".text-area.custominput");
        })
        .then(function () {
          return page.type(".text-area.custominput", answer, { delay: 5 });
        })
        .then(function () {
          // robotjs.mouseClick();
          // let ctrlonHoldPromise = page.keyboard.down('Meta');
          let ctrlonHoldPromise = robotjs.keyToggle('command', 'down','command')
          return ctrlonHoldPromise
        }).then(function(){
          console.log('command')
          let AisPressedPromise = robotjs.keyTap('A')//page.keyboard.press('A' , {delay : 20});
          return AisPressedPromise
        }).then(function(){
          console.log('a')
           let XisPressedPromise = robotjs.keyTap('X')//page.keyboard.press('X' , {delay:20})
           return XisPressedPromise
        }).then(function(){
          console.log('x')
           let ctrlIsReleasedPromise = robotjs.keyToggle('command','up','command') //page.keyboard.up('Meta')
           return ctrlIsReleasedPromise
        }).then(function () {
          let waitForEditorPromise = waitAndClick(
            ".monaco-editor.no-user-select.vs",
            page
          );
          return waitForEditorPromise;
        }).then(function () {
          let ctrlonHoldPromise = robotjs.keyToggle('command', 'down')//page.keyboard.down('Meta');
          return ctrlonHoldPromise
        }).then(function(){
          let AisPressedPromise = page.keyboard.press('A' , {delay : 50});
          return AisPressedPromise
        }).then(function(){
          // console.log('a in main')
          let VisPressedPromise = page.keyboard.press('X' , {delay:20})
          return VisPressedPromise
       }).then(function(){
        let ctrlIsReleasedPromise = robotjs.keyToggle('command', 'up')//page.keyboard.up('Meta')
        return ctrlIsReleasedPromise
     }).then(function(){
        return page.click('.hr-monaco__run-code' , {delay : 20})
     }).then(function(){
       resolve()
     }).catch(function(err){
       console.log(err)
     })
    });
  }

// very big porblem is hackerrank autocloses brckets so when we write answeres it will autoclose bracket and then we also close brackets in our answer code we have to solve this problem
// lets write in the custom input wali jagah and then copy paste it in input wali jagah
// direct copy paste nahi kar sakte ais automation web pe chalta hai file se copy paste nahi karsake but type karne ke baad web pe copy paste kar sakte hai



//cooment it out to get asyn await version uper wala is promisified

