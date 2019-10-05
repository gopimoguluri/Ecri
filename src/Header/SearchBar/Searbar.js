import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";
import styles from "./searchbar.module.scss";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchPhrase: "" };
  }

  executeSearch() {
    if (!/^\s*$/.test(this.state.searchPhrase)) {
      const sp = this.state.searchPhrase;
      this.setState({ searchPhrase: "" }, () => {
        this.props.onSearchRequest(sp);
      });
    }
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.executeSearch();
    }
  }

  handleTextChange(e) {
    this.setState({ searchPhrase: e.target.value });
  }


  render() {   
    return (
      <div className={`${this.props.cxtClassName ? styles[this.props.cxtClassName] : ''} ${styles.searchBar}`}>
        <div className={styles.fieldSet} role="group">
          <input
            className={styles.searchInput}
            id={this.props.searchId}
            type="search"
            name="search"
            placeholder="Search Guidelines"
            value={this.state.searchPhrase}
            onChange={txt => this.handleTextChange(txt)}
            onKeyPress={k => this.handleKeyPress(k)}
            aria-label="Search Guidelines"
          />
          <button className={styles.searchBarButton} aria-label="Search Guidelines">
            <FontAwesomeIcon
              onClick={() => this.executeSearch()}
              icon={faSearch}
            />
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
