const plusIcon=document.querySelector('#plusIcon')
const articleElements=document.querySelector('#articleElements')


plusIcon.addEventListener("click",()=>{
    articleElements.classList.toggle('display-none')
})



const editor = new EditorJS({ 
    holder: 'editorjs', 
    
    // tools: { 
    //   header: Header, 
    //   list: List 
    // }, 
  })