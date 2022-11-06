type LoadableState<T> =
  | {
      status: 'initialized';
    }
  | {
      status: 'pending';
      promise: Promise<T | undefined>;
    }
  | {
      status: 'fulfilled';
      data: T;
    }
  | {
      status: 'rejected';
      error: unknown;
    };

export class Loadable<T> {
  private _fetcher: () => Promise<T>;
  private _state: LoadableState<T>;
  constructor(fetcher: () => Promise<T>) {
    this._fetcher = fetcher;
    this._state = { status: 'initialized' };
  }

  get current() {
    switch (this._state.status) {
      case 'initialized': {
        const promise = this.fetch();
        this._state = {
          status: 'pending',
          promise,
        };
        throw promise;
      }
      case 'pending': {
        throw this._state.promise;
      }
      case 'fulfilled': {
        return this._state.data;
      }
      case 'rejected': {
        throw this._state.error;
      }
    }
  }

  private async fetch(): Promise<T | undefined> {
    try {
      const data = await this._fetcher();
      this._state = {
        status: 'fulfilled',
        data,
      };
      return data;
    } catch (error) {
      this._state = {
        status: 'rejected',
        error,
      };
    }
  }
}
