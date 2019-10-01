const API_URL = "https://api.themoviedb.org/3/tv";
const API_KEY = "a9b59899abe04ed021d670db47633005";
const IMAGE_URL = "https://image.tmdb.org/t/p/w300";
const ROOT_DOC = document.getElementById("root");

function getPopularTvShows() {
  return fetch(`${API_URL}/popular?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(response => response.results);
}

function getTopRatedTvShows() {
  return fetch(`${API_URL}/top_rated?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(response => response.results);
}

function getTvEpisodesInfoById(
  tv_episodes_id,
  tv_episodes_season_number,
  id_episodes_number
) {
  return fetch(
    `${API_URL}/${tv_episodes_id}/season/${tv_episodes_season_number}/episode/${id_episodes_number}?api_key=${API_KEY}&language=en-US`
  ).then(response => response.json());
}

function getTvShowInfoById(tvShowId) {
  return fetch(`${API_URL}/${tvShowId}?api_key=${API_KEY}&language=en-US`).then(
    response => response.json()
  );
}

function getSesonInfoById(season_number, selected_tv_show_id) {
  return fetch(
    `${API_URL}/${selected_tv_show_id}/season/${season_number}?api_key=${API_KEY}&language=en-US`
  ).then(response => response.json());
}

window.onload = async function() {
  let popular_tv_show = document.createElement("div");
  popular_tv_show.setAttribute("class", "pages");
  popular_tv_show.setAttribute("id", "popularTvShow");
  popular_tv_show.innerHTML = "Popular TV Shows";
  ROOT_DOC.appendChild(popular_tv_show);

  let top_rated_tv_show = document.createElement("div");
  top_rated_tv_show.setAttribute("class", "pages");
  top_rated_tv_show.setAttribute("id", "topRatedTvShow");
  top_rated_tv_show.innerHTML = "Top rated TV Shows";
  ROOT_DOC.appendChild(top_rated_tv_show);

  document.getElementById("popularTvShow").style.border = "2px solid silver";
  document.getElementById("topRatedTvShow").style.border = "";

  const data_popular_tv_show = await getPopularTvShows();
  const ul = document.createElement("ul");
  ul.setAttribute("id", "getPopularTvShows");
  data_popular_tv_show.forEach(show => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" onclick="renderTvShowsDetailInfo(${show.id})">${
      show.original_name
    }</a>`;
    ul.appendChild(li);
  });
  ROOT_DOC.appendChild(ul);

  popular_tv_show.onclick = async function() {
    document.getElementById("popularTvShow").style.border = "2px solid silver";
    document.getElementById("topRatedTvShow").style.border = "";

    ROOT_DOC.removeChild(document.getElementById("getPopularTvShows"));
    const data_popular_tv_show = await getPopularTvShows();
    const ul = document.createElement("ul");
    ul.setAttribute("id", "getPopularTvShows");
    data_popular_tv_show.forEach(show => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#" onclick="renderTvShowsDetailInfo(${
        show.id
      })">${show.original_name}</a>`;
      ul.appendChild(li);
    });
    ROOT_DOC.appendChild(ul);
  };

  top_rated_tv_show.onclick = async function() {
    document.getElementById("topRatedTvShow").style.border = "2px solid silver";
    document.getElementById("popularTvShow").style.border = "";

    ROOT_DOC.removeChild(document.getElementById("getPopularTvShows"));
    const data_top_rated_tv_show = await getTopRatedTvShows();
    const ul = document.createElement("ul");
    ul.setAttribute("id", "getPopularTvShows");
    data_top_rated_tv_show.forEach(show => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#" onclick="renderTvShowsDetailInfo(${
        show.id
      })">${show.original_name}</a>`;
      ul.appendChild(li);
    });
    ROOT_DOC.appendChild(ul);
  };
};

async function renderTvShowsDetailInfo(tvShowId) {
  let MINE_TITLE_OF_TV_SHOW = document.createElement("h1");
  let OVERVIEW_OF_TV_SHOW = document.createElement("p");
  let POSTER_PATH_OF_TV_SHOW = document.createElement("img");
  let SEASON_NUMBER_OF_TV_SHOW = document.createElement("h3");
  let EPISODES_NUMBER_OF_TV_SHOW = document.createElement("h3");
  let LIST_STYLE_OF_SEASON_TV_SHOW = document.createElement("ul");

  while (ROOT_DOC.firstChild) {
    ROOT_DOC.removeChild(ROOT_DOC.firstChild);
  }
  let selected_tv_show = await getTvShowInfoById(tvShowId);

  let seasons_of_tv_show = selected_tv_show.seasons;

  seasons_of_tv_show.forEach(show => {
    let li = document.createElement(`li`);
    li.innerHTML = `<a href='#' onclick="renderSeasonDetailsInfo(${
      show.season_number
    }, ${selected_tv_show.id})">${show.name}</a>`;
    LIST_STYLE_OF_SEASON_TV_SHOW.appendChild(li);
  });

  EPISODES_NUMBER_OF_TV_SHOW.innerHTML = `Number of episodes - ${
    selected_tv_show.number_of_episodes
  }`;
  SEASON_NUMBER_OF_TV_SHOW.innerHTML = `Number of season - ${
    selected_tv_show.number_of_seasons
  }`;
  POSTER_PATH_OF_TV_SHOW.setAttribute(
    "src",
    `${IMAGE_URL}${selected_tv_show.poster_path}`
  );
  OVERVIEW_OF_TV_SHOW.innerHTML = `${selected_tv_show.overview}`;
  MINE_TITLE_OF_TV_SHOW.innerHTML = `${selected_tv_show.original_name}`;

  let innerObj_of_tv_show = [
    MINE_TITLE_OF_TV_SHOW,
    OVERVIEW_OF_TV_SHOW,
    POSTER_PATH_OF_TV_SHOW,
    SEASON_NUMBER_OF_TV_SHOW,
    EPISODES_NUMBER_OF_TV_SHOW,
    LIST_STYLE_OF_SEASON_TV_SHOW
  ];
  let inner_element_of_tv_shows = appendingElement(innerObj_of_tv_show);
  ROOT_DOC.appendChild(inner_element_of_tv_shows);
}

