// Mascaras dos Inputs
!function(a,b){"function"==typeof define&&define.amd?define(b):a.VMasker=b()}(this,function(){var a="9",b="A",c="S",d=[8,9,16,17,18,36,37,38,39,40,91,92,93],e=function(a){for(var b=0,c=d.length;c>b;b++)if(a==d[b])return!1;return!0},f=function(a){return a=a||{},a={precision:a.hasOwnProperty("precision")?a.precision:2,separator:a.separator||",",delimiter:a.delimiter||".",unit:a.unit&&a.unit.replace(/[\s]/g,"")+" "||"",suffixUnit:a.suffixUnit&&" "+a.suffixUnit.replace(/[\s]/g,"")||"",zeroCents:a.zeroCents,lastOutput:a.lastOutput},a.moneyPrecision=a.zeroCents?0:a.precision,a},g=function(a){this.elements=a};g.prototype.unbindElementToMask=function(){for(var a=0,b=this.elements.length;b>a;a++)this.elements[a].lastOutput="",this.elements[a].onkeyup=!1,this.elements[a].onkeydown=!1,this.elements[a].value.length&&(this.elements[a].value=this.elements[a].value.replace(/\D/g,""))},g.prototype.bindElementToMask=function(a){for(var b=this,c=function(c){c=c||window.event;var d=c.target||c.srcElement;e(c.keyCode)&&setTimeout(function(){b.opts.lastOutput=d.lastOutput,d.value=h[a](d.value,b.opts),d.lastOutput=d.value,d.setSelectionRange&&b.opts.suffixUnit&&d.setSelectionRange(d.value.length,d.value.length-b.opts.suffixUnit.length)},0)},d=0,f=this.elements.length;f>d;d++)this.elements[d].lastOutput="",this.elements[d].onkeyup=c,this.elements[d].value.length&&(this.elements[d].value=h[a](this.elements[d].value,this.opts))},g.prototype.maskMoney=function(a){this.opts=f(a),this.bindElementToMask("toMoney")},g.prototype.maskNumber=function(){this.opts={},this.bindElementToMask("toNumber")},g.prototype.maskPattern=function(a){this.opts={pattern:a},this.bindElementToMask("toPattern")},g.prototype.unMask=function(){this.unbindElementToMask()};var h=function(a){if(!a)throw new Error("VanillaMasker: There is no element to bind.");var b="length"in a?a.length?a:[]:[a];return new g(b)};return h.toMoney=function(a,b){if(b=f(b),b.zeroCents){b.lastOutput=b.lastOutput||"";var c="("+b.separator+"[0]{0,"+b.precision+"})",d=new RegExp(c,"g"),e=a.toString().replace(/[\D]/g,"").length||0,g=b.lastOutput.toString().replace(/[\D]/g,"").length||0;a=a.toString().replace(d,""),g>e&&(a=a.slice(0,a.length-1))}var h=a.toString().replace(/[\D]/g,""),i=new RegExp("^(0|\\"+b.delimiter+")"),j=new RegExp("(\\"+b.separator+")$"),k=h.substr(0,h.length-b.moneyPrecision),l=k.substr(0,k.length%3),m=new Array(b.precision+1).join("0");k=k.substr(k.length%3,k.length);for(var n=0,o=k.length;o>n;n++)n%3===0&&(l+=b.delimiter),l+=k[n];if(l=l.replace(i,""),l=l.length?l:"0",!b.zeroCents){var p=h.length-b.precision,q=h.substr(p,b.precision),r=q.length,s=b.precision>r?b.precision:r;m=(m+q).slice(-s)}var t=b.unit+l+b.separator+m+b.suffixUnit;return t.replace(j,"")},h.toPattern=function(d,e){var f,g="object"==typeof e?e.pattern:e,h=g.replace(/\W/g,""),i=g.split(""),j=d.toString().replace(/\W/g,""),k=j.replace(/\W/g,""),l=0,m=i.length;for(f=0;m>f;f++){if(l>=j.length){if(h.length==k.length)return i.join("");break}i[f]===a&&j[l].match(/[0-9]/)||i[f]===b&&j[l].match(/[a-zA-Z]/)||i[f]===c&&j[l].match(/[0-9a-zA-Z]/)?i[f]=j[l++]:(i[f]===a||i[f]===b||i[f]===c)&&(i=i.slice(0,f))}return i.join("").substr(0,f)},h.toNumber=function(a){return a.toString().replace(/(?!^-)[^0-9]/g,"")},h});
VMasker(document.querySelector('#form #phone-number')).maskPattern('(99)99999-9999')

var $form = document.querySelector('#form');
var $inputs = document.querySelectorAll('#form .form_field input');
var $selects = document.querySelectorAll('#form .form_field select');
var $error_msg = document.querySelector('#error-msg')
var $submit_btn = document.querySelector('#form #submit_btn');

var server_url = 'form.php'; // add_data

var fields = combineFields($inputs, $selects);

buttonFieldResponse($submit_btn, fields);

$submit_btn.addEventListener('click', function(){
    sendData(data, server_url);
});

function addListeners(elementList, event, fn){
    for( var i = 0; i < elementList.length; i++ ){
        elementList[i].addEventListener(event, fn);
    }
}

function buttonFieldResponse(btn, fields){
    
    btn.disabled = true;
    
    addListeners(fields, 'input', function(){
        toggleButtonStatus(checkEmptyFields(fields));
    });
}

function checkEmptyFields(fields){
    var emptyInputs = fields.length;
    
    for( var i = 0; i < fields.length; i++ ){
        if(fields[i].value != ''){
            emptyInputs--;
        }
    }
    
    return emptyInputs;
}

function combineFields(inputs, selects){
    var combined = [];
    
    for( var i = 0; i < inputs.length; i++ ){
        combined.push(inputs[i]);
    }
    for( var i = 0; i < selects.length; i++ ){
        combined.push(selects[i]);
    }
    return combined;
}

function parseJSON(raw_data){
    var parsed_data = {};
    
    raw_data = JSON.stringify(data);
    raw_data = JSON.parse(data);

    var parsed_data = {
        name: raw_data[0],
        phone: raw_data[1],
        email: raw_data[2],
        select1: raw_data[3],
        select2: raw_data[4]
    }
    
    return parsed_data;
}

async function sendData(data, url){

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if( xhttp.readyState == 4 && xhttp.status == 200){
            // mensagem de "envio realizado com sucesso" para o usuário ou redirecionamento para a TYP
        } else {
            // mensagem de "erro no envio de dados" para o usuário
        }
    }

    xhttp.open("POST", url);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(data);
}

function toggleButtonStatus(emptyFields){
    if(emptyFields == 0){
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}