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
        let div = document.createElement("div");
        div.className = "pCotainerMain"
        
        let section = document.createElement('div');
        section.className = "section"
    
        addHtml(section, spell.name, false,"title-style");
        div.appendChild(section);
        par.appendChild(div); 
        searchDescription(spell.url, section, div);
        section.onclick = function () {onClickClose(div)};
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




function fetchDesc(stringUrl, section, divMain) {
    fetch("https://www.dnd5eapi.co" + stringUrl).then(manageResponseLink).then((data) => onDataReadyLink(data, section, divMain)).catch(onError);
}


function manageResponseLink(response) {
    return response.json();
}

function onDataReadyLink(data, section, divMain) {
    let arrayDesc = [data.range, data.material, data.duration, data.casting_time, data.attack_type, data.school.name, data.desc, data.higher_level];
    let div = document.createElement("div");
    div.setAttribute("id","pContainer");
    for (const element of arrayDesc) {
        if (!element) {
            continue;
        }
        let paragraph = document.createElement('p');
        paragraph.setAttribute("id","paragraphDesc");
        const textNode = document.createTextNode(element);
        paragraph.appendChild(textNode);
        div.appendChild(paragraph);
        divMain.appendChild(div)
    }
    div.setAttribute("style","display:none;");
}

function onClickClose(thisDiv) {
    let children = thisDiv.children[1];
    if (children.style.display === "block") {
        children.style.display = "none";
    } else if (children.style.display === "none"){
        children.style.display = "block";
    }
}

function searchDescription(url, section, divMain) {
    fetchDesc(url, section, divMain);
}


//ciclo per ogni child
//controllare