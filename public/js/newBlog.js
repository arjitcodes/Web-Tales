const h2 = document.getElementById("h2");
const h3 = document.getElementById("h3");
const h4 = document.getElementById("h4");
const paragraph = document.getElementById("paragraph");
const uList = document.getElementById("uList");
const oList = document.getElementById("oList");
const textArea = document.getElementById("textArea");


const createHeading = (h) => {
    const newH2 = document.createElement(h);
    newH2.setAttribute("contenteditable", true);
    newH2.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            createParagraph();
        }
    })
    textArea.append(newH2);
    newH2.focus()
    console.log(newH2)
}


h2.addEventListener("click", () => {
    createHeading("h2")
})
h3.addEventListener("click", () => {
    createHeading("h3")
})
h4.addEventListener("click", () => {
    createHeading("h4")
})


const createParagraph = () => {
    const newParagraph = document.createElement("P");
    newParagraph.contentEditable = true;
    newParagraph.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            createParagraph();
        }
    })
    textArea.append(newParagraph);
    newParagraph.focus()
    console.log(newParagraph)
}

paragraph.addEventListener("click", createParagraph)



const createList=(l)=>{
    const newList=document.createElement(l);
    textArea.append(newList)
    const newLi=document.createElement("li")
    newLi.contentEditable=true;
    newList.append(newLi);
    newLi.focus();
    console.log(newList)
}

uList.addEventListener("click",()=>{
    createList("ul")
})
oList.addEventListener("click",()=>{
    createList("ol")
})