
class DataSource {
  constructor () {
    let i = 0
    this._id = setInterval(() => this.emit(i++) ,200)
  }
  emit(n) {
    const limit = 10;
    if (this.onData) {
      this.onData(n);
    }
    if (n === limit) {
      if (this.oncomplete) {
        this.oncomplete();
      }
      this.destroy();
    }
  }
  
  destroy() {
    clearInterval(this._id);
  }
}

function myObservable (observer) {
  let dataSource = new DataSource();
  dataSource.onData = (e) => observer.next(e);
  dataSource.onError = () => observer.error();
  dataSource.oncomplete = () => observer.complete();
  return () => {
    dataSource.destroy();
  };
}

const unsub = myObservable({
  next(x) { console.log(x); },
  error(err) { console.error(err); },
  complete() { console.log('done')}
});

/**
 * uncomment to try out unsubscription
 */
 setTimeout(unsub, 500);