const key = "7fd9eb4c";
const dummyDesc = "Some Mothers Do 'Ave 'Em blablablablablablablablablabla";
let page = 1;
let totalResult = 1;
function req_ajax(url, refresh = false) {
  $.ajax({
    url: url,
    dataType: "json",
    data: {
      apikey: key,
      s: $(".search-input").val(),
      page: page,
    },
    success: function (data) {
      if (refresh) {
        $(".movie-container .row").html("");
        page = 1;
      }
      if (data.Response === "True") {
        let movies = data.Search;
        totalResult = parseInt(data.totalResults);
        movies.forEach(function (movie) {
          let title =
            movie.Title.length <= dummyDesc.length - 3
              ? movie.Title
              : movie.Title.substring(0, dummyDesc.length - 3) + "...";
          $(".movie-container .row").append(
            `<div class="col-md-4 mb-4"><div class="card text-bg-dark"><img src="${movie.Poster}" class="card-img-top" height="400" alt="Movie Poster"><div class="card-body"><h5 class="card-title" style="min-height:48px">${title}</h5><p class="card-text opacity-75">${movie.Year}</p><a href="#" class="btn btn-primary">See Details</a></div></div> </div>`
          );
        });
        if (page * 10 < totalResult) {
          $(".load-more").show();
        } else {
          $(".load-more").hide();
        }
      } else {
        $(".load-more").hide();
        $(".movie-container .row").html(`<div class="container mt-3">
        <div class="alert alert-danger text-center" id="errorMessage">${data.Error}</div></div>`);
      }
    },
  });
}

$(".search-btn").on("click", function () {
  req_ajax("https://www.omdbapi.com", true);
});

$(".search-input").on("keyup", function (e) {
  if (e.which === 13) req_ajax("https://www.omdbapi.com", true);
});

$(".load-more").on("click", function () {
  page++;
  req_ajax("https://www.omdbapi.com", false);
});
