$('.search-button').on('click', function(){
    $.ajax({
        url: 'https://www.omdbapi.com/?s=' + $('.input-keyword').val() + '&apikey=3265096c',
        success: res => {
            const movie = res.Search;
            let cards = '';
            movie.forEach(m => {
                cards += kartu(m);
            });
            $('.movie-container').html(cards);
    
            // ketika tombol ditekan
            $('.modal-button').on('click', function(){
                $.ajax({
                    url: 'https://www.omdbapi.com/?i=' + $(this).data('imdbid') + '&apikey=3265096c',
                    success: m => {
                        const isi = modalBody(m);
                        $('.modal-body').html(isi);
                    },
                    error: e => {
                        console.log(e.responseText);
                    }
                });
            });
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
})




function modalBody(m){
    return ` <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title}</h4></li>
                            <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                            <li class="list-group-item"><strong>Actor : </strong>${m.Actors}</li>
                            <li class="list-group-item"><strong>Writers : </strong>${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
};

function kartu(m){
    return `<div class="col-md-4 my-5">
                <div class="card" >
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-button" data-toggle="modal" data-target="#movieDetails" data-imdbid="${m.imdbID}">Details</a>
                    </div>
                </div>
            </div>`
}
