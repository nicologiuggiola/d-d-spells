// https://www.dnd5eapi.co/api/spells/acid-arrow

fetch("https://www.dnd5eapi.co/api/spells")
.then(manageResponse)
.then(onDataReady)
.catch(onError);


function manageResponse(response) {
    return response.json();
}


function onDataReady(data) {
    let par = document.getElementById("spells-main");
    for (const spell of data.results) {
        let section = document.createElement('div');
        section.className = "section"
    
        addHtml(section, spell.name, false,"title-style");
        par.appendChild(section); 
        console.log(spell.url);  
        fetchDesc(spell.url, section);
    }
}


function addHtml(htmlElement, text, isNewLine = false, className) {
    const span = document.createElement('span');
    span.className += className + " ";
    const textNode = document.createTextNode(text);
    span.appendChild(textNode)
    htmlElement.appendChild(span);
    if (isNewLine) {
        const newLine = document.createElement('br');
        htmlElement.appendChild(newLine);
    }
}


function onError(error) {
   console.log(error);
}




function fetchDesc(stringUrl, section) {
    console.log("https://www.dnd5eapi.co" + stringUrl);
    fetch("https://www.dnd5eapi.co" + stringUrl).then(manageResponseLink).then((data) => onDataReadyLink(data, section)).catch(onError);
}


function manageResponseLink(response) {
    return response.json();
}

function onDataReadyLink(data, section) {
    for (const element of data.desc) {
        let paragraph = document.createElement('p');
        const textNode = document.createTextNode(element);
        paragraph.appendChild(textNode);
        section.appendChild(paragraph);    
    }
}






