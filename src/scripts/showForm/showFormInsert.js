async function showFormInsert () {
    let tableName
    try { tableName = document.querySelector('.wrapperTableValues caption').innerText; } catch (err) { tableName = '' }
    if (tableName !== '') {
        const divOptionInputs = document.querySelector('#optionInputs');
        const tableColumnsHTML = document.querySelectorAll('.wrapperTableValues th');
        tableColumnsHTML.forEach((column) => {
            console.log(column.innerText)
            //TODO ta funkcja ma tworzyc inputy ktore maja sie wyswietlic w divOptionInputs dla Insert i dalsza obsługa tego insert z baza danych
        })
    }
}
export {showFormInsert};