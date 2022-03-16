// IMPORT
const requestIp = require('request-ip');
const fs = require('fs');
const moment = require('moment');

// STATUS
const pattern_num = /[0-9]/; // 숫자
const pattern_eng = /[a-zA-Z]/; // 영어
const pattern_spc = /[\{\}\[\]\/?.,;:|\)*~ `!^\-_+<>@\#$%&\\\=\(\'\"]/; // 특수문자
const pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글
const pattern_kor_incomplete = /[ㄱ-ㅎ|ㅏ-ㅣ]/; // 불완전 한글

const pattern_only_num = /^[0-9]*$/; // 숫자만 가능
const pattern_only_kor = /^[가-힣]*$/; // 완전 한글만 가능
const pattern_only_eng_number = /^[A-Za-z0-9]*$/; // 영어, 숫자만 가능
const pattern_only_kor_eng_number = /^[가-힣A-Za-z0-9]*$/; // 완전한글, 영어, 숫자만 가능

// FUNC. 숫자 존재 여부
const CheckNum = (str) => {
    return pattern_num.test(str);
};
// FUNC. 영어 존재 여부
const CheckEng = (str) => {
    return pattern_eng.test(str);
};
// FUNC. 특수문자 존재 여부
const CheckSpc = (str) => {
    return pattern_spc.test(str);
};
// FUNC. 한글 존재 여부
const CheckKor = (str) => {
    return pattern_kor.test(str);
};
// FUNC. 불완전 한글 존재 여부
const CheckKorInComplete = (str) => {
    return pattern_kor_incomplete.test(str);
};

// FUNC. 숫자만인지 체크
const CheckOnlyNumber = (str) => {
    return pattern_only_num.test(str);
};
// FUNC. 완전 한글만인지 체크
const CheckOnlyKor = (str) => {
    return pattern_only_kor.test(str);
};
// FUNC. 영어+숫자만인지 체크
const CheckOnlyEngNumber = (str) => {
    return pattern_only_eng_number.test(str);
};
// FUNC. 완전 한글+영어+숫자만인지 체크
const CheckOnlyKorEngNumber = (str) => {
    return pattern_only_kor_eng_number.test(str);
};

// FUNC. XSS 필터링
const XSSFilter = (text) => {
    return text.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g, '');
};

// FUNC. 로그 파일 기록
const SaveLog = (title, data, req) => {
    title = String(title);
    data = String(data);

    let ip = '0.0.0.0';
    if(req !== undefined) ip = String(requestIp.getClientIp(req));

    let date = String(moment().format('YYYY-MM-DD HH:mm:ss'));
    let fileName = String(moment().format('YYYY_MM_DD')) + '.txt';
    let fileData = `Date:${date} Ip:${ip} Title:${title} Data:${data}\n`;

    fs.appendFile(`log/${fileName}`, fileData, (e) => {});
};

// FUNC. 랜덤값 생성
const RandomString = () => {
    return String(Math.floor(Math.random() * 100000)) + String(moment().format('X'));
};

// FUNC. 문자열->바이트 변환
const GetByteLengthFromString = (str) => {
    return Number((function(s,b,i,c){
        for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
        return b
    })(str));
};

// FUNC. 기간 timestamp 구하기
const IntervalTimestamp = (day) => {
    let nowDate = Number(moment().format('X'));
    let endDate = Number(moment(nowDate * 1000).add(day, 'days').format('X'));

    return endDate - nowDate;
};

module.exports = {
    CheckNum,
    CheckSpc,
    CheckEng,
    CheckKor,
    CheckKorInComplete,
    CheckOnlyNumber,
    CheckOnlyKor,
    CheckOnlyEngNumber,
    CheckOnlyKorEngNumber,
    XSSFilter,
    SaveLog,
    RandomString,
    GetByteLengthFromString,
    IntervalTimestamp
};
