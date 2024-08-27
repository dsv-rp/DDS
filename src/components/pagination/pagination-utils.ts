import type { PaginationContent } from "./daikin-pagination";

export class PaginationCalculator {
  private _pageArray: PaginationContent;
  private _lastPage: number;
  private _pageWindow: number;
  constructor(lastPage: number, pageWindow: number) {
    this._pageArray = this.resetPagesStart();
    this._lastPage = lastPage;
    this._pageWindow = pageWindow;
  }

  private _getAllPagesArray() {
    return Array.from({ length: this._lastPage }, (_, i) => i + 1);
  }

  public resetPagesStart() {
    this._pageArray = {
      leftMost: 1,
      leftEllipsis: [],
      middle: [],
      rightEllipsis: [],
      rightMost: this._lastPage,
    };
    const allPagesArray = this._getAllPagesArray();
    this._pageArray.middle = allPagesArray.slice(1, this._pageWindow - 1);
    this._pageArray.rightEllipsis = allPagesArray.slice(
      this._pageWindow - 1,
      allPagesArray[allPagesArray.length - 1] - 1
    );
    return this._pageArray;
  }

  private _resetPagesEnd() {
    this._pageArray = {
      leftMost: 1,
      leftEllipsis: [],
      middle: [],
      rightEllipsis: [],
      rightMost: this._lastPage,
    };
    const allPagesArray = this._getAllPagesArray();
    this._pageArray.leftEllipsis = allPagesArray.slice(
      1,
      -this._pageWindow + 1
    );
    this._pageArray.middle = allPagesArray.slice(-this._pageWindow + 1, -1);
  }

  // Move the min currentPage from RightDropDown to ShowPages
  public moveMinValueLeftShow() {
    const minValueRightDropDown = Math.min(...this._pageArray.rightEllipsis);
    this._pageArray.rightEllipsis.splice(
      this._pageArray.rightEllipsis.indexOf(minValueRightDropDown),
      1
    );
    this._pageArray.middle.push(minValueRightDropDown);
  }

  // Move the min currentPage from ShowPages to LeftDropDown
  public moveMinValueLeftOmission() {
    const minValueShowPages = Math.min(...this._pageArray.middle);
    this._pageArray.middle.splice(
      this._pageArray.middle.indexOf(minValueShowPages),
      1
    );
    this._pageArray.leftEllipsis.push(minValueShowPages);
  }

  // Move the max currentPage from pageWindow to rightDropDown
  public moveMaxValueRightOmission() {
    const maxValueShowPages = Math.max(...this._pageArray.middle);
    this._pageArray.middle.splice(
      this._pageArray.middle.indexOf(maxValueShowPages),
      1
    );
    this._pageArray.rightEllipsis.unshift(maxValueShowPages);
  }

  // Move the max currentPage from leftDropDown to pageWindow
  public moveMaxValueRightShow() {
    const maxValueLeftDropDown = Math.max(...this._pageArray.leftEllipsis);
    this._pageArray.leftEllipsis.splice(
      this._pageArray.leftEllipsis.indexOf(maxValueLeftDropDown),
      1
    );
    this._pageArray.middle.unshift(maxValueLeftDropDown);
  }

  public handleClickChevron(type: "left" | "right", currentPage: number) {
    if (type === "left") {
      if (
        currentPage < Math.min(...this._pageArray.middle) &&
        currentPage != 1
      ) {
        this.moveMaxValueRightOmission();
        if (this._pageArray.rightEllipsis.length === 1) {
          this.moveMaxValueRightOmission();
        }
        this.moveMaxValueRightShow();
        if (this._pageArray.leftEllipsis.length === 1) {
          this.moveMaxValueRightShow();
        }
      } else if (
        currentPage === this._lastPage - 1 &&
        this._pageArray.rightEllipsis.length > 0
      ) {
        this._resetPagesEnd();
      }
    } else {
      if (
        currentPage > Math.max(...this._pageArray.middle) &&
        currentPage != this._pageArray.rightMost
      ) {
        this.moveMinValueLeftOmission();
        if (this._pageArray.leftEllipsis.length === 1) {
          this.moveMinValueLeftOmission();
        }
        this.moveMinValueLeftShow();
        if (this._pageArray.rightEllipsis.length === 1) {
          this.moveMinValueLeftShow();
        }
      } else if (currentPage === 2 && this._pageArray.leftEllipsis.length > 0) {
        this.resetPagesStart();
      }
    }

    return this._pageArray;
  }

  public handleChoosePageRight(currentPage: number) {
    if (currentPage >= this._lastPage - 2) {
      this._resetPagesEnd();
      return this._pageArray;
    }
    // move RightDropDown to ShowPages to show
    const moveCount1 = this._pageArray.rightEllipsis.filter(
      (x) => x <= currentPage
    ).length;
    for (let i = 0; i < moveCount1; i++) {
      this.moveMinValueLeftShow();
    }
    // move ShowPages to LeftDropDown to hide
    const moveCount2 = this._pageArray.middle.length - (this._pageWindow - 3);
    for (let j = 0; j < moveCount2; j++) {
      this.moveMinValueLeftOmission();
    }
    return this._pageArray;
  }

  public handleChoosePageLeft(currentPage: number) {
    if (currentPage <= 3) {
      this.resetPagesStart();
      return this._pageArray;
    }
    // move LeftDropDown to ShowPages to show
    const moveCount1 = this._pageArray.leftEllipsis.filter(
      (x) => x >= currentPage
    ).length;
    for (let i = 0; i < moveCount1; i++) {
      this.moveMaxValueRightShow();
    }
    // move ShowPages to RightDropDown to hide
    const moveCount2 = this._pageArray.middle.length - (this._pageWindow - 3);
    for (let i = 0; i < moveCount2; i++) {
      this.moveMaxValueRightOmission();
    }
    return this._pageArray;
  }
}
