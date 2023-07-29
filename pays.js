$(function () {

    let btn = document.querySelector("#btn")
    let input = document.querySelector("input")
    input.addEventListener("focus",function(){
        document.onkeydown=function(e){
            if(e.code==="Enter"){
                btn.click()
            }
        }
    })
    
    btn.addEventListener("click", function () {
        let aff = document.querySelector("#aff")
        if (aff)
            aff.remove()
        let input = document.querySelector("input")
        let errorSpan = document.querySelectorAll(".errorSpan")
        errorSpan.forEach(element => {
            element.remove()
        });
        let error = document.querySelectorAll(".error")
        for (let i of error) {
            i.classList.remove("error")
        }
        let wrSpan = document.querySelectorAll(".wrSpan")
        wrSpan.forEach(element => {
            element.remove()
        });
        let wr = document.querySelectorAll(".wr")
        for (let i of wr) {
            i.classList.remove("wr")
        }
        if (input.value === "") {
            let span = document.createElement("span")
            span.textContent = " Entrez le pays que vous voulez"
            span.style.display = "block"
            span.classList.add("errorSpan")
            input.after(span)
            input.classList.add("error")
            input.focus()
        }
        else {
            let valid = document.querySelectorAll(".valid")
            for (let i of valid) {
                i.classList.remove("valid")
            }
            input.classList.add("valid")
            let xmlhttp = new XMLHttpRequest();
            let ex = false
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
                    const ruslt = xmlhttp.response;
                    const data = JSON.parse(ruslt);
                    console.log( (data))
                    let aff = document.createElement("div")
                    aff.id = "aff";
                    for (let pays of data) {
                        if(input.value.toLocaleUpperCase()==="israel".toLocaleUpperCase()){
                            let span = document.createElement("span")
                            span.textContent = " There is no such thing as Israel, there is only Palestine"
                            span.style.display = "block"
                            span.classList.add("wrSpan")
                            input.after(span)
                            input.classList.add("wr")
                            input.focus()
                            ex=true
                            break
                        }
                        
                        if(input.value.toLocaleUpperCase()==="western sahara".toLocaleUpperCase()){
                            let span = document.createElement("span")
                            span.textContent = " There is no such thing as western sahara, there is only Morocco"
                            span.style.display = "block"
                            span.classList.add("wrSpan")
                            input.after(span)
                            input.classList.add("wr")
                            input.focus()
                            ex=true
                            break
                        }
                        if (input.value.toLocaleUpperCase().trim() == pays.name.common.toLocaleUpperCase()) {
                            ex=true
                            $(".serch").animate({ "top": "10px","width":"50%" }, 1000, function () {
                                let currencies = []
                                for (let i in pays.currencies)
                                    currencies.push(pays.currencies[i].name)
                                let languages = []
                                for (let i in pays.languages)
                                    languages.push(pays.languages[i])
                                // console.log(pays)
                                aff.innerHTML = `
            
                        <img src="${pays.flags.png}" style="border:1px solid black" alt="${pays.flags.alt}">
                        <h1>${pays.name.common}</h1>
                        <div class="info">
                        <table class="table  table-borderless table-striped">
                        <tr>
                        <td>
                        <h3>name official</h3>
                        </td>
                        <td>
                        <h3>${pays.name.official}</h3>
                        
                        </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>capital</h3>
                            </td>
                            <td>
                                <h3>${pays.capital.join()}</h3>
                                
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Country name codes </h3>
                            </td>
                            <td>
                                <h3>${pays.cca3}</h3>
            
                                </td>
                                </tr>
                        <tr>
                            <td>
                                <h3>population </h3>
                            </td>
                            <td>
                                <h3>${pays.population}</h3>
            
                                </td>
                                </tr>
                        <tr>
                        <td>
                        <h3>maps </h3>
                            </td>
                            <td>
                                <h3>
                                <a href="${pays.maps.googleMaps}">${pays.name.common} in google maps
                                    <img src="images/téléchargement.png" width="20px">
                                    </a>
                                    </h3>
            
                                    </td>
                        </tr>
                        <tr>
                        <td>
                                <h3>coat Of Arms</h3>
                            </td>
                            <td>
                                <img src="${pays.coatOfArms.png}" width="150px" alt="">
                                
                            </td>
                        </tr>
                        <tr>
                        <td>
                                <h3>continents</h3>
                            </td>
                            <td>
                                <h3>${pays.continents.join()}</h3>
                                </td>
                            </tr>
                            <tr>
                            <td>
                                <h3>currencies</h3>
                            </td>
                            <td>
                                <h3>${currencies.join()}</h3>
                                
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>languages</h3>
                            </td>
                            <td>
                            <h3>${languages.join()}</h3>
                            </td>
                            </tr>
                            <tr>
                            <td>
                                <h3> top-level domain(tld) </h3>
                                </td>
                                <td>
                                <h3>${pays.tld.join("/")}</h3>
                                
                                </td>
                                </tr>
                                </table>
                                </div>
                                
                                `
                                document.body.append(aff)
                                $(aff).fadeIn(3000)
                            })
                        }
                    }
                    if (ex==false && input.value!=="") {
                        let span = document.createElement("span")
                        span.textContent = " Nous n'avons pas pu le trouver"
                        span.style.display = "block"
                        span.classList.add("wrSpan")
                        input.after(span)
                        input.classList.add("wr")
                        input.focus()
                    }
                }
            }
            xmlhttp.open("GET", " https://restcountries.com/v3.1/all");
            xmlhttp.send()

        }
    })
})