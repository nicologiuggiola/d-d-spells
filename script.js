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
        section.setAttribute("id","sec-"+spell.name);
    
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
    let descIndex = 1;
    for (const element of arrayDesc) {
        if (!element) {
            descIndex++;
            continue;
        }
        let paragraph = document.createElement('p');
        paragraph.setAttribute("id","paragraphDesc" + descIndex);
        paragraph = GiveTitleDescription(paragraph, descIndex);
        const textNode = document.createTextNode(element);
        paragraph.appendChild(textNode);
        div.appendChild(paragraph);
        divMain.appendChild(div)
        descIndex++;
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

function GiveTitleDescription(paragraph, descIndex) {
    if (descIndex === 1) {
        const titleTextNode = document.createTextNode("Range: ")
        let p_desc = document.createElement('p');
        p_desc.className = "description-titles";
        p_desc.appendChild(titleTextNode)
        paragraph.appendChild(p_desc)
    }
    if (descIndex === 2) {
        const titleTextNode = document.createTextNode("Materials: ")
        let p_desc = document.createElement('p');
        p_desc.className = "description-titles";
        p_desc.appendChild(titleTextNode)
        paragraph.appendChild(p_desc)
    }
    if (descIndex === 3) {
        const titleTextNode = document.createTextNode("Duration: ")
        let p_desc = document.createElement('p');
        p_desc.className = "description-titles";
        p_desc.appendChild(titleTextNode)
        paragraph.appendChild(p_desc)
    }
    if (descIndex === 4) {
        const titleTextNode = document.createTextNode("Casting Time: ")
        let p_desc = document.createElement('p');
        p_desc.className = "description-titles";
        p_desc.appendChild(titleTextNode)
        paragraph.appendChild(p_desc)
    }
    if (descIndex === 5) {
        const titleTextNode = document.createTextNode("Attack Type: ")
        let p_desc = document.createElement('p');
        p_desc.className = "description-titles";
        p_desc.appendChild(titleTextNode)
        paragraph.appendChild(p_desc)
    }
    if (descIndex === 6) {
        const titleTextNode = document.createTextNode("School: ")
        let p_desc = document.createElement('p');
        p_desc.className = "description-titles";
        p_desc.appendChild(titleTextNode)
        paragraph.appendChild(p_desc)
    }
    if (descIndex === 7) {
        const titleTextNode = document.createTextNode("Description: ")
        let p_desc = document.createElement('p');
        p_desc.className = "description-titles";
        p_desc.appendChild(titleTextNode)
        paragraph.appendChild(p_desc)
    }
    if (descIndex === 8) {
        const titleTextNode = document.createTextNode("At Higher Levels: ")
        let p_desc = document.createElement('p');
        p_desc.className = "description-titles";
        p_desc.appendChild(titleTextNode)
        paragraph.appendChild(p_desc)
    }

    return paragraph;
}

function searchSpell(string) {
    location.href="#sec-" + string;
}
//ciclo per ogni child
//controllare