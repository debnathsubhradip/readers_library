let responsearray=null;
let isLoading=false;

function showLoading() {
    const displaylist = document.getElementById('displaylist');
    if (displaylist) {
        displaylist.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div><p class="mt-3 text-muted">Loading books...</p></div>';
    }
}

function showError(message) {
    const displaylist = document.getElementById('displaylist');
    if (displaylist) {
        displaylist.innerHTML = `<div class="alert alert-danger" role="alert"><h4>Error</h4><p>${message}</p><button class="btn btn-outline-danger" onclick="loadresource()">Try Again</button></div>`;
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function loadresource(){
    showLoading();
    isLoading = true;
    fetch('https://api.github.com/repos/debnathsubhradip/books/contents/casual-reading')
    .then((response)=>{
        if (!response.ok) {
            throw new Error('Failed to fetch books. Status: ' + response.status);
        }
        return response.json();
    })
    .then((data)=>{
        responsearray=data;
        loadlist();
        isLoading = false;
    })
    .catch((err)=>{
        console.error('Error loading books:', err);
        showError('Unable to load books. Please check your internet connection and try again.');
        isLoading = false;
    });
}
loadresource();

function loadlist(){
    document.getElementById('searchlabel').value="";
    if(document.getElementById('booklist')!=null){
        document.getElementById('booklist').remove();
    }
    if (!responsearray || responsearray.length === 0) {
        let displaylist=document.getElementById('displaylist');
        displaylist.innerHTML = '<div class="alert alert-info"><h4>No Books Found</h4><p>The book repository appears to be empty.</p></div>';
        return;
    }
    let checklist=0;
    let displaylist=document.getElementById('displaylist');
    displaylist.innerHTML = ''; // Clear loading spinner
    let code='<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">';
    for(let i=0;i<responsearray.length;i++){
        checklist=1;
        let fileName = responsearray[i].name;
        let fileExt = fileName.split('.').pop().toLowerCase();
        let iconClass = fileExt === 'pdf' ? 'bi-file-earmark-pdf-fill text-danger' : 'bi-file-earmark-text-fill text-primary';
        code+='<div class="col">';
        code+='<div class="card h-100 shadow-sm">';
        code+='<div class="card-body">';
        code+='<h5 class="card-title d-flex align-items-center">';
        code+=`<i class="bi ${iconClass} me-2"></i>${fileName}`;
        code+='</h5>';
        code+=`<a href="/book_display.html?readbookurl=`;
        code+=responsearray[i].download_url;
        code+='" target="_blank" class="btn btn-primary stretched-link">';
        code+='<i class="bi bi-book me-2"></i>Read Book';
        code+='</a></div></div></div>';
    }
    code+="</div>";
    if(checklist===0){
        code='<div class="alert alert-info"><h4>No Books Found</h4><p>No books match your search criteria.</p></div>';
    }
    let para=document.createElement("DIV");
    para.id='booklist';
    para.innerHTML=code;
    displaylist.appendChild(para);
}

function search(){
    let searchlabel = document.getElementById('searchlabel');
    if (!searchlabel.value.trim()) {
        loadlist();
        return;
    }
    let escapedSearch = escapeRegExp(searchlabel.value.toLowerCase());
    let text=new RegExp(escapedSearch);
    if(document.getElementById('booklist')!=null){
        document.getElementById('booklist').remove();
    }
    let checklist=0;
    let displaylist=document.getElementById('displaylist');
    displaylist.innerHTML = ''; // Clear loading spinner
    let code='<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">';
    for(let i=0;i<responsearray.length;i++){
        if(text.test(responsearray[i].name.toLowerCase())){
            checklist=1;
            let fileName = responsearray[i].name;
            let fileExt = fileName.split('.').pop().toLowerCase();
            let iconClass = fileExt === 'pdf' ? 'bi-file-earmark-pdf-fill text-danger' : 'bi-file-earmark-text-fill text-primary';
            code+='<div class="col">';
            code+='<div class="card h-100 shadow-sm">';
            code+='<div class="card-body">';
            code+='<h5 class="card-title d-flex align-items-center">';
            code+=`<i class="bi ${iconClass} me-2"></i>${fileName}`;
            code+='</h5>';
            code+=`<a href="/book_display.html?readbookurl=`;
            code+=encodeURIComponent(responsearray[i].download_url);
            code+='" target="_blank" class="btn btn-primary stretched-link">';
            code+='<i class="bi bi-book me-2"></i>Read Book';
            code+='</a></div></div></div>';
    }}
    code+="</div>";
    if(checklist===0){
        code='<div class="alert alert-warning"><h4>No Books Found</h4><p>No books match your search. Try a different keyword.</p></div>';
    }
    let para=document.createElement("DIV");
    para.id='booklist';
    para.innerHTML=code;
    displaylist.appendChild(para);
}