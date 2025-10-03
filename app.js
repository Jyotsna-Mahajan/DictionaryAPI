async function getMeaning() {
  let wordInput = document.querySelector("#wordInput");
  let word = wordInput.value;   // get the input text
  wordInput.value = "";         // clear the input field
 
  let result = document.querySelector("#result");
  let result2 = document.querySelector("#result2");
  

  
  try {
    let res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    let data = res.data;
    let meaning = data[0].meanings[0].definitions[0].definition;

    // collect all synonyms and antonyms
        let synonyms = [];
        let antonyms = [];
        for (let m of data[0].meanings) {
          synonyms = synonyms.concat(m.synonyms);
          antonyms = antonyms.concat(m.antonyms);
        }

      let audioUrl = data[0].phonetics.find(p => p.audio)?.audio;

    result.innerHTML = `
      <h2>${data[0].word}</h2>
      <p><b>Meaning:</b> ${meaning}</p>
      ${audioUrl ? `<audio controls src="${audioUrl}"></audio>` : "<p>No audio available</p>"}
      
      `;

    result2.innerHTML= `
      <p><b>Synonyms:</b> ${synonyms.length ? synonyms.join(", ") : "No synonyms"}</p>
      <p><b>Antonyms:</b> ${antonyms.length ? antonyms.join(", ") : "No antonyms"}</p>
    `;
    
  } catch (error) {
    result.innerHTML = "<p>Error fetching data. Try another word.</p>";
    console.error(error);
  }


}