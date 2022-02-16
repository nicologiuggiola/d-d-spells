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
        // console.log(spell.url);  
        let button = document.createElement("button");
        button.onclick = function () {searchDescription(spell.url, section)};
        // button.addEventListener('click', searchDescription())
        section.appendChild(button);
        
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
    // console.log("https://www.dnd5eapi.co" + stringUrl);
    fetch("https://www.dnd5eapi.co" + stringUrl).then(manageResponseLink).then((data) => onDataReadyLink(data, section)).catch(onError);
}


function manageResponseLink(response) {
    return response.json();
}

function onDataReadyLink(data, section) {
    
    let closeWindow = document.getElementById("paragraphDesc");
    //let closeWindow = document.getElementsByClassName("paragraphDesc");
    if (closeWindow) {
        console.log("window",closeWindow);
        while (closeWindow) {
            closeWindow.remove();
            closeWindow = document.getElementById("paragraphDesc");
        }
    } 
    
    let arrayDesc = [data.range, data.material, data.duration, data.casting_time, data.attack_type, data.school.name, data.desc, data.higher_level];

    for (const element of arrayDesc) {
        if (!element) {
            continue;
        }
        let paragraph = document.createElement('p');
        paragraph.setAttribute("id","paragraphDesc");
        //paragraph.className = "paragraphDesc";
        const textNode = document.createTextNode(element);
        paragraph.appendChild(textNode);
        section.appendChild(paragraph);    
    }
}

function onClickClose() {
    let closeWindow = document.getElementById("paragraphDesc");
    //let closeWindow = document.getElementsByClassName("paragraphDesc");
    console.log("window",closeWindow);
    while (closeWindow) {
        closeWindow.remove();
        closeWindow = document.getElementById("paragraphDesc");
    }
}

function close_window(id) {
    document.getElementById(id).style.display = 'none';
}


function searchDescription(url, section) {
    fetchDesc(url, section);
}


//ciclo per ogni child
//controllare