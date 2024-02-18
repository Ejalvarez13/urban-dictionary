// Fetch search button
let searchBtn = document.getElementById('search-btn');

// When search button is clicked
searchBtn.addEventListener('click', () => {
    // Hide messages
    document.getElementById('default-message').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    document.getElementById('no-results').style.display = 'none';
    // Remove results
    document.getElementById("results").innerHTML = '';
    // Show loading
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        // Call function
        searchWord();
    }, 1000);
});

// Search word function to call API
var searchWord = async () => {
    // Get search value
    let searchInput = document.getElementById('search-value').value;
    // Options to pass on AXIOS request
    const options = {
        method: 'GET',
        url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
        params: {term: searchInput},
        headers: {
            'X-RapidAPI-Key': 'b230259e60msh567dc4b777d9769p16e3bdjsnc74f5203eb3d',
            'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
        }
    };
      
    try {
        // AXIOS request
        const response = await axios.request(options);
        // Hide Loading
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';
        // Get request return
        let definitions = response.data.list;
        for (let i = 0; i < definitions.length; i++) {
            document.getElementById("results").innerHTML += `
                <div class="definition">
                    <p>${definitions[i].definition}</p>
                    <p class="example">Example:</p>
                    <p class="example-value">${definitions[i].example}</p>
                    <a href="${definitions[i].permalink}" target="_blank">VIEW DEFINITION</a>
                </div>
            `;
        }

        // No results
        if (definitions.length === 0) {
            document.getElementById('no-results').style.display = 'block';
        }
    } catch (error) {
        // If error display error and hide loading
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
    }
}