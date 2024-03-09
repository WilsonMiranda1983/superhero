 

$(document).ready(function(){
    console.log('Se cargo el DOM');
    let token = "10232717122488277"
    let heroID= $('#idhero')
    let buscar=$('#enviarID')
    let mostrarheroe=$('#mostrarheroe')
    

    buscar.click(function(e){
        e.preventDefault();
        let validacionNumero = /[0-9]/gim  
        let superheroeID= heroID.val()
        
        if( superheroeID.length !=0 && superheroeID>=0){
             console.log('superheroeID',superheroeID)
             buscarHeroe(superheroeID)
        }else{
            alert('Ingrese datos correctamente')
        }
    })

    const buscarHeroe = (id_heroe) =>{
        console.log('id_heroe',id_heroe)
        console.log('token',token)
        $.ajax({
            type: "GET",
            url:`https://superheroapi.com/api.php/${token}/${id_heroe}`,
            datatype: "json",
            success: function(dataheroe){
                console.log( 'salida dataheroe',dataheroe)
                let nombre= dataheroe.name                
                let conexiones = dataheroe.connections['group-affiliation']
                let publicante = dataheroe.biography.publisher                 
                let ocupacion = dataheroe.work.occupation                      
                let primeraaparicion = dataheroe.biography['first-appearance']               
                let altura = dataheroe.appearance.height       
                let peso = dataheroe.appearance.weight                           
                let aliados = dataheroe.biography.aliases                         
                let imagen = dataheroe.image.url
                let estadisticas = dataheroe.powerstats
                

                mostrarheroe.html(`
                <h5 class="text-center pb-0">SuperHeroe encontrado</h5>
                 
                    <div class="card mb-3" >     
                        <div class="row g-0">
                          <div class="col-md-4">
                            <img src="${imagen}" class="img-fluid rounded-2 imgSuperHero" alt="imagen heroe">
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                                  <h5 class="card-title">Nombre: ${nombre}</h5>
                                  <p>Conexiones: ${conexiones}</p>
                                  <div class="card-body pt-0">
                                  <p>Publicado por: ${publicante}</p>
                                  <hr class= "my-1">
                                  <p class= "fs-6 mb-0">Ocupación: ${ocupacion}</p>
                                  <hr class= "my-1">
                                  <p class= "my-1">Primera Aparición: ${primeraaparicion}</p>
                                  <hr class= "my-1">
                                  <p class= "my-1">Altura: ${altura}</p>
                                  <hr class= "my-1">
                                  <p class="my-1" >Peso: ${peso}</p>
                                  <hr class= "my-1">
                                  <p >Alianzas: ${aliados}</p>
                                <div 
                                </div>
                          </div>
                        </div>
                    </div> 
                `)
                 
                let poderes = [];
                for (const key in estadisticas) {
                    poderes.push(
                        {
                            y: parseInt( estadisticas[key] == 'null' ? 0 : estadisticas[key] ), 
                            indexLabel: key
                        });
                };
                  console.log('salida poderes',poderes)  
                // let chart = new CanvasJS.Chart("grafico", {
                    
                //     title: {
                //         text: `Estadísticas de Poder para ${nombre}`
                //     },
                //     animationEnabled: true,
                //     animationDuration: 2000,
                    
                //     data: [{
                //         type: "pie",
                //         startAngle: 40,
                //         toolTipContent: " {y}",
                //         showInLegend: "true",
                //         legendText: "{y}",
                //         indexLabelFontSize: 16,
                //         indexLabel: " {y}",
                //         dataPoints: poderes
                            
                //     }]
                // });
                // chart.render();
                let chart = new CanvasJS.Chart("grafico", {
                    animationEnabled: true,
                    title: {
                        text:  `Estadísticas de Poder para ${nombre}`
                    },
                    data: [{
                        type: "pie",
                        startAngle: 240,
                        yValueFormatString: "##0",
                        legendText: "{label} ",
                        indexLabel: "{label} {y}",
                        dataPoints: poderes
                           
                    }]
                });
                chart.render();
                  
            },
            error : function(xhr, status) {
                alert('Error de acceso a datos');
                console.log( 'salida error', xhr)
            },  
        });

    }

});