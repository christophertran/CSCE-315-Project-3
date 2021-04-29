
function copyToClipboard() {
    alert("Copied to clipboard!");
    var text = " Hey there, I am using PoliLime. Follow this link to get latest updates on politicians: https://fierce-fjord-42165.herokuapp.com/  ";

    if (window.clipboardData && window.clipboardData.setData) {
        
        return clipboardData.setData("Text", text); 


    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
    
}




