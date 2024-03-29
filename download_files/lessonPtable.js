
'use strict';
$(document).ready(async function () {
    $('#tblReportResultsDemographics').hide();
    const res = await axios.get('https://script.google.com/macros/s/AKfycbxCKtyJP8X3vpOXTDCaENAesVXa8gWwzw4BSAnk6iIGWz8FFMqi/exec');
    const jres = await res.data;
    let ready = false;
    ready = await interset(jres);
    if(ready){
        $('#loading').fadeOut();
        $('#tblReportResultsDemographics').fadeIn();

    }
});

const interset = async function(jres){
    const table = document.querySelector('#tblReportResultsDemographics');
        await jres.forEach(async function (datarow) {
            const newRow = await document.createElement('tr');
            const Rowdiv = await document.createElement('div');
            newRow.setAttribute('class', 'rows-employees');
            newRow.setAttribute('scope', 'row');
            for (const property in datarow) {
                if (datarow.hasOwnProperty(property) && property.toLocaleLowerCase() !== 'created at') {
                    let cell = await document.createElement('td');
                    if (property === "download") {
                        const p = await document.createElement('p');
                        p.textContent = 'download'
                        const alink = await document.createElement('a');
                        await alink.setAttribute('href', datarow[property]);
                        alink.appendChild(p)
                        cell.appendChild(alink);
                    } else if (property === "Link") {
                        const p = await document.createElement('p');
                        p.textContent = 'Link'
                        const alink = await document.createElement('a');
                        await alink.setAttribute('href', datarow[property]);
                        alink.setAttribute('target', 'blank');
                        alink.appendChild(p)
                        cell.appendChild(alink);
                    } else if (property === "Last Updated") {

                        cell.textContent = moment(datarow[property], "YYYYMMDD").fromNow();
                    } else {
                        cell.textContent = datarow[property];
                    }
                    cell.setAttribute('class', 'align-content-xl-end');
                    cell.setAttribute('style', 'word-wrap: break-word;max-width: 150px;');
                    
                    newRow.appendChild(cell);
                    Rowdiv.setAttribute('class', 'd-flex flex-wrap-reverse');
                    Rowdiv.appendChild(newRow);
                }
                        // if (property === 'Name') {
                        //     const option = await document.createElement('option');
                        //     const series = document.querySelector('#series');
                        //     option.textContent = datarow[property];
                            
                        //     if (! series.textContent.includes(option.textContent)){
                        //         series.appendChild(option);
                        //     };
                        // }
                        if (property === 'level') {
                            const option = await document.createElement('option');
                            const series = document.querySelector('#level');
                            option.textContent = datarow[property];
                            
                            if (! series.textContent.includes(option.textContent)){
                                series.appendChild(option);
                            };
                        }
            }
            table.appendChild(newRow);
        })
        return true;
}

$('.form-control').keyup(function () {
    const value = $(this).val().toLowerCase();
    $(".rows-employees").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

const showError = function () {
    const series = $('#series').val().toLocaleLowerCase();
    const level = $('#level').val().toLocaleLowerCase();
    const error = document.querySelector('.error');
      error.setAttribute('style', 'color: red');
      error.textContent = 'Please select all fields to continue using the filter'
     
    if (series === 'select series' || level === 'select level') {
        $('.error').show();
        } else {
           $('.error').hide();
            
    }

}

$('#level').on("change",(function () {
    showError();
    const series = $('#series').val().toLocaleLowerCase();
    const value = $(this).val().toLowerCase();
    $(".rows-employees").filter(function () {
        const cells = $(this).text().toLowerCase();
        if (!cells.includes(value) || !cells.includes(series)){
            $(this).hide();
        }else {
            $(this).show();
        }
    });
}));
$('#series').on("change",(function () {
    showError();
    const level = $('#level').val().toLocaleLowerCase();
    const value = $(this).val().toLowerCase();
    $(".rows-employees").filter(function () {
        const cells = $(this).text().toLowerCase();
        if (!cells.includes(value) || !cells.includes(level)){
            $(this).hide();
        }else {
            $(this).show();
        }
    });
}));


    
 