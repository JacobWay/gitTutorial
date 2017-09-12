function foo () {
  let promiseObj = new Promise( (resolve, reject) => {
    try {
      setTimeout(() => {
        let num = 1;
        resolve(num);
      }, 1000);
    } catch (error) {
      reject(2);
    } finally {
      console.log('??? at final.');
    }
  } );
  return promiseObj;
}

function myAsynchronousFunction(hostname, path) {
  let http = require('http');
  let options = {
    hostname: hostname,
    path: path,
    method: 'GET'
  };
  let promise = new Promise((resolve, reject) => {
    let req = http.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`??? BODY: ${chunk}`);
      });
      res.on('end', () => {
        resolve('!!!success');
      });
    });
    req.on('error', (error) => {
      reject(error);
    });
    req.end();
  });
  return promise;
}

function main () {
  let some = foo();
  let startTime = Date.now();
  some.then( (val) => {
    let endTime = Date.now();
    let elapseTime = endTime - startTime;
    console.log(val, elapseTime);
  } ).catch( (error) => {
    console.log('???: ', error);
  } );

  let hostname = 'be.huobi.com';
  let path = '/common/symbols';
  let promiseObj = myAsynchronousFunction(hostname, path);
  promiseObj.then((result) => console.log('???: my asynchrounous result: ', result));
}

main();
