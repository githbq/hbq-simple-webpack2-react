let json4fe = ____json4fe,
    browser = json4fe.browser,
    userInfo = json4fe.user ? JSON.parse(json4fe.user) : {};

let contentList = [{
    title: "消息通知",
    num: 0,
    url: "//wen.58.com/mycenter/newmsg",
    clickLogInfo: "from=my_58QA_message",
    isLogin: true,
    classStyle:"msg-notification",
    isHaveNewMsg :  userInfo.isHaveNewMsg,
    isAjax:true
},
{
    title: "我的关注",
    num: userInfo.subCount,
    url: "//wen.58.com/mycenter/mysubscribe",
    clickLogInfo: "from=my_58QA_follow_click",
    isLogin: true
},
{
    title: "我的回答",
    num: userInfo.answerCount,
    url: "//wen.58.com/answer/myanswer",
    clickLogInfo: "from=my_58QA_answer_click",
    isLogin: true
},
{
    title: "我的提问",
    num: userInfo.questionCount,
    url: "//wen.58.com/mycenter/myquestion",
    clickLogInfo: "from=my_58QA_question_click",
    isLogin: true
},
{
    title: "我赞过的回答",
    num: userInfo.myPraiseCount,
    url: "//wen.58.com/mycenter/mypraise",
    clickLogInfo: "from=my_58QA_pa",
    isLogin: true
}
];
export default contentList