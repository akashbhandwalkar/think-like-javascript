
// We are currently supporting upto hexadecimal number system.
// This program can be improved to support number system from base 2 to 36.
const capitalCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L','M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X','Y', 'Z'];
const smallCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k','l','m','n','o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const mapping = {
    A: 10,
    a: 10,
    B: 11,
    b: 11,
    C: 12,
    c: 12,
    D: 13,
    d: 13,
    E: 14,
    e: 14,
    F: 15,
    f: 15
};
   

function customParseInt(inputString, radix = 0) {
    
    // Step1: convert input to the string
    const _inputString = '' + inputString;

    // Step2: Let S be a newly created substring of inputString consisting of the first character that is not a StrWhiteSpaceChar
    let s = _inputString.replace(/\s+/, "");


    // Step3: Let sign be 1
    let sign = 1;

    // Step4:f S is not empty and the first character of S is a minus sign -, let sign be −1.
    if(s && s[0] == '-') {
        sign = -1;
    }

    // Step5: If first character is + or minus remove the first character
    
    if(s && (s[0] == '-' || s[0] == '+')) {
        s = s.substring(1, s.length);
    }

    // Step6: 

    let R = radix;

    // step7: 
    let stripPrefix = true;

    // Step8:
    if(R != 0) { 
        if(R < 2 || R > 36) return NaN;
        if(R != 16) {
            stripPrefix = false;
        }
    } else { // Step9:
        R = 10;
    }

    // Step 10
    if(stripPrefix  === true) {
        if(s.length >=2) {
            const firstTwoChars = s[0]+''+s[1];
            if(firstTwoChars == '0x' || firstTwoChars == '0X') {
                s = s.substring(2, s.length);
                R = 16;
            }
        }
    }

    // Step11:
    let z = '';
    for(let i = 0; i < s.length; i++) {
        if(isRadixRCharacter(s[i], R)) {
            z+= s[i];
        } else {
            i = s.length;
        }
    }

    // Step12
    if(z.length == 0 || !z) {
        return NaN;
    } 

    // Step13
    let mathInt =  convertToInteger(z, R);

    return sign * mathInt;


}

function convertToInteger(number, radix) {
    let decimal = 0;
    const numberInString = number + "";
    for(var i = numberInString.length - 1; i >= 0; i--) {
        if(mapping[numberInString[i]]) {
            decimal += Math.pow(radix,  numberInString.length - 1 - i) * mapping[numberInString[i]];
        } else {
            decimal += Math.pow(radix, numberInString.length - 1 - i) * +numberInString[i];
        }
        
    }
    return decimal;
}

function isRadixRCharacter(char, R) {
   for(var i = 0; i < R; i++) {
    if(char == capitalCharacters[i] || char == smallCharacters[i]) {
        return true;
    }
   }

   return false;
}


// Test Cases
console.log(customParseInt('123'));
console.log(customParseInt('ABC', 16));
console.log(customParseInt('123abc'));
console.log(customParseInt('abc'));