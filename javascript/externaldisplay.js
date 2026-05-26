$(document).ready(function(){
   let searchParams = new URLSearchParams(window.location.search);
   let link = searchParams.get('readbookurl');

   if (!link) {
       document.getElementById('content').srcdoc = '<div class="alert alert-danger p-4"><h4>Invalid URL</h4><p>No resource link provided.</p></div>';
       return;
   }

   // Decode if needed
   if (link.includes('%')) {
       link = decodeURIComponent(link);
   }

   // Set download link
   $('#downloadBtn').attr('href', link);

   // Show loading state
   document.getElementById('content').srcdoc = '<div class="text-center p-5"><div class="spinner-border text-primary"></div><p class="mt-3">Loading resource...</p></div>';

   // Fetch the HTML content and display in iframe via srcdoc
   fetch(link)
       .then(response => {
           if (!response.ok) throw new Error('Network response was not ok');
           return response.text();
       })
       .then(html => {
           // Set the HTML content directly
           document.getElementById('content').srcdoc = html;
       })
       .catch(err => {
           console.error('Error loading HTML:', err);
           document.getElementById('content').srcdoc = `
               <div class="alert alert-danger p-4">
                   <h4>Cannot Display Inline</h4>
                   <p>This resource cannot be loaded due to browser security restrictions.</p>
                   <p>Please use the Download button to view the file.</p>
                   <a href="${link}" class="btn btn-primary mt-2" target="_blank">
                       <i class="bi bi-download"></i> Download Resource
                   </a>
               </div>
           `;
       });
});