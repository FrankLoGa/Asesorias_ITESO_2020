let urlFetch = "/profesores.route";
//Arreglo de materias
let posts =[]
let postsF = [];


    loadJSON(urlFetch, succes, error);

    function succes(data){
        console.log("YAII");
        let arrTemp = JSON.stringify(data);
        posts = JSON.parse(arrTemp);
        console.log(posts);
        posts.forEach(element => {
           if(element.Materia == 1){
            postsF.push(element);
           }
       });
           
      
       postCardForo.innerHTML = postsF.map(element=>`<div class="card-header" id="postCardForo">
                                                        <div class="media flex-wrap w-100 align-items-center">
                                                            <div class="media-body ml-3"> <a href="javascript:void(0)" data-abc="true">${element.autor}</a>
                                                            </div>
                                                            <div class="text-muted small ml-3">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card-body">
                                                        <p><h3>${element.title}</h3><br>${element.Message}</p>
                                                    </div>
                                                    <div class="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">

                                                        <div class="px-4 pt-3"> <button type="button" class="btn btn-primary"><i class="ion ion-md-create"></i>&nbsp; Reply</button> </div>
                                                    </div>
                                                    <br>`
        ).join("");
   }
    function error(){
        console.log("Oops!! something went wrong");
    }