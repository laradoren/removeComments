const input = document.querySelector('input[type="file"]');//input files

input.addEventListener('change', (e) => {
    const reader = new FileReader();
    var content = ''; 
    var regBlock = new RegExp([
        /\/(\*)[^*]*\*+(?:[^*\/][^*]*\*+)*\//.source,           
        /\/(\/)[^\n]*$/.source,                                 
        /"(?:[^"\\]*|\\[\S\s])*"|'(?:[^'\\]*|\\[\S\s])*'|`(?:[^`\\]*|\\[\S\s])*`/.source,
        /(?:[$\w\)\]]|\+\+|--)\s*\/(?![*\/])/.source,          
        /\/(?=[^*\/])[^[/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[/\\]*)*?\/[gim]*/.source
        ].join('|'),                                           
        'gm'
    );
    reader.onload = () =>  {
        content = reader.result;
        let a = content.replace(regBlock, (match, mlc, slc) => {
            return mlc ? ' ' :  //for /* */
            slc ? '' :          // for // and /**/
            match;             
        });  
        console.log(a);      
    }
    reader.readAsText(input.files[0]);
}, false);