async function renderSeasonDetailsInfo(season_number, selected_tv_show_id) {
  let MINE_TITLE_OF_SEASON = document.createElement("h1");
  let OVERVIEW_OF_SEASON = document.createElement("p");
  let POSTER_PATH_OF_SEASON = document.createElement("img");
  let SEASON_NUMBER_OF_SEASON = document.createElement("h3");
  let EPISODES_NUMBER_OF_SEASON = document.createElement("h3");
  let LIST_STYLE_OF_SEASON = document.createElement("ul");

  while (ROOT_DOC.firstChild) {
    ROOT_DOC.removeChild(ROOT_DOC.firstChild);
  }

  let SELECTED_SEASON_INFO = await getSesonInfoById(
    season_number,
    selected_tv_show_id
  );

  let SELECTED_TV_SHOW_NUMBER_OF_EPISODES = await getTvShowInfoById(
    selected_tv_show_id
  );

  EPISODES_NUMBER_OF_SEASON.innerHTML = `Number of episodes in season - ${
    SELECTED_SEASON_INFO.episodes.length
  }`;
  POSTER_PATH_OF_SEASON.setAttribute(
    "src",
    `${IMAGE_URL}${SELECTED_SEASON_INFO.poster_path}`
  );
  MINE_TITLE_OF_SEASON.innerHTML = `${SELECTED_SEASON_INFO.name}`;
  OVERVIEW_OF_SEASON.innerHTML = `${SELECTED_SEASON_INFO.overview}`;
  SEASON_NUMBER_OF_SEASON.innerHTML = `Season number - ${season_number}`;

  SELECTED_SEASON_INFO.episodes.forEach(show => {
    let li = document.createElement(`li`);
    li.innerHTML = `<a href='#' onclick="showEpisodesInfo(${show.show_id}, ${
      show.season_number
    }, ${show.episode_number})">${show.name}</a>`;
    LIST_STYLE_OF_SEASON.appendChild(li);
  });

  let innerObj_of_season = [
    MINE_TITLE_OF_SEASON,
    OVERVIEW_OF_SEASON,
    POSTER_PATH_OF_SEASON,
    SEASON_NUMBER_OF_SEASON,
    EPISODES_NUMBER_OF_SEASON,
    LIST_STYLE_OF_SEASON
  ];
  let finish_object_of_season = appendingElement(innerObj_of_season);

  ROOT_DOC.appendChild(finish_object_of_season);
}
async function showEpisodesInfo(
  tv_episodes_id,
  tv_episodes_season_number,
  id_episodes_number
) {
  let MINE_TITLE_OF_EPISODES = document.createElement("h1");
  let OVERVIEW_OF_EPISODES = document.createElement("p");
  let POSTER_PATH_OF_EPISODES = document.createElement("img");
  let SEASON_NUMBER_OF_EPISODES = document.createElement("h3");
  let EPISODES_NUMBER_OF_EPISODES = document.createElement("h3");
  let LIST_STYLE_OF_EPISODES = document.createElement("ul");
  while (ROOT_DOC.firstChild) {
    ROOT_DOC.removeChild(ROOT_DOC.firstChild);
  }
  let GET_EPISODES_INFO = await getTvEpisodesInfoById(
    tv_episodes_id,
    tv_episodes_season_number,
    id_episodes_number
  );

  POSTER_PATH_OF_EPISODES.setAttribute(
    "src",
    `${IMAGE_URL}${GET_EPISODES_INFO.still_path}`
  );
  MINE_TITLE_OF_EPISODES.innerHTML = `${GET_EPISODES_INFO.name}`;
  OVERVIEW_OF_EPISODES.innerHTML = `${GET_EPISODES_INFO.overview}`;
  SEASON_NUMBER_OF_EPISODES.innerHTML = `Number of episode - ${
    GET_EPISODES_INFO.episode_number
  }`;
  EPISODES_NUMBER_OF_EPISODES.innerHTML = `Number of season - ${
    GET_EPISODES_INFO.season_number
  }`;
  let innerObj_of_episodes = [
    MINE_TITLE_OF_EPISODES,
    OVERVIEW_OF_EPISODES,
    POSTER_PATH_OF_EPISODES,
    SEASON_NUMBER_OF_EPISODES,
    EPISODES_NUMBER_OF_EPISODES
  ];
  let finish_object_of_episodes = appendingElement(innerObj_of_episodes);
  ROOT_DOC.appendChild(finish_object_of_episodes);
}

function appendingElement(innerObj) {
  let appendedElement = document.createElement("div");

  for (let i = 0; i < innerObj.length; i++) {
    appendedElement.appendChild(innerObj[i]);
  }

  return appendedElement;
}
