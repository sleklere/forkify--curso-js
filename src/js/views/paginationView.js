import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  // takes in 'prev' or similar for previous page, else return btn for next page
  _btnMarkup(direction) {
    const curPage = this._data.page;
    if (direction.includes('prev')) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      `;
    }
    return `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._btnMarkup('next');
    }
    // last page
    if (curPage === numPages && numPages > 1) {
      return this._btnMarkup('previous');
    }
    // other page
    if (curPage < numPages) {
      return this._btnMarkup('prev') + this._btnMarkup('next');
    }
    // page 1, and there are no other pages
    return '';
  }
}

export default new PaginationView();
