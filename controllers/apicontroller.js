const axios = require("axios");

exports.renderIndex = (req, res) => {
  axios
    .get(
      "https://api.themoviedb.org/3/tv/popular?api_key=6f7da95eebd974ea062f5c6c9c3563f5&language=en-US&page=1"
    )
    .then(function (response) {
      res.render("index", {
        popular: response.data.results.slice(0, 6),
      });
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.status);
        res.send("error");
      }
    });
};

exports.search = (req, res) => {
  var page = 1;
  if (req.query.page) {
    page = req.query.page;
  }
  axios
    .get(
      `https://api.themoviedb.org/3/search/tv?api_key=6f7da95eebd974ea062f5c6c9c3563f5&language=en-US&query=${req.query.q}&include_adult=false&page=${page}`
    )
    .then(function (response) {
      res.render("search", {
        query: req.query.q,
        totalResults: response.data.total_results,
        page: response.data.page,
        totalPages: response.data.total_pages,
        results: response.data.results,
      });
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.status);
        res.send("error");
      }
    });
};

exports.getLength = (req, res) => {
  axios
    .get(
      `https://api.themoviedb.org/3/tv/${req.params.showId}?api_key=6f7da95eebd974ea062f5c6c9c3563f5&language=en-US`
    )
    .then(function (response) {
      const totalTimeMinutes =
        response.data.number_of_episodes * response.data.episode_run_time[0];
      const totalTimeHours = parseInt(totalTimeMinutes / 60);
      const remainingMinutes = parseInt(totalTimeMinutes % 60);
      res.render("overview", {
        show: response.data,
        hours: totalTimeHours,
        minutes: remainingMinutes,
      });
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.status);
        res.send("error");
      }
    });
};
