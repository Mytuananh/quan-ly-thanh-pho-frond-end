
function getContent(data, i) {
    return ` <tr>
            <td>${i+1}</td>
            <td style="text-align: center">${data[i].name}</td>
            <td style="text-align: center">${data[i].country.name}</td>
            <td style="text-align: center">${data[i].area}</td>
            <td style="text-align: center">${data[i].people}</td>
            <td style="text-align: center">${data[i].gdp}</td>
            <td style="text-align: center">${data[i].description}</td>
            <td>
                <button onclick="editCity(${data[i].id})">Edit</button>
            </td>
            <td>
                <button  onclick="removeCity(${data[i].id})">Delete</button>
            </td>
              <td>
                <button  onclick="viewCity(${data[i].id})">View</button>
            </td>
        </tr>`
}
function getAllCity() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/cities`,
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += getContent(data, i)

            }
            $("#city").html(content);
        }
    });
}

function addNewCity() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/countries ",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            document.getElementById('countries').innerHTML = content;
        }
    });

    document.getElementById("addCity").innerHTML = `<table>
        <tr>
            <td>Name:</td>
            <td><input type="text" id="cityName" placeholder="name"></td>
        </tr>
         <tr>
            <td>Country:</td>
            <td> <select id="countries">
       
            </select></td>
        </tr>
         <tr>
            <td>Area:</td>
            <td><input type="text" id="cityArea" placeholder="area"></td>
        </tr>
         <tr>
            <td>People:</td>
            <td><input type="text" id="cityPeople" placeholder="people"></td>
        </tr>
         <tr>
            <td>GDP:</td>
            <td><input type="text" id="cityGDP" placeholder="gdp"></td>
        </tr>
         <tr>
            <td>Description:</td>
            <td><input type="text" id="cityDescription" placeholder="description"></td>
        </tr>
        <tr>
            <td></td>
            <td><input type="submit" value="Tao Moi" onclick="addCity()"></td>
       </tr>
    </table>`
}
function addCity() {
    let name = $('#cityName').val();
    let country = $('#countriesAdd').val();
    let area = $('#cityArea').val();
    let people = $('#cityPeople').val();
    let gdp = $('#cityGDP').val();
    let description = $('#cityDescription').val();
    let newCity = {
        name : name,
        country: {
            id:  country
        },
        area: area,
        people: people,
        gdp: gdp,
        description: description
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        data: JSON.stringify(newCity),
        url: `http://localhost:8080/cities`,
        success: getAllCity
    });
    event.preventDefault();
}
function removeCity(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/cities/` + id,
        success: getAllCity
    });
    event.preventDefault();
}

function editCity(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/countries ",

        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            document.getElementById('countriesEdit').innerHTML = content;
        }
    });
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/cities/${id}`,
        success : function (city) {

            $("#editCity").html( `<table>
        <tr>
            <td><input type="hidden" id="id" value="${id}"></td>
        </tr>
        <tr>
            <td>Name:</td>
            <td><input style="width: 200px" type="text" id="name" value="${city.name}" placeholder="name"></td>
        </tr>
           <tr>
            <td>Country:</td>
            <td> <select id="countriesEdit">
       
            </select></td>
        </tr>
          <tr>
            <td>Area:</td>
            <td><input style="width: 200px" type="text" id="area" value="${city.area}" placeholder="area"></td>
        </tr>
          <tr>
            <td>People:</td>
            <td><input style="width: 200px" type="text" id="people" value="${city.people}" placeholder="people"></td>
        </tr>
          <tr>
            <td>GDP:</td>
            <td><input style="width: 200px" type="text" id="gdp" value="${city.gdp}" placeholder="gdp"></td>
        </tr>
          <tr>
            <td>Description:</td>
            <td><input style="width: 200px" type="text" id="description" value="${city.description}" placeholder="description"></td>
        </tr>
        <tr>
            <td></td>
            <td><input type="button" value="update" onclick="updateCity()"></td>
        </tr>
    </table>`) }
    });
}
function updateCity() {
    let id = $('#id').val();
    let name = $('#name').val();
    let country = $('#countriesEdit').val();
    let area = $('#area').val();
    let people = $('#people').val();
    let gdp = $('#gdp').val();
    let description = $('#description').val();
    let newCity = {
        id : id,
        name : name,
        country: {
            id : country
        },
        area: area,
        people: people,
        gdp: gdp,
        description: description,
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "PUT",
        data: JSON.stringify(newCity),
        url: `http://localhost:8080/cities`,
        success: getAllCity
    })
    event.preventDefault();
}
function viewCity(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/cities/${id}`,
        success : function (city) {

            $("#addCity").html( `<table>
        
        <tr>
            <td>Name:</td>
            <td>${city.name}</td>
        </tr>
          <tr>
            <td>Country:</td>
            <td>${city.country}</td>
        </tr>
          <tr>
            <td>Area:</td>
            <td>${city.area}</td>
        </tr>
          <tr>
            <td>People:</td>
            <td>${city.people}</td>
        </tr>
          <tr>
            <td>GDP:</td>
            <td>${city.gdp}</td>
        </tr>
          <tr>
            <td>Description:</td>
            <td>${city.description}</td>
        </tr>
    </table>`) }
    });
}
getAllCity();