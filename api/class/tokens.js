class Tokens {
  constructor() {
    if (this.constructor.instance) {
      return this.constructor.instance;
    }

    this.constructor.instance = this;
    this._accessToken = "";
    this._refreshToken = "";
  }

  get accessToken() {
    return this._accessToken;
  }

  get refreshToken() {
    return this._refreshToken;
  }

  set accessToken(val) {
    this._accessToken = val;
  }

  set refreshToken(val) {
    this._refreshToken = val;
  }
}

export { Tokens };
