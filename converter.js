const MY_TABLE = [
    {
        forbidden_form: "リクエスト",
        preferred_form: "request"
    },
    {
        forbidden_form: "ワールドカップ",
        preferred_form: "worldcup"
    }
]

/**
 * Check whether the given string contains kanji characters.
 *
 * @param {string} text The text to be valuated.
 * @return {boolean} True: yes, False, no.
 */
 module.exports.replaceForbiddenForm = function(text){
    for(var i = 0; i < MY_TABLE.length; i++){
        if(text.includes(MY_TABLE[i]["forbidden_form"]) == true){
            text = text.replaceAll(MY_TABLE[i]["forbidden_form"], MY_TABLE[i]["preferred_form"]);
        }
    }
    return text;
}