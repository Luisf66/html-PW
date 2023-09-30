function montarListaDeCervejas(cervejas) {
    const div = document.getElementById("cervejasDiv");
    const itensHtml = cervejas.map(({ country, city, street_name, street_address, secondary_address, building_number, community, zip_code, postcode }) => `
       <ul class="column">
          <li title="País">${country}</li>
          <li title="Cidade">${city}</li>
          <li title="Rua">${street_name}</li>
          <li title="Endereço">${street_address}</li>
          <li title="Endereço secundário">${secondary_address}</li>
          <li title="Número">${building_number}</li>
          <li title="Comunidade">${community}</li>
          <li title="Codigo Zip">${zip_code}</li>
          <li title="Codigo Postal">${postcode}</li>
       </ul>
    `);
    div.innerHTML = `${itensHtml.join("\n")}`;
 }
 
 async function carregarCervejas() {
    try {
       let res = await fetch("https://random-data-api.com/api/v2/addresses?size=3");
       cervejas = await res.json();
       montarListaDeCervejas(cervejas);
    } catch (err) {
       document.getElementById("cervejasDiv").innerHTML = "Fudeu...";
    }
 }
 
 let botao = document.getElementById("botaoCarregar");
 botao.addEventListener("click", () => carregarCervejas());