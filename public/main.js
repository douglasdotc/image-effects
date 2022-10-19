// import is asynchronous action:
async function init() {
    let rustApp = null

    try {
        // import web assembly file (asynchronous) 
        // so that we can call rust functions in javascript code:
        rustApp = await import('../pkg')
    } catch (e) {
        console.error(e)
        return
    }

    console.log(rustApp)

    // Select the input element from the document with ID = upload:
    const input = document.getElementById('upload')

    // class that store file in javascript:
    const fileReader = new FileReader()

    // onloadend get called whenever the file is loaded:
    fileReader.onloadend = () => {
        // fileReader.result returns the image file 
        // as string with base 64 encoding:
        let base64 = fileReader.result.replace(
            // search for the metadata using regex and replace it 
            // with empty string:
            /^data:image\/(png|jpeg|jpg);base64,/, ''
        )

        // Get grayscale image (base 64) from rust:
        let image_data_url = rustApp.grayscale(base64)

        // Browser supports base 64 images and decode the image on our behalf:
        document.getElementById('new-img').setAttribute(
            // modify src (source) attribute with the image_data_url variable:
            'src', image_data_url
        )
    }

    // Listen to change event:
    // Change is triggered whenever the user upload a file:
    input.addEventListener('change', () => {
        // convert the image file to text:
        fileReader.readAsDataURL(input.files[0])
    })
}

init()
