function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class RickAndMorty extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",

    {
      page: 1,
      totalPages: 1,
      searchTerm: '',
      searching: false,
      searched: false,
      characters: [] });_defineProperty(this, "firstCharacterRef",


    React.createRef());_defineProperty(this, "handleSearchInput",

    debounce(searchTerm => this.setState({ page: 1, searchTerm, searching: true }, this.fetchCharacters)));_defineProperty(this, "fetchCharacters",

    () => {
      fetch(`https://rickandmortyapi.com/api/character/?page=${this.state.page}&name=${this.state.searchTerm}`).
      then(res => res.json()).
      then(data => this.setState({
        totalPages: data.info.pages,
        characters: data.results,
        searching: false,
        searched: true })).

      then(() => this.firstCharacterRef.current.focus()).
      catch(() => this.setState({
        page: 1,
        totalPages: 1,
        characters: [],
        searching: false,
        searched: true }));

    });_defineProperty(this, "changePage",

    e => {
      Array.from(e.target.classList).includes('page-btn-next') ?
      this.setState(prevState => ({ page: prevState.page + 1 }), this.fetchCharacters) :
      this.setState(prevState => ({ page: prevState.page - 1 }), this.fetchCharacters);
    });}

  render() {
    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement("header", null, /*#__PURE__*/
      React.createElement("h1", { className: "heading" }, "Rick ", /*#__PURE__*/React.createElement("span", null, "And"), " Morty")), /*#__PURE__*/

      React.createElement("main", null, /*#__PURE__*/
      React.createElement(SearchInput, { handleSearchInput: e => this.handleSearchInput(e.target.value.replace(" ", "+")) }),
      this.state.searching ? /*#__PURE__*/React.createElement("div", { className: "search-loader" }) : null,
      this.state.searched && !this.state.searching ? /*#__PURE__*/React.createElement(SearchOutput, { characters: this.state.characters, firstCharacterRef: this.firstCharacterRef }) : null,
      this.state.totalPages > 1 && !this.state.searching ? /*#__PURE__*/React.createElement(PageNavigation, { page: this.state.page, totalPages: this.state.totalPages, changePage: this.changePage }) : null)));



  }}


function SearchInput({ handleSearchInput }) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "search" }, /*#__PURE__*/
    React.createElement("label", { htmlFor: "search-input", className: "search-input-label" }, "Character Search:"), /*#__PURE__*/
    React.createElement("input", { type: "text", id: "search-input", className: "search-input", placeholder: "e.g. 'rick'", spellCheck: "false", onChange: handleSearchInput })));


}

function SearchOutput({ characters, firstCharacterRef }) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "search-output" },

    characters.length > 0 ?
    characters.map((character, index) => /*#__PURE__*/React.createElement(Character, { character: character, key: character.id, index: index, firstCharacterRef: firstCharacterRef })) : /*#__PURE__*/
    React.createElement("p", { className: "no-results" }, "No Results Found")));



}

function Character({ character, firstCharacterRef, index }) {
  return /*#__PURE__*/(
    React.createElement("details", { className: "character-details" }, /*#__PURE__*/

    React.createElement("summary", { className: "character-summary", ref: index === 0 ? firstCharacterRef : null }, character.name), /*#__PURE__*/

    React.createElement("div", { className: "character-container" }, /*#__PURE__*/

    React.createElement("div", { className: "character-info" }, /*#__PURE__*/

    React.createElement("details", { className: "character-info-item", open: true }, /*#__PURE__*/
    React.createElement("summary", { className: "character-info-item-summary" }, "Name"), /*#__PURE__*/
    React.createElement("p", { className: "character-info-item-data" }, character.name)), /*#__PURE__*/


    React.createElement("details", { className: "character-info-item", open: true }, /*#__PURE__*/
    React.createElement("summary", { className: "character-info-item-summary" }, "Species"), /*#__PURE__*/
    React.createElement("p", { className: "character-info-item-data" }, character.species)), /*#__PURE__*/


    React.createElement("details", { className: "character-info-item", open: true }, /*#__PURE__*/
    React.createElement("summary", { className: "character-info-item-summary" }, "Gender"), /*#__PURE__*/
    React.createElement("p", { className: "character-info-item-data" }, character.gender)), /*#__PURE__*/


    React.createElement("details", { className: "character-info-item", open: true }, /*#__PURE__*/
    React.createElement("summary", { className: "character-info-item-summary" }, "Location"), /*#__PURE__*/
    React.createElement("p", { className: "character-info-item-data" }, character.location.name))), /*#__PURE__*/




    React.createElement("div", { className: "character-image-container" }, /*#__PURE__*/
    React.createElement("img", { className: "character-image", src: character.image, alt: character.name })))));






}

function PageNavigation({ page, totalPages, changePage }) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "page-navigation" },
    page > 1 ? /*#__PURE__*/React.createElement("button", { className: "page-btn page-btn-prev", onClick: changePage }, "Prev Page") : null,
    page < totalPages ? /*#__PURE__*/React.createElement("button", { className: "page-btn page-btn-next", onClick: changePage }, "Next Page") : null));


}

function debounce(func, wait = 800) {

  let timeout;

  return function () {

    const context = this,
    args = arguments;

    clearTimeout(timeout);

    timeout = setTimeout(() => {

      timeout = null;

      func.apply(context, args);

    }, wait);
  };
}

ReactDOM.render( /*#__PURE__*/React.createElement(RickAndMorty, null), document.querySelector('.rick-and-morty'));

console.log('Wubba Lubba Dub-Dub! 👴🏻👦🍾🔬🔫🌌🚀🛸👾');